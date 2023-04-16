import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from './../../Shared/shared-model';
import { SharedService } from './../../Shared/shared.service';
import { Router } from '@angular/router';
import { DemaskDeburringService } from './../demask-deburring.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dd-input-wheels',
  templateUrl: './dd-input-wheels.component.html',
  styleUrls: ['./dd-input-wheels.component.scss'],
})
export class DdInputWheelsComponent implements OnInit {
  wheelCount!: number;
  enableWarningPopupModal!: boolean;
  poData!: PO_DATA;
  actualWheelCount!: number;
  enablePopupModal!: boolean;
  modalMessage!: string;

  constructor(
    private router: Router,
    private demaskDeburService: DemaskDeburringService,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.getActualWheelCount();
  }

  getActualWheelCount() {
    this.poData = this.appStorage.get('PO_DATA');
    this.demaskDeburService.getActualWheelCount(this.poData?.po_id).subscribe({
      next: (resp: any) => {
        this.actualWheelCount = resp.data.length / 2;
        this.appStorage.set('TOTAL_WHEEL_DETAILS', resp.data);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  onWheelSubmit(count: number) {
    if (count < this.actualWheelCount) {
      this.modalMessage = 'Wheels are missing for this current PO.';
    } else {
      this.modalMessage = 'Number of wheels exceeded for this current PO.';
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
  }

  report() {
    this.enableWarningPopupModal = false;
  }

  modalCheckCancelled() {
    this.enableWarningPopupModal = false;
    this.enablePopupModal = false;
  }

  proceedToInputWheelScan() {
    this.sharedService.sentClickEventpoStageCompleted('ip-carrier-scan');
    this.router.navigate(['/op/dd/ip-wheel-scan']);
  }
}
