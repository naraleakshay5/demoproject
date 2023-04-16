import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-ma-input-scan',
  templateUrl: './ma-input-scan.component.html',
  styleUrls: ['./ma-input-scan.component.scss'],
})
export class MaInputScanComponent implements OnInit {
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

  constructor(private router: Router, private appStorage: AppStorage) {}

  ngOnInit(): void {
    const scannedBins = this.appStorage.get('SCANNED_INPUT_BINS');
    if (scannedBins?.length) {
      this.scannedBins = scannedBins;
    } else {
      this.scannedBins = this.bins;
    }
  }

  startScanning() {
    const scanCount = this.appStorage.get('INPUT_SCAN_COUNT');
    if (scanCount != null) {
      this.scanCount = scanCount;
    } else {
      this.scanCount = 0;
    }

    this.scannedBins = this.scannedBins.map((key: any, index: number) => {
      if (index == this.scanCount) {
        key.isChecked = true;
      }
      return key;
    });

    this.scanCount++;
    this.appStorage.set('SCANNED_INPUT_BINS', this.scannedBins);
    this.appStorage.set('INPUT_SCAN_COUNT', this.scanCount);
    this.isBtnDisabled = true;
  }

  proceed() {
    const scannedWithTrue = this.scannedBins.filter(
      (key: any) => key.isChecked == true
    );

    if (scannedWithTrue.length > 1) {
      this.router.navigate(['training/masking-operation']);
    } else {
      this.router.navigate(['training/masking-output-scan']);
    }
  }
}
