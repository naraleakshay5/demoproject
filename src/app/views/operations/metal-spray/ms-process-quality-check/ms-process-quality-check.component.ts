import { SharedService } from './../../Shared/shared.service';
import { MetalSprayService } from './../metal-spray.service';
import { Component, OnInit } from '@angular/core';
import { PoData } from '../../Shared/shared-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ms-process-quality-check',
  templateUrl: './ms-process-quality-check.component.html',
  styleUrls: ['./ms-process-quality-check.component.scss'],
})
export class MsProcessQualityCheckComponent implements OnInit {
  poData!: PoData;
  processId!: number;
  processQuality: any;
  innerQualityIsChecked!: boolean;
  innerQualityIsTouched!: boolean;
  midQualityIsChecked!: boolean;
  midQualityIsTouched!: boolean;
  outerQualityIsChecked!: boolean;
  outerQualityIsTouched!: boolean;
  allQualityCheckIsDone: boolean = false;
  enableModalPopup: boolean = false;
  totalWheelDetails: any;
  scannedWheel: any;
  enableProceedToCheckout: boolean = false;
  indexingLeft!: number;
  previousPoData!: PoData;
  isPresentInPreviousPo!: boolean;
  totalWheelDetailsForNewPo: any;
  scannedWheelsForNewPo: any;
  machineId!: number;
  poCheckoutStatus: boolean = false;
  constructor(
    private metalSprayService: MetalSprayService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);

    const totalWheelDetails = localStorage.getItem('TOTAL_WHEEL_DETAILS')!;
    if (JSON.parse(totalWheelDetails)) {
      this.totalWheelDetails = JSON.parse(totalWheelDetails);
    }
    const totalWheelDetailsForNewPo = localStorage.getItem(
      'TOTAL_WHEEL_DETAILS_FOR_NEW_PO'
    )!;
    if (JSON.parse(totalWheelDetailsForNewPo)) {
      this.totalWheelDetailsForNewPo = JSON.parse(totalWheelDetailsForNewPo);
    }

    const scannedWheels = localStorage.getItem('SCANNED_WHEEL_DETAILS')!;
    if (JSON.parse(scannedWheels)) {
      this.scannedWheel = JSON.parse(scannedWheels);
    }
    const scannedWheelsForNewPo = localStorage.getItem(
      'SCANNED_WHEEL_DETAILS_FOR_NEW_PO'
    )!;
    if (JSON.parse(scannedWheelsForNewPo)) {
      this.scannedWheelsForNewPo = JSON.parse(scannedWheelsForNewPo);
    }

    const indexingLeft = localStorage.getItem('INDEXING_LEFT')!;

    if (indexingLeft && !isNaN(+indexingLeft)) {
      this.indexingLeft = +indexingLeft;
    }

    const previousPoData = localStorage.getItem('PREVIOUS_PO_DATA')!;
    if (JSON.parse(previousPoData)) {
      this.previousPoData = JSON.parse(previousPoData);
    }

    this.getProcessQualityCheck();
  }

  getProcessQualityCheck() {
    let gun2 = localStorage.getItem('GUN_2_DETAILS')!;
    const gun2Details = JSON.parse(gun2);
    this.metalSprayService
      .getProcessQualityCheck(
        gun2Details.poData?.sach_id,
        this.processId,
        gun2Details.poData?.po_id,
        this.machineId
      )
      .subscribe((resp: any) => {
        this.processQuality = resp.data.spc[0];
        this.poCheckoutStatus = resp.data.poCheckoutStatus;
        if (this.poCheckoutStatus == true) {
          let gun2 = localStorage.getItem('GUN_2_DETAILS')!;
          const gun2Details = JSON.parse(gun2);
          localStorage.setItem('PO_DATA', JSON.stringify(gun2Details.poData));
          this.sharedService.sentClickEventpoStageCompleted('metal-spray');
        }
      });
  }

  checkInnerQuality(event: any) {
    const val = event.target.value;

    this.innerQualityIsTouched = true;
    if (
      val <= this.processQuality.inner_length.max &&
      val >= this.processQuality.inner_length.min
    ) {
      this.innerQualityIsChecked = true;
    } else {
      this.innerQualityIsChecked = false;
    }
    this.checkAllQualityIsDone();
  }

  checkMidQuality(event: any) {
    const val = event.target.value;

    this.midQualityIsTouched = true;
    if (
      val <= this.processQuality.mid_length.max &&
      val >= this.processQuality.mid_length.min
    ) {
      this.midQualityIsChecked = true;
    } else {
      this.midQualityIsChecked = false;
    }
    this.checkAllQualityIsDone();
  }

  checkOuterQuality(event: any) {
    const val = event.target.value;

    this.outerQualityIsTouched = true;
    if (
      val <= this.processQuality.outer_length.max &&
      val >= this.processQuality.outer_length.min
    ) {
      this.outerQualityIsChecked = true;
    } else {
      this.outerQualityIsChecked = false;
    }
    this.checkAllQualityIsDone();
  }

  checkAllQualityIsDone() {
    if (
      this.innerQualityIsChecked &&
      this.midQualityIsChecked &&
      this.outerQualityIsChecked
    ) {
      this.allQualityCheckIsDone = true;
    } else {
      this.allQualityCheckIsDone = false;
    }
  }

  addWheel() {
    localStorage.removeItem('GUN_2_DETAILS');
    this.router.navigate(['op/ms/wheel-operation']);
  }

  proceedToCompletePo() {
    this.enableModalPopup = true;
  }

  modalConfirmationCanelled() {
    this.enableModalPopup = false;
  }

  modalConfirmationToCompletePo() {
    let gun2 = localStorage.getItem('GUN_2_DETAILS')!;
    const gun2Details = JSON.parse(gun2);
    localStorage.setItem('PO_DATA', JSON.stringify(gun2Details.poData));
    this.sharedService.sentClickEventpoStageCompleted('process-quality-check');
    this.router.navigate(['op/ms/scrap-booking']);
  }

  proceedToMetalSpray() {
    localStorage.removeItem('gun2Details');
    this.router.navigate(['op/ms/wheel-operation']);
  }

  nextToMetalSpray() {
    this.router.navigate(['op/ms/metal-spray']);
  }
}
