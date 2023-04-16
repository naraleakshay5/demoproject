import { PO_DATA } from './../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../Shared/shared.service';
import { Bins } from '../el-testing-model';

@Component({
  selector: 'app-el-output-carrier-scan',
  templateUrl: './el-output-carrier-scan.component.html',
  styleUrls: ['./el-output-carrier-scan.component.scss'],
})
export class ElOutputCarrierScanComponent implements OnInit {
  poData!: PO_DATA;
  machineId!: number;
  allowedBins: Bins[] = [];
  isWrongBinScanned: boolean = false;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  scannedBins: Bins[] = [];
  allScannedBins: Bins[] = [];
  is_btnDisabled: boolean = false;
  is_proceed: boolean = false;
  processId!: number;
  newBin: any;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.scannedBins = this.appStorage.get('SCANNED_OUTPUT_BINS');
    if (!this.scannedBins) {
      this.scannedBins = [];
    }
    this.processId = this.appStorage.get('PROCESS_ID');

    this.getAllowedBins();
  }

  getAllowedBins() {
    this.sharedService
      .getAllowdBins(this.appStorage.get('PROCESS_ID'))
      .subscribe({
        next: (resp: any) => {
          this.allowedBins = resp.data;
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
      this.newBin = this.allowedBins?.find(
        (element: any) => element.name == binValue
      );

      this.isScanEnabled = false;
      this.isStartedScanning = false;
      this.is_btnDisabled = true;
    }
    this.scannedBins = [...this.scannedBins, this.newBin].map((b: any) => ({
      ...b,
      is_checked: true,
    }));

    this.appStorage.set('SCANNED_OUTPUT_BINS', this.scannedBins);
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
  }

  proceed() {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');

    const retestingStarted = this.appStorage.get('RETESTING_STARTED');
    const data = {
      material_carrier_id: this.newBin?.id,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
    };

    this.sharedService.sentClickEventpoStageCompleted('output-carrier-scan');

    this.sharedService.postBins(data, 'Bin').subscribe((res: any) => {
      localStorage.setItem(
        'TOTAL_OUTPUT_BINS_SCANNED',
        JSON.stringify(this.scannedBins?.length)
      );

      const scannedBinsIsChecked = this.scannedBins.filter(
        (bin: any) => bin.is_checked == true
      );

      if (retestingStarted) {
        this.router.navigate(['op/el/re-test']);
      } else if (scannedBinsIsChecked.length > 1) {
        this.router.navigate(['op/el/operations']);
      } else {
        this.router.navigate(['op/el/video-jet']);
      }
    });
  }
}
