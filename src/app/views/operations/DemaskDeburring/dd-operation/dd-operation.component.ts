import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from './../../Shared/shared-model';
import { SharedService } from './../../Shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dd-operation',
  templateUrl: './dd-operation.component.html',
  styleUrls: ['./dd-operation.component.scss'],
})
export class DdOperationComponent implements OnInit {
  processStarted: boolean = false;
  progress: number = 0;
  currentWheel!: number;
  poData!: PO_DATA;
  machineId!: number;
  processId!: number;
  totalWheelDetails: any;
  outputCarrierWheels!: any[];
  demaskDeburStarted!: boolean;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    const outputCarrierWheels = this.appStorage.get('INPUT_SCANNED_WHEEL');
    if (outputCarrierWheels != null && outputCarrierWheels?.length) {
      this.outputCarrierWheels = outputCarrierWheels;
    } else {
      this.outputCarrierWheels = [];
    }
    this.operation();
  }

  operation() {
    this.totalWheelDetails = this.appStorage.get('TOTAL_WHEEL_DETAILS');

    if (this.outputCarrierWheels && this.totalWheelDetails) {
      const totalWheels = this.totalWheelDetails.length / 2;
      if (this.outputCarrierWheels.length > 1) {
        const progress = this.outputCarrierWheels.length / totalWheels;
        this.progress = Math.round(progress * 100);
      }

      if (this.outputCarrierWheels.length == totalWheels) {
        this.progress == 100;
      }
    }
  }

  addNewWheel() {
    this.router.navigate(['op/dd/ip-wheel-scan']);
  }

  startTheProcess() {
    this.processStarted = true;
    this.appStorage.set('DEMASK_DEBUR_STARTED', true);
  }

  replaceOutputCarrier() {
    this.router.navigate(['op/dd/output-carrier-scan']);
  }

  checkOutProcess() {
    this.sharedService.sentClickEventpoStageCompleted('operations');
    this.router.navigate(['op/dd/label-printing']);
  }

  incrementTheProgress() {
    this.progress++;
  }
}
