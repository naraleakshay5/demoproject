import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { ElTestingService } from '../../electrical-testing/el-testing.service';
import { PoData } from '../../Shared/shared-model';

@Component({
  selector: 'app-offline-operations',
  templateUrl: './offline-operations.component.html',
  styleUrls: ['./offline-operations.component.scss'],
})
export class OfflineOperationsComponent implements OnInit {
  progress: number = 0;
  elementCount!: number;
  hvRejectedCount!: number;
  capRejectedCount!: number;
  poData!: PoData;
  totalRejectedCount!: number;
  processId!: number;
  spcType!: string;
  spcElementCount!: number;
  proceedToSPCBtn: boolean = false;
  enableRetesting: boolean = false;
  completePo: boolean = false;
  remainingElement!: number;
  capSub!: Subscription;
  hvSub!: Subscription;
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
    this.capSub = this.wsService.capRejectionPartsCount.subscribe({
      next: (capRejectionElementCount: number) => {
        this.capRejectedCount = capRejectionElementCount;
        this.calculateTotalElementCountForRetesting();
      },
    });
  }

  calculateTotalElementCountForRetesting() {
    this.totalRejectedCount = this.capRejectedCount + this.hvRejectedCount;

    this.appStorage.set('RETEST_TOTAL_ELEMENT_COUNT', this.totalRejectedCount);
  }

  addOutputBins() {
    this.router.navigate(['op/offline/op-carrier-scan']);
  }

  incrementTheProgress() {
    this.progress += 10;
  }

  inProcessQualityCheck() {
    this.router.navigate(['op/offline/process-quality-check']);
  }

  completedPo() {
    this.appStorage.set('HV_COUNT', this.hvRejectedCount);
    this.appStorage.set('CAP_COUNT', this.capRejectedCount);

    this.router.navigate(['op/offline/scrap-booking']);
  }

  ngOnDestroy() {
    this.hvSub.unsubscribe();
    this.capSub.unsubscribe();
  }
}
