import { MaskingBin } from './../pre-scan-model';
import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bin } from '../pre-scan-model';
import { PreScanService } from '../pre-scan.service';

@Component({
  selector: 'app-ma-input-carrier-scan',
  templateUrl: './ma-input-carrier-scan.component.html',
  styleUrls: ['./ma-input-carrier-scan.component.scss'],
})
export class MaInputCarrierScanComponent implements OnInit {
  poId!: number;
  bins: MaskingBin[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  totalBins!: number;
  scanned_bin: number = 0;
  is_btnDisabled: boolean = false;
  machineId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private preScanService: PreScanService
  ) {}

  ngOnInit(): void {
    const poId = this.route.snapshot.queryParamMap.get('poId')!;
    this.poId = JSON.parse(poId);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    this.getPreScanBins();
  }

  getPreScanBins() {
    this.preScanService
      .getPreScanMaskingBins(this.machineId, this.poId)
      .subscribe((res: any) => {
        this.bins = res.data.map((key: any) => ({
          ...key,
          is_checked_masking: false,
          scanned_bin: '',
        }));

        this.totalBins = this.bins.length;
      });
  }

  startScanning() {
    this.isWrongBinScanned = true;
    this.isScanEnabled = true;
    this.isStartedScanning = true;
    this.isAlreadyBinScanned = false;
  }

  checkScannedBin(binValue: any) {
    this.bins = this.bins.map((record: any, index: number) => {
      if (record.name == binValue && record?.is_checked_masking == false) {
        record.scanned_bin = binValue;
        record.is_checked_masking = true;
        this.scanned_bin++;
      } else if (record.name == binValue && record.is_checked_masking == true) {
        this.isAlreadyBinScanned = true;
      }
      this.isScanEnabled = false;

      return record;
    });

    const allBins = this.bins.map((ele: any) => ele.name);
    this.isWrongBinScanned = allBins.includes(binValue);
    if (this.scanned_bin == this.totalBins) {
      this.is_btnDisabled = true;
    }
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
  }

  proceed() {
    this.preScanService
      .postPreScanMaskingBins(this.poId)
      .subscribe((res: any) => {
        this.router.navigate(['/po-list']);
      });
  }
}
