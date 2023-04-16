import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ma-output-scan',
  templateUrl: './ma-output-scan.component.html',
  styleUrls: ['./ma-output-scan.component.scss'],
})
export class MaOutputScanComponent implements OnInit {
  scannedWheel: any[] = [];
  scanCount!: number;
  isBtnDisabled: boolean = false;

  constructor(private router: Router, private appStorage: AppStorage) {}

  ngOnInit(): void {
    const scannedWheel = this.appStorage.get('OUTPUT_SCANNED_WHEEL');
    if (scannedWheel != null && scannedWheel?.length) {
      this.scannedWheel = scannedWheel;
    } else {
      this.scannedWheel = [];
    }
  }

  startScanning() {
    const scanCount = this.appStorage.get('OUTPUT_SCAN_COUNT');
    if (scanCount != null) {
      this.scanCount = scanCount;
    } else {
      this.scanCount = 0;
    }

    let wheelName = 'Wheel_0' + (this.scanCount + 1);

    const obj = {
      name: wheelName,
      isChecked: true,
    };
    this.scanCount++;
    this.appStorage.set('OUTPUT_SCAN_COUNT', this.scanCount);

    this.scannedWheel.push(obj);
    this.appStorage.set('OUTPUT_SCANNED_WHEEL', this.scannedWheel);
    this.isBtnDisabled = true;
  }

  proceedToCompleteOutputCarrierBin() {
    this.router.navigate(['training/masking-operation']);
  }
}
