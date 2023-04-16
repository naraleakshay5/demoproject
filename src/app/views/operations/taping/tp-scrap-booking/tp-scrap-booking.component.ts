import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helper.service';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { FqaService } from '../../fqa/fqa.service';
import { PO_DATA, scrap_reason } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-tp-scrap-booking',
  templateUrl: './tp-scrap-booking.component.html',
  styleUrls: ['./tp-scrap-booking.component.scss'],
})
export class TpScrapBookingComponent implements OnInit {
  processId!: any;
  scrapForm!: FormGroup;
  scrap!: FormArray;
  scrapReason: scrap_reason[] = [];
  selectedscrapReason: any[] = [];
  selectedscrapReasonAll: any[] = [];
  is_selected: boolean = false;
  poData!: PO_DATA;
  machineId: any | null;
  currentUser!: any;

  noScrap: boolean = false;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router,
    private appStorage: AppStorage,
    private fqaService: FqaService,
    private wsService: WebsocketService
  ) {}

  ngOnInit() {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.currentUser = this.appStorage.get('USER_DATA');

    this.getScrapReason();
    this.getScrapFormData();
  }

  getScrapFormData() {
    // we will initialize our form here
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
    var scrapType = 2;

    const reqObj = {
      scrap_reasons: req,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      scrap_type: scrapType,
    };

    this.sharedService.postScrapReasons(reqObj).subscribe((res: any) => {
      this.noScraps();
    });
  }

  onCheck(event: any) {
    this.noScrap = event.target.checked;
  }

  noScraps() {
    localStorage.setItem(
      'LAST_PO_DATA',
      JSON.stringify({
        po_id: this.poData.po_id,
        sach_id: this.poData.sach_id,
        ls_id: this.poData.ls_id,
        po_number: this.poData.po_number,
        sach_number: this.poData.sach_number,
        target_quantity: this.poData.target_quantity,
        remaining_quantity: this.appStorage.get('REMAINING_QTY'),
        check_out: new Date(),
      })
    );
    const reqBody = {
      po_id: this.appStorage.get('PO_DATA').po_id,
      machine_id: this.appStorage.get('MACHINE_ID'),
      stage: this.fqaService.fqaProcessLog.taping,
    };

    this.fqaService.postFqaProcessLog(reqBody).subscribe((res: any) => {
      this.router.navigate(['/po-list']);
      this.appStorage.clear('RECIPE_TYPE');
      this.appStorage.clear('TYPE');
      this.appStorage.clear('BOX_COUNTER');
      this.appStorage.clear('CAPACITOR_COUNT');
      this.appStorage.clear('BOX_QTY');

      this.wsService.sendNode(
        this.sharedService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
        false
      );
      this.wsService.sendNode(
        this.sharedService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
        true
      );
      this.wsService.sendNode(
        this.sharedService.machineInterlocks.PROC_INTL_STOP_MACHINE,
        true
      );
    });
  }
}
