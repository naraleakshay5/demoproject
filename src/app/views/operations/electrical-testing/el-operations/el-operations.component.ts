import { RejectBins } from './../reject-bins.enums';
import { Subscription } from 'rxjs';
import { ElTestingService } from './../el-testing.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';
import { AppStorage } from 'src/app/storage.service';
import { PoData } from '../../Shared/shared-model';

@Component({
  selector: 'app-el-operations',
  templateUrl: './el-operations.component.html',
  styleUrls: ['./el-operations.component.scss'],
})
export class ElOperationsComponent implements OnInit {
  progress: number = 0;
  elementCount!: number;
  hvRejectedCount!: number;
  irRejectedCount!: number;
  tanD1kRejectedCount!: number;
  tanD10k100KRejectedCount!: number;
  capRejectedCount!: number;
  poData!: PoData;
  testingCompleted: boolean = false;
  totalRejectedCount!: number;
  processId!: number;
  spcType!: string;
  spcElementCount!: number;
  proceedToSPCBtn: boolean = false;
  enableRetesting: boolean = false;
  completePo: boolean = false;
  remainingElement!: number;
  capSub!: Subscription;
  tsnD10KSub!: Subscription;
  irSub!: Subscription;
  hvSub!: Subscription;
  tsnD1KSub!: Subscription;
  singleLeadRejectedCount: number = 0;
  other1RejectedCount: number = 0;
  other2RejectedCount: number = 0;
  doubleRejectedCount: number = 0;
  spcSchedule: any = null;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private appStorage: AppStorage,
    private testingService: ElTestingService
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');

    this.callWebSocket();
    this.performOperations();
  }

  performOperations() {
    this.wsService.machinePartsBatchCount.subscribe({
      next: (count: number) => {
        this.elementCount = count;

        this.remainingElement = this.poData?.quantity - this.elementCount;

        const partsProgress = this.elementCount / this.poData?.quantity;
        this.progress = Math.round(partsProgress * 100);
        this.spcSchedule = this.appStorage.get('TEM_SPC_SCHEDULE');

        if (
          this.spcSchedule &&
          this.spcSchedule.length &&
          (this.elementCount === this.spcSchedule[0] ||
            this.elementCount % this.spcSchedule[1] === 0 ||
            this.proceedToSPCBtn === true)
        ) {
          this.proceedToSPCBtn = true;
        }

        if (this.progress >= 99) {
          this.testingCompleted = true;
          if (this.totalRejectedCount > 0) {
            this.enableRetesting = true;
            this.completePo = false;
          } else {
            this.enableRetesting = false;
            this.completePo = true;
          }
        }
      },
    });
  }

  doSpcCheck() {
    this.processId = this.appStorage.get('PROCESS_ID');

    this.testingService
      .doSpcCheck(
        this.processId,
        this.poData?.po_id,
        this.spcType,
        this.spcElementCount
      )
      .subscribe((resp: any) => {
        this.spcElementCount = resp.data[0].element_count;
        this.spcType = resp.data[0].spc_type;
        this.proceedToSPCBtn = false;
      });
  }

  callWebSocket() {
    this.hvSub = this.wsService.hvRejectionPartsCount.subscribe({
      next: (hvRejectionElementCount: number) => {
        this.hvRejectedCount = hvRejectionElementCount;
      },
    });
    this.irSub = this.wsService.irRejectionPartsCount.subscribe({
      next: (irRejectionElementCount: number) => {
        this.irRejectedCount = irRejectionElementCount;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.tsnD1KSub = this.wsService.tanD1KRejectionPartsCount.subscribe({
      next: (tanD1kRejectionElementCount: number) => {
        this.tanD1kRejectedCount = tanD1kRejectionElementCount;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.tsnD10KSub = this.wsService.tanD10K100KRejectionPartsCount.subscribe({
      next: (tanD10K100KRejectionElementCount: number) => {
        this.tanD10k100KRejectedCount = tanD10K100KRejectionElementCount;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.capSub = this.wsService.capRejectionPartsCount.subscribe({
      next: (capRejectionElementCount: number) => {
        this.capRejectedCount = capRejectionElementCount;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.wsService.singleLeadRejectionPartsCount.subscribe({
      next: (value: number) => {
        this.singleLeadRejectedCount = value;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.wsService.other1RejectionPartsCount.subscribe({
      next: (value: number) => {
        this.other1RejectedCount = value;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.wsService.other2RejectionPartsCount.subscribe({
      next: (value: number) => {
        this.other2RejectedCount = value;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.wsService.doubleRejectionPartsCount.subscribe({
      next: (value: number) => {
        this.doubleRejectedCount = value;
        this.calculateTotalElementCountForRetesting();
      },
    });
  }

  calculateTotalElementCountForRetesting() {
    this.totalRejectedCount =
      this.irRejectedCount +
      this.tanD1kRejectedCount +
      this.tanD10k100KRejectedCount +
      this.capRejectedCount +
      this.singleLeadRejectedCount +
      this.other1RejectedCount +
      this.other2RejectedCount +
      this.doubleRejectedCount;

    this.appStorage.set('RETEST_TOTAL_ELEMENT_COUNT', this.totalRejectedCount);
  }

  addInputBins() {
    this.router.navigate(['op/el/ip-carrier-scan']);
  }

  addOutputBins() {
    this.router.navigate(['op/el/op-carrier-scan']);
  }

  incrementTheProgress() {
    this.progress += 10;
  }

  inProcessQualityCheck() {
    this.router.navigate(['op/el/process-quality-check']);
  }

  completedPo() {
    this.appStorage.set('HV_COUNT', this.hvRejectedCount);
    this.router.navigate(['op/el/label-printing']);
  }

  reTesting() {
    this.wsService.sendNode(
      this.testingService.machineInterlocks.PROC_INTL_HV_ENABLE,
      false
    );

    const rejectedArray = [
      {
        binName: RejectBins.IR_Rejected,
        value: this.irRejectedCount,
      },
      {
        binName: RejectBins.TanD_1k_Rejected,
        value: this.tanD1kRejectedCount,
      },
      {
        binName: RejectBins.TanD_10k_100K_Rejected,
        value: this.tanD10k100KRejectedCount,
      },
      {
        binName: RejectBins.Cap_Rejected,
        value: this.capRejectedCount,
      },
    ];

    this.appStorage.set('HV_COUNT', this.hvRejectedCount);
    this.appStorage.set('IR_COUNT', this.irRejectedCount);
    this.appStorage.set('CAP_COUNT', this.capRejectedCount);
    this.appStorage.set('TAN_D_1K_COUNT', this.tanD1kRejectedCount);
    this.appStorage.set('TAN_D_10K_100K_COUNT', this.tanD10k100KRejectedCount);
    this.appStorage.set('REJECTED_ARRAY', rejectedArray);
    this.appStorage.set('TOTAL_ELEMENT_COUNT', this.elementCount);
    this.appStorage.set('RETEST_TOTAL_ELEMENT_COUNT', this.totalRejectedCount);
    this.appStorage.set('RETESTING_STARTED', true);
    this.ngOnDestroy();
    this.router.navigate(['op/el/re-test-ip-scan']);
  }

  viewPrint() {
    this.appStorage.set('IS_OPERATION_STARTED', true);
    this.router.navigate(['op/el/video-jet']);
  }

  ngOnDestroy() {
    this.hvSub.unsubscribe();
    this.irSub.unsubscribe();
    this.tsnD1KSub.unsubscribe();
    this.tsnD10KSub.unsubscribe();
    this.capSub.unsubscribe();
  }
}
