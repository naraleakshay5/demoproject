import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';

@Component({
  selector: 'app-tp-operation',
  templateUrl: './tp-operation.component.html',
  styleUrls: ['./tp-operation.component.scss'],
})
export class TpOperationComponent implements OnInit {
  poData!: PO_DATA;
  progress: number = 0;
  elementTarget: number = 0;
  machinePartBatchCount: number = 0;
  machinePartBatchCounts: number = 0;
  machinePartsBoxCount: number = 0;
  boxCount: number = 0;
  elementqualitycheck: boolean = false;
  boxFull: boolean = false;
  boxPartLimit: number = 0;

  constructor(
    private appStorage: AppStorage,
    private router: Router,
    private wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.elementTarget = +this.poData.target_quantity;
    this.boxPartLimit = this.appStorage.get('BOX_QTY');

    this.wsService.boxComplete.subscribe({
      next: (value: number) => {
        // Todo
        // this.boxCount = this.appStorage.get('BOX_COUNTER');
        // if (value === 0) {
        //   boxComplete = false;
        // }
        // if (value >= this.appStorage.get('BOX_QTY') && !boxComplete) {
        //   boxComplete = true;
        //   this.boxFull = true;
        //   let box = 0;
        //   box = this.boxCount;
        //   box += 1;
        //   this.appStorage.set('BOX_COUNTER', box);
        // }
      },
      error: (error: any) => {
        console.info(error);
      },
    });

    let boxComplete = false;

    this.wsService.machinePartsBoxCount.subscribe({
      next: (value: number) => {
        this.machinePartBatchCount = value;
        this.boxCount = this.appStorage.get('BOX_COUNTER');

        if (this.machinePartBatchCount === 0) {
          boxComplete = false;
        }

        if (
          this.machinePartBatchCount >= this.appStorage.get('BOX_QTY') &&
          !boxComplete
        ) {
          boxComplete = true;
          this.boxFull = true;
          let box = 0;
          box = this.boxCount;
          box += 1;
          this.appStorage.set('BOX_COUNTER', box);
        }

        if (
          this.machinePartBatchCount != null &&
          this.machinePartBatchCount != 0
        ) {
          const boxCount = this.boxCount;

          let partCount = 0;
          if (boxCount === null) {
            partCount = 0;
          } else {
            partCount = boxCount * this.appStorage.get('BOX_QTY');
          }

          this.machinePartBatchCounts = this.machinePartBatchCount + partCount;
          this.appStorage.set('CAPACITOR_COUNT', this.machinePartBatchCounts);

          const partsProgress =
            this.machinePartBatchCounts / parseInt(this.poData.target_quantity);
          this.progress = Math.round(partsProgress * 100);
        }
      },
      error: (error: any) => {
        console.info(error);
      },
    });

    this.wsService.machinePartsBoxCount.subscribe({
      next: (value: number) => {
        this.machinePartsBoxCount = value;
        if (
          this.machinePartsBoxCount >= 100 &&
          this.machinePartsBoxCount <= 110
        ) {
          this.elementqualitycheck = true;
        }
      },
      error: (error: any) => {
        console.info(error);
      },
    });
  }

  incrementTheProgress() {
    this.progress++;
  }

  yes() {
    this.appStorage.set(
      'REMAINING_QTY',
      +this.poData.target_quantity - this.machinePartBatchCounts
    );
    this.router.navigate(['op/tp/label-printing']);
  }

  processQty() {
    this.elementqualitycheck = false;
    this.appStorage.set('IS_QUALITY_CHECK', true);
    this.router.navigate(['op/tp/process-quality-check']);
  }
}
