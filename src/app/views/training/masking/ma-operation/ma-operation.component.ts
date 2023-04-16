import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-ma-operation',
  templateUrl: './ma-operation.component.html',
  styleUrls: ['./ma-operation.component.scss'],
})
export class MaOperationComponent implements OnInit {
  progress!: number;
  enableMajorRework: boolean = false;
  enableMinorRework: boolean = false;
  enableReworkModal: boolean = false;
  enableInProcessQualityCheckModal: boolean = false;
  totalWheelsCount!: number;
  currentWheelCount!: number;

  elementsProcessed!: number;
  wheelCompleted: boolean = false;
  remainingElements!: number;

  visible = true;
  isMajor: boolean = false;
  isMinor: boolean = false;
  reworkType: string = '';

  constructor(private router: Router, private appStorage: AppStorage) {}

  ngOnInit(): void {
    const currentWheelCount = this.appStorage.get('OUTPUT_SCANNED_WHEEL');
    if (currentWheelCount != null && currentWheelCount.length) {
      this.currentWheelCount = currentWheelCount.length;
    } else {
      this.currentWheelCount = 0;
    }

    const progress = this.appStorage.get('PROGRESS');
    if (progress != null) {
      this.progress = progress;
    } else {
      this.progress = 0;
    }
  }

  addProgress() {
    this.progress++;
    this.appStorage.set('PROGRESS', this.progress);
    this.remainingElements = 100 - this.progress;
  }

  addBins() {
    this.router.navigate(['training/masking-input-scan']);
  }

  addWheel() {
    this.router.navigate(['training/masking-output-scan']);
  }

  inProcessQualityCheck() {
    this.enableInProcessQualityCheckModal = true;
  }

  reworkConfirmed() {
    this.enableReworkModal = true;
  }

  toggleVisibilityForPRocessQualityCheck() {
    this.enableInProcessQualityCheckModal =
      !this.enableInProcessQualityCheckModal;
  }

  toggleVisibilityForReworkModal() {
    this.enableReworkModal = false;
    this.enableInProcessQualityCheckModal =
      !this.enableInProcessQualityCheckModal;
  }

  toggleVisibilityForMajorRework() {
    this.enableMajorRework = false;
    this.enableReworkModal = false;
    this.enableInProcessQualityCheckModal =
      !this.enableInProcessQualityCheckModal;
  }

  toggleVisibilityForMinorRework() {
    this.enableMinorRework = false;
    this.enableReworkModal = false;
    this.enableInProcessQualityCheckModal =
      !this.enableInProcessQualityCheckModal;
  }

  minor() {
    this.reworkType = 'minor';
    this.isMinor = true;
    this.isMajor = false;
  }

  major() {
    this.reworkType = 'major';
    this.isMajor = true;
    this.isMinor = false;
  }

  modalConfirmed() {
    if (this.reworkType == 'major') {
      this.enableMajorRework = true;
    } else {
      this.enableMinorRework = true;
    }
    this.enableReworkModal = false;
  }

  majorReworkModalConfirmed() {
    this.enableMajorRework = false;
    this.enableReworkModal = false;
    this.enableInProcessQualityCheckModal =
      !this.enableInProcessQualityCheckModal;
    this.progress = 0;
    this.appStorage.clear('OUTPUT_SCAN_COUNT');
    this.appStorage.clear('OUTPUT_SCANNED_WHEEL');
    this.appStorage.clear('PROGRESS');
    this.router.navigate(['training/masking-output-scan']);
  }

  minorReworkModalConfirmed() {
    this.enableMinorRework = false;
  }

  completePo() {
    this.router.navigate(['training/label-scrap']);
  }
}
