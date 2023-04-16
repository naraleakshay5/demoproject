import { PO_DATA } from './../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { SharedService } from './../../Shared/shared.service';
import { ElTestingService } from './../el-testing.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Bins } from '../el-testing-model';

@Component({
  selector: 'app-el-input-carrier-scan',
  templateUrl: './el-input-carrier-scan.component.html',
  styleUrls: ['./el-input-carrier-scan.component.scss'],
})
export class ElInputCarrierScanComponent implements OnInit {
  poData!: PO_DATA;
  allowedBins: Bins[] = [];
  isWrongBinScanned: boolean = false;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  scannedBins: any[] = [];
  allScannedBins: Bins[] = [];
  is_btnDisabled: boolean = false;
  processId!: number;
  newBin: any;
  scanIsChecked!: any[];
  scannedBinsWithTrue: any[] = [];

  constructor(
    private router: Router,
    private testingService: ElTestingService,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.scannedBins = this.appStorage.get('SCANNED_INPUT_BINS');

    if (this.scannedBins == null) {
      this.scannedBins = [];
      this.materialCarrierBinded();
    } else {
      this.allowedBins = this.scannedBins;
    }
  }

  materialCarrierBinded() {
    this.poData = this.appStorage.get('PO_DATA');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.testingService
      .getLinkedBins(this.processId, this.poData?.po_id)
      .subscribe({
        next: (resp: any) => {
          this.allowedBins = resp.data;
          this.scannedBins = resp.data.map((key: any) => ({
            ...key,
            scanned_bin: '',
            is_checked: false,
          }));
        },
        error: (error) => {
          console.info(error);
        },
      });
  }

  startScanning() {
    this.isWrongBinScanned = false;
    this.isScanEnabled = true;
    this.isStartedScanning = true;
    this.isAlreadyBinScanned = false;
  }

  checkScannedBin(binValue: any) {
    const isAllowed = this.allowedBins?.some(
      (element: any) => element.name == binValue
    );

    if (!isAllowed) {
      this.isWrongBinScanned = true;
      this.isScanEnabled = false;
      return;
    }

    const isAlreadyScanned = this.scannedBins.some(
      (bin: any) => bin.name == binValue && bin.is_checked == true
    );

    if (isAlreadyScanned) {
      this.isWrongBinScanned = true;
      this.isScanEnabled = false;
      return;
    }

    if (isAllowed && !isAlreadyScanned) {
      this.newBin = this.scannedBins?.find(
        (element: any) => element.name == binValue
      );

      this.newBin.is_checked = true;

      this.isScanEnabled = false;
      this.isStartedScanning = false;
      this.is_btnDisabled = true;
    }

    this.scannedBins = [...this.scannedBins];
    this.appStorage.set('SCANNED_INPUT_BINS', this.scannedBins);

    this.scannedBinsWithTrue = this.scannedBins.filter(
      (bin: any) => bin.is_checked == true
    );
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
  }

  proceed() {
    const retestingStarted = this.appStorage.get('RETESTING_STARTED');

    this.sharedService.sentClickEventpoStageCompleted('ip-carrier-scan');

    if (this.scannedBinsWithTrue.length > 1) {
      if (retestingStarted) {
        this.router.navigate(['op/el/re-test']);
      } else {
        this.router.navigate(['op/el/operations']);
      }
    } else {
      this.router.navigate(['op/el/op-carrier-scan']);
    }
  }
}
