import { PO_DATA } from './../../Shared/shared-model';
import { RejectBins } from './../reject-bins.enums';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from './../../../../websocket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoData } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { ElTestingService } from '../el-testing.service';

@Component({
  selector: 'app-el-re-testing',
  templateUrl: './el-re-testing.component.html',
  styleUrls: ['./el-re-testing.component.scss'],
})
export class ElReTestingComponent implements OnInit {
  progress: number = 0;
  elementCount!: number;
  hvRejectedCount!: number;
  irRejectedCount!: number;
  tanD1kRejectedCount!: number;
  tanD10k100KRejectedCount!: number;
  capRejectedCount!: number;
  poData!: PO_DATA;
  testingCompleted: boolean = false;
  totalRejectedCount!: number;
  processId!: number;
  spcType!: string;
  spcElementCount!: number;
  proceedToSPCBtn: boolean = false;
  enableRetesting: boolean = false;
  completePo: boolean = false;
  remainingElement!: number;
  testingCount!: number;
  spcSchedule: any = null;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private appStorage: AppStorage,
    private sharedService: SharedService,
    private testingService: ElTestingService
  ) {}

  ngOnInit(): void {
    this.testingCount = this.testingService.reTestCount;

    this.resetCount();
    this.callWebSocket();
    this.performOperations();
  }

  resetCount() {
    // kept for further discussion
    // const nodes = [
    //   {
    //     nodeId: this.testingService.machineInterlocks.PROC_INTL_IR_RESET_COUNT,
    //     value: false,
    //   },
    //   {
    //     nodeId: this.testingService.machineInterlocks.PROC_INTL_CAP_RESET_COUNT,
    //     value: false,
    //   },
    //   {
    //     nodeId:
    //       this.testingService.machineInterlocks.PROC_INTL_TAN_D_1K_RESET_COUNT,
    //     value: false,
    //   },
    //   {
    //     nodeId:
    //       this.testingService.machineInterlocks
    //         .PROC_INTL_TAN_D_10K_100k_RESET_COUNT,
    //     value: false,
    //   },
    // ];
    const nodes = [
      {
        nodeId: this.testingService.machineInterlocks.PROC_INTL_COUNT_RESET,
        value: false,
      },
    ];
    this.wsService.sendNodes(nodes);
  }

  performOperations() {
    const reTestingTotalElementCount = this.appStorage.get(
      'RETEST_TOTAL_ELEMENT_COUNT'
    );

    this.wsService.machinePartsBatchCount.subscribe({
      next: (count: number) => {
        this.elementCount = count;

        this.remainingElement = reTestingTotalElementCount - this.elementCount;

        const partsProgress = this.elementCount / reTestingTotalElementCount;
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
          if (
            this.totalRejectedCount > 0 &&
            this.testingService.reTestCount < 2
          ) {
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
    this.poData = this.appStorage.get('PO_DATA');
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
    this.wsService.hvRejectionPartsCount.subscribe({
      next: (hvRejectionElementCount: number) => {
        this.hvRejectedCount = hvRejectionElementCount;
      },
    });
    this.wsService.irRejectionPartsCount.subscribe({
      next: (irRejectionElementCount: number) => {
        this.irRejectedCount = irRejectionElementCount;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.wsService.tanD1KRejectionPartsCount.subscribe({
      next: (tanD1kRejectionElementCount: number) => {
        this.tanD1kRejectedCount = tanD1kRejectionElementCount;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.wsService.tanD10K100KRejectionPartsCount.subscribe({
      next: (tanD10K100KRejectionElementCount: number) => {
        this.tanD10k100KRejectedCount = tanD10K100KRejectionElementCount;
        this.calculateTotalElementCountForRetesting();
      },
    });
    this.wsService.capRejectionPartsCount.subscribe({
      next: (capRejectionElementCount: number) => {
        this.capRejectedCount = capRejectionElementCount;
        this.calculateTotalElementCountForRetesting();
      },
    });
  }

  calculateTotalElementCountForRetesting() {
    this.totalRejectedCount =
      this.irRejectedCount +
      this.tanD1kRejectedCount +
      this.tanD10k100KRejectedCount +
      this.capRejectedCount;

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
    this.sharedService.sentClickEventpoStageCompleted('testing2');
    this.router.navigate(['op/el/label-printing']);
  }

  reTesting() {
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

    this.appStorage.set('REJECTED_ARRAY', rejectedArray);

    let totalElementCount = this.appStorage.get('TOTAL_ELEMENT_COUNT');
    totalElementCount = totalElementCount + this.elementCount;
    this.appStorage.set('TOTAL_ELEMENT_COUNT', totalElementCount);
    this.appStorage.set('RETEST_TOTAL_ELEMENT_COUNT', this.totalRejectedCount);
    this.testingCount = this.testingService.reTestCount++;
    this.sharedService.sentClickEventpoStageCompleted('testing2');
    this.router.navigate(['op/el/re-test-ip-scan']);
  }
}
