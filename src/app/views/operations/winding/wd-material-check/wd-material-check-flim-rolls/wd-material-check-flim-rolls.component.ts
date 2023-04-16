import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { WindingService } from '../../winding.service';
import { PO_DATA, reason } from '../../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { SharedService } from '../../../Shared/shared.service';
@Component({
  selector: 'app-wd-material-check-flim-rolls',
  templateUrl: './wd-material-check-flim-rolls.component.html',
  styleUrls: ['./wd-material-check-flim-rolls.component.scss'],
})
export class WdMaterialCheckFlimRollsComponent implements OnInit {
  @Input() isWindingMaterialReelCheck!: boolean;
  @Output() materialRollCheckInWinding = new EventEmitter();

  machineId: any;
  isStartedScanningFilmRolls: boolean = false;
  l1Value: any = null;
  l2Value: any;
  r1Value: any;
  r2Value: any;
  l1ValueActual: any = null;
  r1ValueActual: any;
  r2ValueActual: any;
  l2ValueActual: any;
  colorCircle2: boolean = false;
  isScanEnabled: boolean = false;
  scannerInputValue: any = null;
  l1Flag: boolean = false;
  l2Flag: boolean = false;
  r1Flag: boolean = false;
  r2Flag: boolean = false;
  enableRescanButton: boolean = false;
  enableInstructionBox: boolean = false;
  isFilmRollPanelEnabled: boolean = false;
  isMaterialCheckCompleted: boolean = false;
  poData!: PO_DATA;
  isFromWinding: any;
  disableL1: boolean = false;
  disableL2: boolean = false;
  disableR1: boolean = false;
  disableR2: boolean = false;
  scannedReels: any[] = [];
  processId: any;
  filmPo: any;
  isIncorrectScannedReel: boolean = false;
  wrongScannedCount: number = 0;
  wrongscanned: boolean = false;
  backToBags: boolean = false;
  tiplMaterial: string = '';
  reasons: reason[] = [];
  selectedReason: any;
  previousScannedReel: boolean = false;
  isAllreadyScanned: boolean = false;
  scannerInputValueLocation: any;
  AllScannedReel: any[] = [];

  constructor(
    private windingService: WindingService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('material-check/films');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.tiplMaterial = this.appStorage.get('DETECTED_MATERIAL');
    this.isFromWinding = this.appStorage.get('TEM_WD_WINDING');
    const filmPo = this.appStorage.get('TEM_FILM_PO');
    if (filmPo && filmPo !== undefined) {
      this.filmPo = filmPo;
    } else {
      this.route.queryParams.subscribe((params: any) => {
        this.filmPo = params.film_po;
        this.appStorage.set('TEM_FILM_PO', this.filmPo);
      });
    }

    this.isFilmRollPanelEnabled = this.appStorage.get('PREVIOUS_BATCH_SAME');

    this.previousScannedReel = this.appStorage.get('PREVIOUS_BATCH_SAME');

    const l2value = this.appStorage.get('TEM_L2_VALUE');
    const previousL2value = this.appStorage.get('PREVIOUS_L2_VALUE');

    if (
      (l2value && l2value != null) ||
      (previousL2value &&
        previousL2value != null &&
        this.previousScannedReel === true)
    ) {
      this.l2Value =
        l2value && l2value != null
          ? l2value.split('_')[0]
          : previousL2value.split('_')[0];
      this.scannerInputValueLocation = previousL2value.slice(-2);
      this.rollL2();
    }

    const l1value = this.appStorage.get('TEM_L1_VALUE');
    const previousL1value = this.appStorage.get('PREVIOUS_L1_VALUE');
    if (
      (l1value && l1value != null) ||
      (previousL1value &&
        previousL1value != null &&
        this.previousScannedReel === true)
    ) {
      this.l1Value =
        l1value && l1value != null
          ? l1value.split('_')[0]
          : previousL1value.split('_')[0];
      this.scannerInputValueLocation = previousL1value.slice(-2);

      this.rollL1();
    }

    const r1Value = this.appStorage.get('TEM_R1_VALUE');
    const previousR1Value = this.appStorage.get('PREVIOUS_R1_VALUE');
    if (
      (r1Value && r1Value != null) ||
      (previousR1Value &&
        previousR1Value != null &&
        this.previousScannedReel === true)
    ) {
      this.r1Value =
        r1Value && r1Value != null
          ? r1Value.split('_')[0]
          : previousR1Value.split('_')[0];
      this.scannerInputValueLocation = previousR1Value.slice(-2);

      this.rollR1();
    }
    const r2Value = this.appStorage.get('TEM_R2_VALUE');
    const previousR2Value = this.appStorage.get('PREVIOUS_R2_VALUE');
    if (
      (r2Value && r2Value != null) ||
      (previousR2Value &&
        previousR2Value != null &&
        this.previousScannedReel === true)
    ) {
      this.r2Value =
        r2Value && r2Value != null
          ? r2Value.split('_')[0]
          : previousR2Value.split('_')[0];
      this.scannerInputValueLocation = previousR2Value.slice(-2);

      this.rollR2();
    }
  }

  insertFilmBags() {
    const reqObj = {
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      film_reels: this.scannedReels,
      is_reel_scanned: this.previousScannedReel !== true ? true : false,
    };

    this.windingService.insertFilmReel(reqObj).subscribe({
      next: (res: any) => {
        this.isMaterialCheckCompleted = true;
        this.appStorage.clear('TEM_FILM_PO');
        if (this.isFromWinding) {
          this.router.navigate(['op/wd/recipe-setup']);
          this.appStorage.set('TEM_WD_WINDING', false);
        } else {
          this.router.navigate(['op/wd/tool-check']);
        }
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  startedScanning() {
    this.isStartedScanningFilmRolls = true;

    this.isScanEnabled = true;
  }

  cancelScanForFilmRoll() {
    this.isScanEnabled = false;

    this.isStartedScanningFilmRolls = false;
  }

  scannedFilmRolls(data: any) {
    this.isIncorrectScannedReel = false;
    const filmPoInReel = data.slice(6, 15);
    const filmPO = this.filmPo.split(',');
    const isReelValid = filmPO
      .filter((ele: any) => ele == filmPoInReel)
      .some((ele: any) => ele == filmPoInReel);

    this.AllScannedReel.forEach((ele) => {
      if (ele === data.slice(15, 19) && this.isAllreadyScanned === false) {
        this.isAllreadyScanned = true;
      }
    });

    if (isReelValid) {
      if (this.isAllreadyScanned == false) {
        this.scannerInputValueLocation = data.slice(19);
        this.scannerInputValue = data.slice(15, 19);
        this.AllScannedReel.push(this.scannerInputValue);
      }
    } else {
      this.wrongScannedCount++;
      this.wrongscanned = false;
      if (this.wrongScannedCount >= 3) {
        this.wrongscanned = true;
      }
      this.isIncorrectScannedReel = true;
    }
    if (this.isAllreadyScanned == false) {
      this.enableInstructionBox = true;
      this.enableRescanButton = true;
    }
    this.isFilmRollPanelEnabled = true;
    this.isScanEnabled = false;
  }

  rollL1() {
    this.l1Value =
      this.l1Value !== null && this.l1Value !== undefined
        ? this.l1Value
        : this.scannerInputValue;
    if (
      this.l1Value != '' &&
      this.l1Value != null &&
      (this.scannerInputValueLocation === 'L' ||
        this.scannerInputValueLocation === 'L1')
    ) {
      this.l1ValueActual = this.l1Value;
      this.scannedReels.push({ film_reel_code: this.l1Value, location: 'L1' });
      this.l1Flag = true;
      this.isScanEnabled = true;
      this.scannerInputValue = null;
      this.scannerInputValueLocation = null;
      this.enableRescanButton = false;
      this.enableInstructionBox = false;
      this.disableL1 = true;
      this.appStorage.set('TEM_L1_VALUE', this.l1Value + '_L1');
      this.appStorage.set('PREVIOUS_L1_VALUE', this.l1Value + '_L1');
    }
  }

  rollL2() {
    this.l2Value =
      this.l2Value !== null && this.l2Value !== undefined
        ? this.l2Value
        : this.scannerInputValue;
    if (
      this.l2Value != '' &&
      this.l2Value != null &&
      (this.scannerInputValueLocation === 'L' ||
        this.scannerInputValueLocation === 'L2')
    ) {
      this.l2ValueActual = this.l2Value;
      this.scannedReels.push({ film_reel_code: this.l2Value, location: 'L2' });
      this.l2Flag = true;
      this.isScanEnabled = true;
      this.scannerInputValue = null;
      this.scannerInputValueLocation = null;
      this.enableRescanButton = false;
      this.enableInstructionBox = false;
      this.disableL2 = true;
      this.appStorage.set('PREVIOUS_L2_VALUE', this.l2Value + '_L2');
      this.appStorage.set('TEM_L2_VALUE', this.l2Value + '_L2');
    }
  }

  rollR1() {
    this.r1Value =
      this.r1Value !== null && this.r1Value !== undefined
        ? this.r1Value
        : this.scannerInputValue;
    if (
      this.r1Value != '' &&
      this.r1Value != null &&
      (this.scannerInputValueLocation === 'R' ||
        this.scannerInputValueLocation === 'R1')
    ) {
      this.r1ValueActual = this.r1Value;
      this.scannedReels.push({ film_reel_code: this.r1Value, location: 'R1' });
      this.r1Flag = true;
      this.isScanEnabled = true;
      this.scannerInputValue = null;
      this.scannerInputValueLocation = null;
      this.enableRescanButton = false;
      this.enableInstructionBox = false;
      this.disableR1 = true;
      this.appStorage.set('PREVIOUS_R1_VALUE', this.r1Value + '_R1');
      this.appStorage.set('TEM_R1_VALUE', this.r1Value + '_R1');
    }
  }

  rollR2() {
    this.r2Value =
      this.r2Value !== null && this.r2Value !== undefined
        ? this.r2Value
        : this.scannerInputValue;
    if (
      this.r2Value != '' &&
      this.r2Value != null &&
      (this.scannerInputValueLocation === 'R' ||
        this.scannerInputValueLocation === 'R2')
    ) {
      this.r2ValueActual = this.r2Value;
      this.scannedReels.push({ film_reel_code: this.r2Value, location: 'R2' });
      this.r2Flag = true;
      this.isScanEnabled = true;
      this.scannerInputValue = null;
      this.scannerInputValueLocation = null;
      this.enableRescanButton = false;
      this.enableInstructionBox = false;
      this.disableR2 = true;
      this.appStorage.set('PREVIOUS_R2_VALUE', this.r2Value + '_R2');
      this.appStorage.set('TEM_R2_VALUE', this.r2Value + '_R2');
    }
  }

  cancelAllRollScanned() {
    this.l1Value = null;
    this.l1Flag = false;
    this.disableL1 = false;
    this.l2Value = null;
    this.l2Flag = false;
    this.disableL2 = false;
    this.r1Value = null;
    this.r1Flag = false;
    this.disableR1 = false;
    this.r2Value = null;
    this.r2Flag = false;
    this.disableR2 = false;
    this.appStorage.clear('TEM_R1_VALUE');
    this.appStorage.clear('TEM_R2_VALUE');
    this.appStorage.clear('TEM_L1_VALUE');
    this.appStorage.clear('TEM_L2_VALUE');
  }

  confirmModalToCompleteMaterialCheck() {
    this.insertFilmBags();
    this.cancelAllRollScanned();
  }

  reelPreviousScanned() {
    this.insertFilmBags();
    this.cancelAllRollScanned();
  }

  scanAgain() {
    this.isScanEnabled = true;
    this.scannerInputValue = null;
    this.enableRescanButton = false;
    this.scannerInputValueLocation = null;
    this.enableInstructionBox = false;
    this.isAllreadyScanned = false;
  }

  backToScan() {
    this.backToBags = false;
    this.sharedService
      .getReasons(this.processId, 'FILM_REEL')
      .subscribe((res: any) => {
        this.reasons = res.data;
        this.backToBags = true;
      });
  }

  onSelected(value: any) {
    this.selectedReason = value;
  }

  back() {
    const resBody = {
      reason_id: this.selectedReason,
      production_order_id: this.poData.po_id,
      machine_id: this.machineId,
    };
    this.sharedService.postReason(resBody).subscribe((res: any) => {
      this.router.navigate(['op/wd/material-check']);
      this.appStorage.clear('TEM_FILM_PO');
    });
  }
}
