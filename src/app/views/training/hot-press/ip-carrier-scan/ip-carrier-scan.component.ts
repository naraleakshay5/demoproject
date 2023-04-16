import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppStorage } from 'src/app/storage.service';
import { SharedService } from 'src/app/views/operations/Shared/shared.service';
@Component({
  selector: 'app-ip-carrier-scan',
  templateUrl: './ip-carrier-scan.component.html',
  styleUrls: ['./ip-carrier-scan.component.scss'],
})
export class IpCarrierScanComponent implements OnInit {
  poId: any;
  //scannedBins: any[] = [];
  allScannedBins: any[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  totalBins!: number;
  scanned_bin: number = 0;
  is_btnDisabled: boolean = false;
  processId: any | null;
  poData: any;
  allowedBins: any[] = [];
  isScannedSuccess: boolean = false;
  isOpen: boolean = false;
  latestScan: any;
  // operationalsLogs: any[] = [];

  bins: any = [
    {
      name: 'BIN_01',
      isChecked: false,
    },
    {
      name: 'BIN_02',
      isChecked: false,
    },
  ];
  scannedBins: any;
  scanCount: number = 0;
  isBtnDisabled: boolean = false;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.appStorage.set('TEM_LAST_URL', 'ip-carrier-scan');

    const scannedBins = this.appStorage.get('SCANNED_INPUT_BINS');
    if (scannedBins?.length) {
      this.scannedBins = scannedBins;
    } else {
      this.scannedBins = this.bins;
    }
    console.log(scannedBins);
  }

  materialCarrierBinded() {
    // const scannedBins = this.appStorage.get('SCANNED_INPUT_BINS');
    // if (scannedBins?.length) {
    //   this.scannedBins = scannedBins;
    // } else {
    //   this.scannedBins = this.bins;
    // }
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
    this.isOpen = false;
  }

  closeOpen() {
    this.isOpen = false;
  }

  startScanning() {
    this.isWrongBinScanned = true;
    this.isAlreadyBinScanned = false;
    this.isOpen = true;
  }

  proceed() {
    //this.router.navigate(['training/hot-press/grill-selection']);
    // const scannedWithTrue = this.scannedBins.filter(
    //   (key: any) => key.isChecked == true
    // );

    this.latestScan = [{ id: 10 }, { id: 11 }, { id: 12 }];
    const reqBody = this.latestScan.map((e: any) => ({
      material_carrier_id: e.id,
    }));
    const scanBins = this.appStorage.get('TEM_SCAN_INPUT_BIN');
    // this.sharedService.releaseCarriers(reqBody).subscribe({
    //   next: (res: any) => {
    //     this.appStorage.set('TEM_INPUT_SCANNED_BIN', this.scannedBins);
    //     if (scanBins && scanBins !== undefined) {
    //       this.router.navigate(['training/hot-press/operations']);
    //     } else {
    //       this.router.navigate(['training/hot-press/grill-selection']);
    //     }
    //   },

    //   error: (error) => {
    //     console.info(error);
    //   },
    // });
    console.log(scanBins);

    if (scanBins !== undefined && scanBins == null && scanBins) {
      this.router.navigate(['training/hot-press/operations']);
    } else {
      this.router.navigate(['training/hot-press/grill-selection']);
    }
  }
  checkScannedBins(binValue: any) {
    this.isOpen = false;
    let scanCount = 0;
    this.scannedBins = this.scannedBins.map((record: any, index: number) => {
      if (record.name == binValue && record.is_checked == false) {
        this.latestScan.push(record);
        record.scanned_bin = binValue;
        record.is_checked = true;
        this.scanned_bin++;
        this.is_btnDisabled = true;
        scanCount = 1;
      } else if (record.name == binValue && record.is_checked == true) {
        this.isAlreadyBinScanned = true;
      }
      return record;
    });

    const allBins = this.allowedBins.map((ele: any) => ele.name);
    this.isWrongBinScanned = allBins.includes(binValue);
  }
}
