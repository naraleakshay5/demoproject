import { WindingService } from './../winding.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-wd-winding',
  templateUrl: './wd-winding.component.html',
  styleUrls: ['./wd-winding.component.scss'],
})
export class WdWindingComponent implements OnInit {
  processStarted = false;
  progress: number = 0;
  enableProgressStatus: boolean = false;
  enableReplaceOutputBin: boolean = false;
  isVisualInspectionInWinding: boolean = false;
  isWindingOutputCarrier: boolean = false;
  isWindingMaterialCheckFilmBag: boolean = false;
  enableMaterialReelCheck: boolean = false;
  poData!: PO_DATA;
  machineId: any;
  static isSpcComplete: boolean;
  static isOutputCarrierCompelte: boolean;
  static isMaterialCheckComplete: boolean;
  elementProcessed!: number;
  elementTarget!: string;
  po: any;
  machinePartBatchCount: number = 0;
  machineBadPartsBatchCount: number = 0;
  cycleTime: number = 0;
  proceedToSPCBtn: boolean = false;
  loadNewReel: boolean = false;
  spcSchedule: any = null;
  isReelFinished: boolean = false;
  poQtyAchieved: boolean = false;

  constructor(
    private router: Router,
    private windingService: WindingService,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('winding');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');

    this.isReelFinished = false;
    this.wsService.alarmCode12.subscribe({
      next: (value: boolean) => {
        if (this.isReelFinished === false && value === true) {
          this.loadNewReel = value;
          this.isReelFinished = true;
        }
      },
    });

    this.elementTarget = this.poData.target_quantity;
    this.wsService.machinePartsBatchCount.subscribe({
      next: (value: number) => {
        this.machinePartBatchCount = value;
        if (
          this.machinePartBatchCount != null &&
          this.machinePartBatchCount != 0
        ) {
          const partsProgress =
            this.machinePartBatchCount / parseInt(this.poData.target_quantity);
          this.progress = Math.round(partsProgress * 100);

          if (
            this.machinePartBatchCount != 0 &&
            this.machinePartBatchCount != null
          ) {
            this.processStarted = true;
          }

          this.spcSchedule = this.appStorage.get('TEM_SPC_SCHEDULE');

          if (
            this.spcSchedule &&
            this.spcSchedule.length &&
            (this.machinePartBatchCount === this.spcSchedule[0] ||
              this.machinePartBatchCount % this.spcSchedule[1] === 0 ||
              this.proceedToSPCBtn === true)
          ) {
            this.proceedToSPCBtn = true;
          }

          this.poQtyAchieved =
            +this.elementTarget ===
            this.machinePartBatchCount -
              this.machineBadPartsBatchCount -
              this.appStorage.get('TEM_SETUP_SCRAP')
              ? true
              : false;
        }
      },
    });

    this.wsService.machineCycleTime.subscribe({
      next: (value: number) => {
        this.cycleTime = value;
      },
    });

    this.wsService.machineBadPartsBatchCount.subscribe({
      next: (value: number) => {
        this.machineBadPartsBatchCount = value;
      },
    });
  }

  startTheProcess() {
    this.processStarted = true;
    this.enableProgressStatus = true;
  }

  incrementTheProgress() {
    this.progress++;
  }

  proceedToSPC() {
    this.router.navigate(['op/wd/visual-inspection']);
  }

  replaceFilmReel() {
    this.isReelFinished = false;
    this.appStorage.set('TEM_WD_WINDING', false);
    this.router.navigate(['op/wd/material-check']);
  }

  checkOutAndCompleteWinding() {
    this.wsService.sendNode(
      this.windingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
      true
    );
    this.appStorage.clear('TEM_SETUP_SCRAP');
    this.appStorage.set('TEM_ELEMENT_COUNT', this.poQtyAchieved);
    this.router.navigate(['op/wd/label-printing']);
  }

  scannewOutputbin() {
    this.router.navigate(['op/wd/output-carrier']);
  }

  no() {
    this.isReelFinished = false;
  }
}
