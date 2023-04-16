import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { reason, poData } from '../assembly-model';
import { SharedService } from '../../Shared/shared.service';
import { WebsocketService } from 'src/app/websocket.service';
import { AssemblyService } from '../assembly.service';
import { PO_DATA } from '../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
@Component({
  selector: 'app-as-scrap-booking',
  templateUrl: './as-scrap-booking.component.html',
  styleUrls: ['./as-scrap-booking.component.scss'],
})
export class AsScrapBookingComponent implements OnInit {
  processId!: any;
  scrapForm!: FormGroup;
  scrap!: FormArray;
  scrapReason: reason[] = [];
  selectedscrapReason: any[] = [];
  selectedscrapReasonAll: any[] = [];
  is_selected: boolean = false;
  curingPoData!: PO_DATA;
  machineId: any | null;
  currentUser!: any;
  is_poList: boolean = false;
  noScrap: boolean = false;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private wsService: WebsocketService,
    private assemblyService: AssemblyService,
    private appStorage: AppStorage
  ) {}

  ngOnInit() {
    this.curingPoData = this.appStorage.get('CURING_PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.currentUser = this.appStorage.get('USER_DATA');

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
      production_order_id: this.curingPoData.po_id,
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
    this.assemblyService.sentClickEventpoStageCompleted(
      'scrap-booking',
      this.curingPoData.po_id
    );
    this.sendNode();
    this.appStorage.clear('MACHINE_PART_COUNT');
    this.router.navigate(['/po-list']);
  }

  sendNode() {
    // this.wsService.sendNode(
    //   this.assemblyService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
    //   false
    // );
    // this.wsService.sendNode(
    //   this.assemblyService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
    //   true
    // );
  }
}
