import { TemperingService } from './../tempering.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';
import { SharedService } from '../../Shared/shared.service';
import { poData, reason } from '../tempering-model';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-tem-scrap-booking',
  templateUrl: './tem-scrap-booking.component.html',
  styleUrls: ['./tem-scrap-booking.component.scss'],
})
export class TemScrapBookingComponent implements OnInit {
  processId!: any;
  scrapForm!: FormGroup;
  scrap!: FormArray;
  scrapReason: reason[] = [];
  selectedscrapReason: ScrapWithReason[] = [];
  selectedscrapReasonAll: ScrapWithReason[] = [];
  is_selected: boolean = false;
  is_po_selected: boolean = false;
  poData!: poData;
  machineId: any | null;
  currentUser!: any;
  is_poList: boolean = false;
  noScrap: boolean = false;
  po_ids: any[] = [];
  trolley: any;
  selectedscrapPoNumber: any[] = [];

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router,
    private temperingService: TemperingService,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit() {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.po_ids = this.appStorage.get('PO_IDS');
    this.currentUser = this.appStorage.get('USER_DATA');
    this.trolley = this.appStorage.get('SCANNED_TROLLEY_AND_TRAYS');
    this.currentUser = JSON.parse(this.currentUser);

    this.getScrapReason();
    this.getScrapFormData();
  }

  getScrapFormData() {
    this.scrapForm = this.fb.group({
      scrap: this.fb.array([this.initTimes()]),
    });
    this.fa.valueChanges.subscribe((value) => {
      this.selectedscrapReasonAll = value.map((v: any) => v);
    });
  }
  getScrapReason() {
    this.sharedService.getScrapReasons(this.processId).subscribe((res: any) => {
      this.scrapReason = res.data;
    });
  }

  onChange(value: any) {
    if (this.selectedscrapReason && this.selectedscrapReason.length > 0) {
      let po = this.selectedscrapReason.filter(
        (ele: any) => ele.reason == value
      );
      if (po.length > 1) {
        this.is_po_selected =
          Array.from(
            new Set(
              this.selectedscrapReason.map((user) =>
                JSON.stringify(user.poNumber)
              )
            )
          ).length != this.selectedscrapReason.length;
      }
    }
    this.selectedscrapReason = [...this.selectedscrapReasonAll];
  }

  onPoChange(poNumber: any) {
    if (this.selectedscrapPoNumber && this.selectedscrapPoNumber.length > 0) {
      // this.is_po_selected = this.selectedscrapPoNumber?.includes(poNumber);
      let po = this.selectedscrapReason.filter(
        (ele: any) => ele.poNum == poNumber
      );

      this.is_po_selected = po?.includes(poNumber);

      if (po.length > 1) {
        this.is_po_selected =
          Array.from(
            new Set(
              this.selectedscrapReason.map((user) =>
                JSON.stringify(user.reason)
              )
            )
          ).length != this.selectedscrapReason.length;
      }
    }
    this.selectedscrapPoNumber = [...this.selectedscrapReasonAll];
  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

  initTimes() {
    return this.fb.group({
      quantity: this.fb.control('', Validators.required),
      poNum: this.fb.control('', Validators.required),
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

    const reqObj = {
      scrap_reasons: req,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      scrap_type: 2,
    };

    this.sharedService.postScrapReasons(reqObj).subscribe((res: any) => {
      this.noScraps();
    });
  }
  onCheck(event: any) {
    this.noScrap = event.target.checked;
  }
  noScraps() {
    // this.sharedService.sentClickEventpoStageCompleted('scrap-booking');
    // this.po_ids.forEach((ele: any) => {
    //   this.temperingService.sentClickEventpoStageCompleted(
    //     'operations',
    //     ele.production_order_id
    //   );
    // });
    localStorage.removeItem('SCANNED_TROLLEY');
    this.wsService.sendNode(
      this.temperingService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
      false
    );
    this.wsService.sendNode(
      this.temperingService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
      true
    );
    this.wsService.sendNode(
      this.temperingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
      true
    );
    this.router.navigate(['/po-list']);
  }
}

export interface ScrapWithReason {
  reason: string;
  poId: number;
  poNumber: number;
}
