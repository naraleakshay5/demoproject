import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HotPressService } from '../hot-press.service';
import { reason } from '../hot-press-model';
import { SharedService } from '../../Shared/shared.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-hp-scrap-booking',
  templateUrl: './hp-scrap-booking.component.html',
  styleUrls: ['./hp-scrap-booking.component.scss'],
})
export class HpScrapBookingComponent implements OnInit {
  processId!: any;
  scrapForm!: FormGroup;
  scrap!: FormArray;
  scrapReason: reason[] = [];
  selectedscrapReason: any[] = [];
  selectedscrapReasonAll: any[] = [];
  is_selected: boolean = false;
  poData!: PO_DATA;
  machineId: any | null;
  currentUser!: any;
  clickEventFromOfflinePrePress!: Subscription;
  scrapForOfflinePrePress: boolean = false;
  currentUrl: string;
  offline_pre_press: boolean = false;
  is_poList: boolean = false;
  noScrap: boolean = false;
  operationalsLogs: any[] = [];

  constructor(
    private sharedService: SharedService,
    private hotPressService: HotPressService,
    private fb: FormBuilder,
    private router: Router,
    private wsService: WebsocketService,
    private appStorage: AppStorage
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
    this.operationalsLogs = this.appStorage.getOperationalLogs();
    this.sharedService.sentClickEventpoStageCompleted('scrap-booking');
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
    if (this.offline_pre_press) {
      this.offline_pre_press = false;
      this.router.navigate(['op/hp/ip-carrier-scan']);
    } else {
      this.wsService.sendNode(
        this.hotPressService.machineInterlocks
          .BATCH_PRODUCTION_START_ON_MACHINE,
        false
      );
      this.wsService.sendNode(
        this.hotPressService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
        true
      );
      this.wsService.sendNode(
        this.hotPressService.machineInterlocks.PROC_INTL_STOP_MACHINE,
        true
      );
      this.appStorage.clear('TEM_INPUT_SCANNED_BIN');
      this.appStorage.clear('TEM_SCAN_INPUT_BIN');
      this.appStorage.clear('TEM_LAST_URL');
      this.router.navigate(['/po-list']);
    }
  }
}
