import { CommonService } from './../../../../common.service';
import { SharedService } from './../../Shared/shared.service';
import { PoData } from './../../Shared/shared-model';
import { MaskingService } from './../masking.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { RfidService } from 'src/app/rfid.service';

@Component({
  selector: 'app-ma-output-carrier-scan',
  templateUrl: './ma-output-carrier-scan.component.html',
  styleUrls: ['./ma-output-carrier-scan.component.scss'],
})
export class MaOutputCarrierScanComponent implements OnInit {
  poData!: PoData;
  machineId!: number;
  wheelBobbin!: number;
  wheelInput: any;
  rfId!: Subscription;

  processId!: number;
  maskingStarted!: boolean;
  isAlreadyWheelScanned: boolean = false;
  isLoading: boolean = false;
  isWrongWheelScanned: boolean = true;
  scannedWheel: any[] = [];
  allowedWheels: any[] = [];
  is_btnDisabled: boolean = false;
  newAddedWheel: any;
  isScanEnabled: boolean = false;
  currentScannedWheelEpc: any;
  wheelOperationType: any;

  constructor(
    private router: Router,
    private maskingService: MaskingService,
    private sharedService: SharedService,
    private commonService: CommonService,
    private rfIdService: RfidService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    const isMaskingStarted = localStorage.getItem('isMaskingStarted')!;
    this.maskingStarted = JSON.parse(isMaskingStarted);
    const scannedWheel = localStorage.getItem('SCANNED_WHEEL')!;
    if (JSON.parse(scannedWheel)) {
      this.scannedWheel = JSON.parse(scannedWheel);
    }

    this.getOpCarrierWheels();
    this.getWheelOperationType();
    this.rfId = this.rfIdService.tags.subscribe((wEpc: any) => {
      if (wEpc && wEpc.length) {
        this.validateScannedWheel(wEpc);
      }
    });
  }

  validateScannedWheel(formatted: any) {
    const uniqueEpc = [...new Set(formatted.map((epc: any) => epc.EPC))];

    const isValid = uniqueEpc.some((wEpc: any) => {
      const isAllowed = this.allowedWheels.some(
        (wObj: any) => wObj.rfid_epc === wEpc
      );

      const isScanned = this.scannedWheel.some(
        (wObj: any) => wObj.rfid_epc === wEpc
      );

      if (isAllowed && !isScanned) {
        this.newAddedWheel = this.allowedWheels.find(
          (w: any) => w.rfid_epc === wEpc
        );
        this.scannedWheel.push(this.newAddedWheel);
        localStorage.setItem(
          'INPUT_SCANNED_WHEEL',
          JSON.stringify(this.scannedWheel)
        );

        localStorage.setItem(
          'NEWLY_ADDED_WHEEL',
          JSON.stringify(this.newAddedWheel)
        );
      }

      return isAllowed && !isScanned;
    });

    if (isValid) {
      this.maskingService
        .postWheel(
          this.machineId,
          this.poData?.po_id,
          this.processId,
          this.newAddedWheel.id
        )
        .subscribe((resp: any) => {});
    }
  }

  getWheelOperationType() {
    this.maskingService.getWheelOperationType().subscribe((resp: any) => {
      this.wheelOperationType = resp.data;
      localStorage.setItem(
        'WHEEL_OPERATION_TYPE',
        JSON.stringify(this.wheelOperationType)
      );

      this.wheelOperationType = this.wheelOperationType.filter(
        (ele: any) => ele.operation_name == 'Wheel_Operation_Started'
      );
    });
  }

  getOpCarrierWheels() {
    this.maskingService
      .getTotalWheelDetails(this.processId)
      .subscribe((resp: any) => {
        this.allowedWheels = resp.data;
      });
  }

  proceedToCompleteOutputCarrierBin() {
    this.sharedService.sentClickEventpoStageCompleted('output-carrier-scan');

    this.maskingService
      .wheelLogOperation(
        this.poData?.po_id,
        this.newAddedWheel.id,
        this.wheelOperationType[0]?.id
      )
      .subscribe((resp: any) => {
        if (this.maskingStarted === true) {
          this.router.navigate(['op/ma/masking']);
        } else {
          this.router.navigate(['op/ma/start-masking']);
        }
      });
  }

  ngOnDestroy() {
    this.rfId.unsubscribe();
  }
}
