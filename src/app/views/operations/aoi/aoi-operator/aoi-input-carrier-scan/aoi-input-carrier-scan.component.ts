import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PO_DATA } from '../../../Shared/shared-model';
import { SharedService } from '../../../Shared/shared.service';

@Component({
  selector: 'app-aoi-input-carrier-scan',
  templateUrl: './aoi-input-carrier-scan.component.html',
  styleUrls: ['./aoi-input-carrier-scan.component.scss'],
})
export class AoiInputCarrierScanComponent implements OnInit {
  scannedBins: any[] = [];
  allScannedBins: any[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  totalBins!: number;
  scanned_bin: number = 0;
  isBtnDisabled: boolean = false;
  processId: any | null;
  poData!: PO_DATA;
  allowedBins: any[] = [];
  isScannedSuccess: boolean = false;
  isOpen: boolean = false;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.materialCarrierBinded();
  }

  materialCarrierBinded() {
    this.processId = this.appStorage.get('PROCESS_ID');
    this.poData = this.appStorage.get('PO_DATA');

    this.sharedService
      .materialCarrierBinded(this.processId, this.poData.po_id, 'input')
      .subscribe((res: any) => {
        this.allowedBins = res.data;
        this.scannedBins = res.data.map((key: any) => ({
          ...key,
          scanned_bin: '',
          is_checked: false,
        }));
        this.totalBins = this.allowedBins.length;
      });
  }

  startScanning() {
    this.isWrongBinScanned = true;
    this.isAlreadyBinScanned = false;
    this.isOpen = true;
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
    this.isOpen = false;
  }

  closeOpen() {
    this.isOpen = false;
  }

  checkScannedBins(binValue: any) {
    let scanCount = 0;
    this.scannedBins = this.scannedBins.map((record: any, index: number) => {
      if (record.name == binValue && record.is_checked == false) {
        record.scanned_bin = binValue;
        record.is_checked = true;
        this.scanned_bin++;
        scanCount = 1;
      } else if (record.name == binValue && record.is_checked == true) {
        this.isAlreadyBinScanned = true;
      }
      return record;
    });

    if (this.scanned_bin == this.totalBins) {
      this.isBtnDisabled = true;
    }
    const allBins = this.allowedBins.map((ele: any) => ele.name);
    this.isWrongBinScanned = allBins.includes(binValue);
  }

  proceed() {
    this.sharedService.sentClickEventpoStageCompleted('ip-carrier-scan');
    this.router.navigate(['op/aoi/recipe-setup']);
  }
}
