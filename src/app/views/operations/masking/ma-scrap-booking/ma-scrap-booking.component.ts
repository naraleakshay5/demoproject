import { PoData } from './../../Shared/shared-model';
import { ScrapReason } from './../masking-model';
import { SharedService } from './../../Shared/shared.service';
import { MaskingService } from './../masking.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-ma-scrap-booking',
  templateUrl: './ma-scrap-booking.component.html',
  styleUrls: ['./ma-scrap-booking.component.scss'],
})
export class MaScrapBookingComponent implements OnInit {
  scrapForm!: FormGroup;
  scrap!: FormArray;
  noScrap: boolean = false;

  scrapReason: ScrapReason[] = [];
  selectedscrapReason: any[] = [];
  selectedscrapReasonAll: any[] = [];
  is_selected: boolean = false;
  poData!: PoData;
  clickEventFromOfflinePrePress!: Subscription;
  scrapForOfflinePrePress: boolean = false;
  currentUrl: string;
  offline_pre_press: boolean = false;
  is_poList: boolean = false;
  machineId: any;
  enableModalPopup: boolean = false;
  currentUser!: any;
  processId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private maskingService: MaskingService,
    private wsService: WebsocketService
  ) {
    this.currentUrl = this.router.url;

    if (this.currentUrl.split('/')[3] == 'offline-pre-press') {
      this.offline_pre_press = true;
    } else if (
      this.currentUrl.split('/')[3] == 'scrap-booking' &&
      this.currentUrl.split('/')[3] == 'hp'
    ) {
      this.is_poList = true;
    }
  }

  ngOnInit() {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    this.machineId = localStorage.getItem('MACHINE_ID');
    this.machineId = JSON.parse(this.machineId);

    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);

    const currentUser = localStorage.getItem('USER_DATA')!;
    this.currentUser = JSON.parse(currentUser);

    this.getScrapReason();
    this.getScrapFormData();
  }

  getScrapFormData() {
    this.scrapForm = this.fb.group({
      scrap: this.fb.array([this.initTimes()]),
    });
    this.fa.valueChanges.subscribe((value) => {
      this.selectedscrapReasonAll = value.map((v: any) => v.reason);
    });
  }

  getScrapReason() {
    this.sharedService.getScrapReasons(this.processId).subscribe((res: any) => {
      this.scrapReason = res.data;
    });
  }

  onChange(value: any) {
    if (this.selectedscrapReason && this.selectedscrapReason.length > 0) {
      this.is_selected = this.selectedscrapReason?.includes(value);
    }
    this.selectedscrapReason = [...this.selectedscrapReasonAll];
  }

  onCheck(event: any) {
    this.noScrap = event.target.checked;
  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

  initTimes() {
    return this.fb.group({
      quantity: this.fb.control('', Validators.required),
      reason: this.fb.control('', Validators.required),
      trackingId: this.generateUniqueId(),
    });
  }

  generateUniqueId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  get fa() {
    return this.scrapForm.get('scrap') as FormArray;
  }

  addGroup() {
    this.fa.push(this.initTimes());
  }

  removeGroup(i: number) {
    this.fa.removeAt(i);
    this.is_selected = false;
  }

  onSubmit() {
    const scrap = this.scrapForm.value.scrap;
    const req = scrap.map((ele: any) => {
      return {
        scrap_id: +ele.reason,
        scrap_quantity: ele.quantity,
      };
    });
    var scrapType = 0;
    if (this.currentUser.role != 'Setter') {
      scrapType = 1;
    } else {
      scrapType = 2;
    }
    const reqObj = {
      scrap_reasons: req,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      scrap_type: scrapType,
    };

    this.sharedService.postScrapReasons(reqObj).subscribe((res: any) => {
      if (this.currentUser.role == 'Operator') {
        this.sharedService.sentClickEventpoStageCompleted('scrap-booking');

        this.wsService.sendNode(
          this.maskingService.machineInterlocks
            .BATCH_PRODUCTION_START_ON_MACHINE,
          false
        );
        this.wsService.sendNode(
          this.maskingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
          true
        );
        localStorage.removeItem('RECIPE_LOADED_FOR_PO');
        this.router.navigate(['/po-list']);
      }
    });
  }

  onCancel() {
    this.scrapForm.reset();
    this.enableModalPopup = false;
  }

  noScraps() {
    if (this.currentUser.role == 'Operator') {
      this.sharedService.sentClickEventpoStageCompleted('scrap-booking');
      this.wsService.sendNode(
        this.maskingService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
        false
      );
      this.wsService.sendNode(
        this.maskingService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
        true
      );
      this.wsService.sendNode(
        this.maskingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
        true
      );
      this.router.navigate(['/po-list']);
    } else {
      this.router.navigate(['op/wd/logout']);
    }
  }

  modalConfirmationToCompletePo() {
    localStorage.removeItem('isMaskingStarted');
    this.router.navigate(['/po-list']);
  }

  modalConfirmationCanelled() {
    this.onCancel();
  }
}
