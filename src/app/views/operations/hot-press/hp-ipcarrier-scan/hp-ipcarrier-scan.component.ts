import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../Shared/shared.service';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-hp-ipcarrier-scan',
  templateUrl: './hp-ipcarrier-scan.component.html',
  styleUrls: ['./hp-ipcarrier-scan.component.scss'],
})
export class HpIPCarrierScanComponent implements OnInit {
  poId: any;
  scannedBins: any[] = [];
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
  operationalsLogs: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.operationalsLogs = this.appStorage.getOperationalLogs();
    this.sharedService.sentClickEventpoStageCompleted('ip-carrier-scan');
    this.poId = this.route.snapshot.queryParamMap.get('poId');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.poData = this.appStorage.get('PO_DATA');
    const scannedBins = this.appStorage.get('TEM_INPUT_SCANNED_BIN');
    if (scannedBins && scannedBins !== undefined) {
      this.scannedBins = scannedBins;
      this.allowedBins = scannedBins;
      this.totalBins = scannedBins.length;
      this.scanned_bin = scannedBins.filter(
        (e: any) => e.is_checked === true
      ).length;
    } else {
      this.materialCarrierBinded();
    }
  }

  materialCarrierBinded() {
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

  proceed() {
    this.latestScan = [{ id: 10 }, { id: 11 }, { id: 12 }];
    const reqBody = this.latestScan.map((e: any) => ({
      material_carrier_id: e.id,
    }));
    const scanBins = this.appStorage.get('TEM_SCAN_INPUT_BIN');
    this.sharedService.releaseCarriers(reqBody).subscribe({
      next: (res: any) => {
        this.appStorage.set('TEM_INPUT_SCANNED_BIN', this.scannedBins);
        if (scanBins && scanBins !== undefined) {
          this.router.navigate(['op/hp/operations']);
        } else {
          this.router.navigate(['op/hp/grill-selection']);
        }
      },
      error: (error) => {
        console.info(error);
      },
    });
  }
}
