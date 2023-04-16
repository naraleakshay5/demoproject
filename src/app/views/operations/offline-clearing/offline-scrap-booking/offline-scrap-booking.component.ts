import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { VideoJetService } from 'src/app/video-jet.service';
import { WebsocketService } from 'src/app/websocket.service';
import { Reason } from '../../electrical-testing/el-testing-model';
import { ElTestingService } from '../../electrical-testing/el-testing.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-offline-scrap-booking',
  templateUrl: './offline-scrap-booking.component.html',
  styleUrls: ['./offline-scrap-booking.component.scss'],
})
export class OfflineScrapBookingComponent implements OnInit {
  scrapForm!: FormGroup;
  scrap!: FormArray;
  noScrap: boolean = false;

  scrapReason: Reason[] = [];
  selectedscrapReason: any[] = [];
  selectedscrapReasonAll: any[] = [];
  is_selected: boolean = false;
  poData!: PO_DATA;
  clickEventFromOfflinePrePress!: Subscription;
  scrapForOfflinePrePress: boolean = false;
  currentUrl!: string;
  offline_pre_press: boolean = false;
  is_poList: boolean = false;
  machineId: any;
  enableModalPopup: boolean = false;
  processId!: number;

  hvRejectedCount!: number;
  hvReason: string = 'HV Rejected Element';
  capRejectedCount!: number;
  capReason: string = 'Cap Rejected Element';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private wsService: WebsocketService,
    private appStorage: AppStorage,
    private testingService: ElTestingService,
    private vjService: VideoJetService
  ) {}

  ngOnInit() {
    this.processId = this.appStorage.get('PROCESS_ID');

    this.getScrapFromLocalStorage();

    this.getScrapReason();
    this.getScrapFormData();
  }

  getScrapFromLocalStorage() {
    this.hvRejectedCount = this.appStorage.get('HV_COUNT');
    this.capRejectedCount = this.appStorage.get('CAP_COUNT');
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
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');

    const rejectedScrap = [
      {
        scrap_id: +this.hvReason,
        scrap_quantity: this.hvRejectedCount,
      },
      {
        scrap_id: +this.capReason,
        scrap_quantity: this.capRejectedCount,
      },
    ];

    const scrap = this.scrapForm.value.scrap;
    const req = scrap.map((ele: any) => {
      return {
        scrap_id: +ele.reason,
        scrap_quantity: ele.quantity,
      };
    });

    const allScrap = [...rejectedScrap, ...req];

    const reqObj = {
      scrap_reasons: allScrap,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      scrap_type: 2,
    };

    this.sharedService.postScrapReasons(reqObj).subscribe((res: any) => {
      this.sharedService.sentClickEventpoStageCompleted('scrap-booking');

      this.sentInterlocks();

      this.vjService.send({
        op: 'STOP_BATCH',
        data: null,
      });

      this.removeLocalStorage();
    });
    this.router.navigate(['/po-list']);
  }

  onCancel() {
    this.scrapForm.reset();
    this.enableModalPopup = false;
  }

  noScraps() {
    this.sharedService.sentClickEventpoStageCompleted('scrap-booking');

    this.sentInterlocks();
    this.removeLocalStorage();
    this.router.navigate(['/po-list']);
  }

  sentInterlocks() {
    const nodes = [
      {
        nodeId:
          this.testingService.machineInterlocks
            .BATCH_PRODUCTION_START_ON_MACHINE,
        value: false,
      },
      {
        nodeId: this.testingService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
        value: true,
      },
      {
        nodeId: this.testingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
        value: true,
      },
    ];

    this.wsService.sendNodes(nodes);
  }

  removeLocalStorage() {
    this.appStorage.clear('RECIPE_LOADED_FOR_PO');
    this.appStorage.clear('SCANNED_OUTPUT_BINS');
    this.appStorage.clear('SCANNED_INPUT_BINS');
  }

  modalConfirmationToCompletePo() {
    localStorage.removeItem('isMaskingStarted');
    this.router.navigate(['/po-list']);
  }

  modalConfirmationCanelled() {
    this.onCancel();
  }
}
