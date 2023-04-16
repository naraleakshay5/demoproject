import { MetalSprayService } from '../metal-spray.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrapReason } from '../../masking/masking-model';
import { PoData } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-ms-scrap-booking',
  templateUrl: './ms-scrap-booking.component.html',
  styleUrls: ['./ms-scrap-booking.component.scss'],
})
export class MsScrapBookingComponent implements OnInit {
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
  is_poList: boolean = false;
  machineId: any;
  enableModalPopup: boolean = false;
  currentUser!: any;
  processId!: number;
  previousPoData!: PoData;
  poId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private metalSprayService: MetalSprayService,
    private wsService: WebsocketService
  ) {}

  ngOnInit() {
    const poData = localStorage.getItem('PO_DATA')!;
    if (JSON.parse(poData)) {
      this.poData = JSON.parse(poData);
    }
    const previousPoData = localStorage.getItem('PO_DATA')!;
    if (JSON.parse(previousPoData)) {
      this.previousPoData = JSON.parse(previousPoData);
    }
    this.machineId = localStorage.getItem('MACHINE_ID');
    this.machineId = JSON.parse(this.machineId);

    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);

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

    if (this.previousPoData) {
      this.poId = this.previousPoData?.po_id;
    } else {
      this.poId = this.poData?.po_id;
    }

    const reqObj = {
      scrap_reasons: req,
      production_order_id: this.poId,
      process_id: this.processId,
      machine_id: this.machineId,
      scrap_type: 2,
    };

    this.sharedService.postScrapReasons(reqObj).subscribe((res: any) => {
      this.sharedService.sentClickEventpoStageCompleted('scrap-booking');

      this.sendInterlocks();
      this.removeLocalStrageValues();
      this.router.navigate(['/po-list']);
    });
  }

  onCancel() {
    this.scrapForm.reset();
    this.enableModalPopup = false;
  }

  noScraps() {
    this.sharedService.sentClickEventpoStageCompleted('scrap-booking');

    this.sendInterlocks();
    this.removeLocalStrageValues();
    this.router.navigate(['/po-list']);
  }

  sendInterlocks() {
    let gun1 = localStorage.getItem('GUN_1_DETAILS')!;
    const gun1Details = JSON.parse(gun1);
    let gun2 = localStorage.getItem('GUN_2_DETAILS')!;
    const gun2Details = JSON.parse(gun2);
    let load = localStorage.getItem('LOAD_WHEEL_DETAILS')!;
    const loadWheelDetails = JSON.parse(load);

    const nodesToUpdate = [
      {
        nodeId:
          this.metalSprayService.machineInterlocks
            .BATCH_PRODUCTION_START_ON_MACHINE,
        value: false,
      },
      {
        nodeId:
          this.metalSprayService.machineInterlocks
            .BATCH_PRODUCTION_START_ON_MACHINE,
        value: true,
      },
      {
        nodeId: this.metalSprayService.machineInterlocks.PROC_INTL_STOP_MACHINE,
        value: true,
      },
    ];

    if (
      (gun1Details == null || gun1Details == 'null') &&
      (gun2Details == null || gun2Details == 'null') &&
      (loadWheelDetails == null || loadWheelDetails == 'null')
    ) {
      this.wsService.sendNodes(nodesToUpdate);
    }
  }

  modalConfirmationToCompletePo() {
    this.removeLocalStrageValues();
    this.wsService.sendNode(
      this.metalSprayService.machineInterlocks
        .BATCH_PRODUCTION_START_ON_MACHINE,
      false
    );

    this.router.navigate(['/po-list']);
  }

  modalConfirmationCanelled() {
    this.onCancel();
  }

  removeLocalStrageValues() {
    //kept for further development
    // localStorage.removeItem('GUN_1_DETAILS');
    // localStorage.removeItem('GUN_2_DETAILS');
    // localStorage.removeItem('LOAD_WHEEL_DETAILS');
    // localStorage.removeItem('SCANNED_WHEEL_DETAILS');
    // localStorage.removeItem('RECIPE_LOADED_FOR_PO');
    // localStorage.removeItem('TOTAL_WHEEL_DETAILS');
    // localStorage.removeItem('METAL_SPRAY_STARTED');
    // localStorage.removeItem('PREVIOUS_PO_DATA');
  }
}
