import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bins } from '../../../electrical-testing/el-testing-model';
import { PO_DATA } from '../../../Shared/shared-model';
import { SharedService } from '../../../Shared/shared.service';

@Component({
  selector: 'app-aoi-output-carrier-rejected-scan',
  templateUrl: './aoi-output-carrier-rejected-scan.component.html',
  styleUrls: ['./aoi-output-carrier-rejected-scan.component.scss'],
})
export class AoiOutputCarrierRejectedScanComponent implements OnInit {
  poData!: PO_DATA;
  machineId!: number;
  allowedBins: Bins[] = [];
  isWrongBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  scannedBins: Bins[] = [];
  isBtnDisabled: boolean = false;
  processId!: number;
  newBin: any;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.scannedBins = this.appStorage.get('SCANNED_REJECTED_OUTPUT_BINS');
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
      this.isBtnDisabled = true;
    }
    this.scannedBins = [...this.scannedBins, this.newBin].map((b: any) => ({
      ...b,
      is_checked: true,
    }));

    this.appStorage.set('SCANNED_REJECTED_OUTPUT_BINS', this.scannedBins);
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
  }

  proceed() {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');

    const data = {
      material_carrier_id: this.newBin?.id,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
    };

    this.sharedService.sentClickEventpoStageCompleted('output-rejected-bin');

    this.sharedService.postBins(data, 'Bin').subscribe((res: any) => {
      this.appStorage.set(
        'TOTAL_OUTPUT_REJECTED_BINS_SCANNED',
        this.scannedBins?.length
      );

      const scannedBinsIsChecked = this.scannedBins.filter(
        (bin: any) => bin.is_checked == true
      );

      if (this.scannedBins?.length < 2) {
        this.router.navigate(['op/aoi/output-good-bin']);
      } else if (scannedBinsIsChecked.length > 1) {
        this.router.navigate(['op/aoi/operations']);
      }
    });
  }
}
