import { SharedService } from './../../Shared/shared.service';
import { Router } from '@angular/router';
import { PoData } from './../../Shared/shared-model';
import { MetalSprayService } from './../metal-spray.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ms-ipcarrier-validation',
  templateUrl: './ms-ipcarrier-validation.component.html',
  styleUrls: ['./ms-ipcarrier-validation.component.scss'],
})
export class MsIpcarrierValidationComponent implements OnInit {
  wheelCount!: number;
  enableWarningPopupModal!: boolean;
  poData!: PoData;
  machineId!: number;
  actualWheelCount: number = 2;
  enablePopupModal!: boolean;
  processId!: number;
  ModalMessage!: string;
  actaualWheelCount!: number;
  indexingLeft!: number;

  constructor(
    private metalSprayService: MetalSprayService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);

    this.getActualWheelCount();
  }

  getActualWheelCount() {
    this.metalSprayService
      .getActualWheelCount(this.processId, this.poData?.po_id, 'input')
      .subscribe((resp: any) => {
        this.actualWheelCount = resp.data.length / 2;

        let isStarteNewPo = localStorage.getItem('IS_START_NEW_PO')!;
        isStarteNewPo = JSON.parse(isStarteNewPo);

        if (isStarteNewPo) {
          let wheels = resp.data;
          const wheelsDetailsWithPoId = wheels.map((key: any) => ({
            ...key,
            poData: this.poData,
          }));

          localStorage.setItem(
            'TOTAL_WHEEL_DETAILS_FOR_NEW_PO',
            JSON.stringify(wheelsDetailsWithPoId)
          );
          localStorage.setItem(
            'ACTUAL_WHEEL_COUNT_FOR_NEW_PO',
            JSON.stringify(this.actualWheelCount)
          );

          //Indexing Formula
          if (this.actualWheelCount && this.actualWheelCount > 0) {
            const left = resp.data.length;
            const right = (resp.data.length / 2) % 3;
            this.indexingLeft = left - right;
          }

          localStorage.setItem(
            'INDEXING_LEFT_FOR_NEW_PO',
            JSON.stringify(this.indexingLeft)
          );
        } else {
          let wheels = resp.data;
          const wheelsDetailsWithPoId = wheels.map((key: any) => ({
            ...key,
            poData: this.poData,
          }));

          localStorage.setItem(
            'TOTAL_WHEEL_DETAILS',
            JSON.stringify(wheelsDetailsWithPoId)
          );
          localStorage.setItem(
            'ACTUAL_WHEEL_COUNT',
            JSON.stringify(this.actualWheelCount)
          );

          //Indexing Formula
          if (this.actualWheelCount && this.actualWheelCount > 0) {
            const left = resp.data.length;
            const right = (resp.data.length / 2) % 3;
            this.indexingLeft = left - right;
          }

          localStorage.setItem(
            'INDEXING_LEFT',
            JSON.stringify(this.indexingLeft)
          );
        }
      });
  }

  onWheelSubmit(count: number) {
    if (count < this.actualWheelCount) {
      this.ModalMessage = 'Wheels are missing for this current PO.';
    } else {
      this.ModalMessage = 'Number of wheels exceeded for this current PO.';
    }

    this.enableWarningPopupModal = false;
    if (count == this.actualWheelCount) {
      this.enablePopupModal = true;
    } else {
      this.enableWarningPopupModal = true;
    }
  }

  reEnterWheelCount() {
    this.enableWarningPopupModal = false;
    this.wheelCount = 0;
  }

  report() {}

  proceedToMaterialCheck() {
    this.sharedService.sentClickEventpoStageCompleted('ip-carrier-scan');
    this.router.navigate(['/op/ms/material-check']);
  }
}
