import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from './../../Shared/shared-model';
import { DemaskDeburringService } from './../demask-deburring.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';
import { SharedService } from '../../Shared/shared.service';
import { reason } from '../demask-deburring-model';

@Component({
  selector: 'app-dd-scrap-booking',
  templateUrl: './dd-scrap-booking.component.html',
  styleUrls: ['./dd-scrap-booking.component.scss'],
})
export class DdScrapBookingComponent implements OnInit {
  processId!: any;
  scrapForm!: FormGroup;
  scrap!: FormArray;
  scrapReason: reason[] = [];
  selectedscrapReason: any[] = [];
  selectedscrapReasonAll: any[] = [];
  isSelected: boolean = false;
  poData!: PO_DATA;
  machineId!: number;
  noScrap: boolean = false;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router,
    private demaskDeburService: DemaskDeburringService,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit() {
    this.processId = this.appStorage.get('PROCESS_ID');

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
    this.sharedService.getScrapReasons(this.processId).subscribe({
      next: (res: any) => {
        this.scrapReason = res.data;
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  onChange(value: any) {
    if (this.selectedscrapReason && this.selectedscrapReason.length > 0) {
      this.isSelected = this.selectedscrapReason?.includes(value);
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
    this.isSelected = false;
  }

  onSubmit() {
    const scrap = this.scrapForm.value.scrap;
    const req = scrap.map((ele: any) => {
      return {
        scrap_id: +ele.reason,
        scrap_quantity: ele.quantity,
      };
    });

    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');

    const reqObj = {
      scrap_reasons: req,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      scrap_type: 2,
    };

    this.sharedService.postScrapReasons(reqObj).subscribe({
      next: (res: any) => {
        this.sharedService.sentClickEventpoStageCompleted('scrap-booking');

        this.wsService.sendNode(
          this.demaskDeburService.machineInterlocks
            .BATCH_PRODUCTION_START_ON_MACHINE,
          false
        );
        this.wsService.sendNode(
          this.demaskDeburService.machineInterlocks.PROC_INTL_STOP_MACHINE,
          true
        );
        this.appStorage.clear('RECIPE_LOADED_FOR_PO');

        this.router.navigate(['/po-list']);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  onCheck(event: any) {
    this.noScrap = event.target.checked;
  }

  noScraps() {
    this.sharedService.sentClickEventpoStageCompleted('scrap-booking');
    this.wsService.sendNode(
      this.demaskDeburService.machineInterlocks
        .BATCH_PRODUCTION_START_ON_MACHINE,
      false
    );
    this.wsService.sendNode(
      this.demaskDeburService.machineInterlocks.PROC_INTL_STOP_MACHINE,
      true
    );
    this.appStorage.clear('RECIPE_LOADED_FOR_PO');

    this.router.navigate(['/po-list']);
  }
}
