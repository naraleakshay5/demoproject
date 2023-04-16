import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../../Shared/shared-model';

@Component({
  selector: 'app-aoi-operations',
  templateUrl: './aoi-operations.component.html',
  styleUrls: ['./aoi-operations.component.scss'],
})
export class AoiOPerationsComponent implements OnInit {
  elementsProcessed!: number;
  poData!: PO_DATA;
  progress!: number;
  remainingElements!: number;
  spcSchedule: any;
  proceedToSPCBtn: boolean = false;
  rejectedElements!: number;
  goodElements!: number;
  completePo: boolean = false;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.performOperations();
  }

  performOperations() {
    this.poData = this.appStorage?.get('PO_DATA');

    this.wsService.machinePartsBatchCount.subscribe({
      next: (value: number) => {
        this.elementsProcessed = value;

        this.appStorage.set('TOTAL_ELEMENT_COUNT', value);

        this.remainingElements =
          +this.poData?.target_quantity - this.elementsProcessed;

        const partsProgress: number =
          this.elementsProcessed / +this.poData?.target_quantity;
        this.progress = Math.round(partsProgress * 100);

        this.spcSchedule = this.appStorage.get('SPC_SCHEDULE');
        if (
          this.spcSchedule &&
          this.spcSchedule.length &&
          (this.elementsProcessed === this.spcSchedule[0] ||
            this.elementsProcessed % this.spcSchedule[1] === 0 ||
            this.proceedToSPCBtn === true)
        ) {
          this.proceedToSPCBtn = true;
        }

        if (this.progress > 99) {
          this.completePo = true;
        }
      },
      error: (error) => {
        console.info(error);
      },
    });

    this.wsService.machinePartsRejectBatchCount.subscribe({
      next: (value: number) => {
        this.rejectedElements = value;
        this.appStorage.set('REJECTED_ELEMENT_COUNT', value);
      },
      error: (error) => {
        console.info(error);
      },
    });

    this.wsService.machinePartsGoodBatchCount.subscribe({
      next: (value: number) => {
        this.goodElements = value;
        this.appStorage.set('GOOD_ELEMENT_COUNT', value);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  inProcessQualityCheck() {}

  addRejectedOutputBins() {
    this.router.navigate(['op/aoi/output-rejected-bin/']);
  }

  addOutputBins() {
    this.router.navigate(['op/aoi/output-good-bin/']);
  }

  completedPo() {
    this.router.navigate(['op/aoi/batch-result/']);
  }
}
