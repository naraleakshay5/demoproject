import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { WindingService } from '../winding.service';

@Component({
  selector: 'app-wd-material-check',
  templateUrl: './wd-material-check.component.html',
  styleUrls: ['./wd-material-check.component.scss'],
})
export class WdMaterialCheckComponent implements OnInit {
  @Input() isWindingMaterialCheck: any;
  @Output() completeMaterialCheckInWinding = new EventEmitter();

  materialCheckPo: any;
  machineId: any;
  isProceededToScan = false;
  allScanned = false;
  previousScanned = false;
  isStartedScanning = false;
  materialDetails: any;
  isScanEnabled: boolean = false;
  isMaterialCheckScanComplete: boolean = false;
  isWrongMaterialScanned: boolean = false;
  isAlreadyScanned: boolean = false;
  scannedMaterial: any;
  isAllreadyScannedArray: any = [];
  poData!: PO_DATA;
  processId: any;
  wrongScannedCount: number = 0;
  wrongscanned = false;
  scannedFilmsBags: any = [];
  constructor(
    private windingService: WindingService,
    private router: Router,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('material-check');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.getMaterialCheckPo();

    this.previousScanned = this.appStorage.get('PREVIOUS_BATCH_SAME');
  }

  getMaterialCheckPo() {
    this.windingService
      .getMaterialCheckPo(this.processId, this.poData?.sach_id)
      .subscribe((resp: any) => {
        this.materialCheckPo = resp.data;
        this.materialDetails = resp?.data.map((key: any) => ({
          ...key,
          isChecked: false,
          scannedMaterial: null,
        }));
      });
  }

  proceedToScan() {
    this.isScanEnabled = true;
  }

  scanNext() {
    this.isScanEnabled = true;
  }

  allValueScanned() {
    const isStainer = this.scannedFilmsBags.some(
      (ele: any) => ele.vendor == 'STAINER'
    );
    if (isStainer) {
      this.router.navigate(['op/wd/tool-check']);
    } else {
      this.allScanned = true;
    }
  }

  modalCheckedToCompleteFilmBags() {
    this.insertMaterial();
    // if (this.isWindingMaterialCheck) {
    //   this.completeMaterialCheckInWinding.emit();
    // }
  }

  insertMaterial() {
    const isStainer = this.scannedFilmsBags.some(
      (ele: any) => ele.vendor == 'STAINER'
    );
    const previousScannedMaterial = this.appStorage.get(
      'PREVIOUS_SCANNED_MATERIAL'
    );
    const poList: string[] = [];
    let scannedMaterial = null;
    if (previousScannedMaterial && this.previousScanned === true) {
      scannedMaterial = previousScannedMaterial;
      poList.push(previousScannedMaterial[0].film_po);
      this.appStorage.set(
        'DETECTED_MATERIAL',
        previousScannedMaterial[0].vendor
      );
    } else {
      scannedMaterial = this.materialDetails.filter(
        (ele: any) => ele.isChecked === true
      );
    }

    const reqObj = {
      material_id: scannedMaterial[0].id,
      material_code: scannedMaterial[0].film_code,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      is_bag_scanned: this.previousScanned !== true ? true : false,
    };
    this.scannedFilmsBags.forEach((sB: any) => {
      poList.push(sB.po);
      this.appStorage.set('DETECTED_MATERIAL', sB.vendor);
    });

    this.windingService.insertFilmBag(reqObj).subscribe(() => {
      if (isStainer) {
        this.router.navigate(['op/wd/tool-check']);
      } else {
        this.router.navigate(['op/wd/material-check/films'], {
          queryParams: { film_po: poList.join(',') },
        });
      }
    });
    this.appStorage.set('PREVIOUS_SCANNED_MATERIAL', scannedMaterial);
  }

  modalCheckCancelled() {
    this.isAllreadyScannedArray = [];
    this.isProceededToScan = true;
    this.isMaterialCheckScanComplete = false;
    this.allScanned = false;
    this.previousScanned = false;
    this.materialDetails.forEach((element: any) => {
      element.isChecked = false;
    });
  }

  checkScannedItemId(value: any) {
    const scanned_value = value.includes('x') ? value.split('x')[2] : value;
    this.isAlreadyScanned = false;
    this.isWrongMaterialScanned = false;
    const isValid = this.materialDetails.filter(
      (element: any) => element.film_code == scanned_value
    );

    if (!isValid.length) {
      this.wrongScannedCount++;
      this.wrongscanned = false;
      if (this.wrongScannedCount >= 3) {
        this.wrongscanned = true;
      }
      this.isWrongMaterialScanned = true;
    }

    const allreadyScanned = this.isAllreadyScannedArray.filter(
      (element: any) => element == value
    );

    this.materialDetails.forEach((element: any) => {
      if (scanned_value == element.film_code) {
        const scanned = element;
        scanned.isChecked = true;
        this.isAllreadyScannedArray.push(value);
        this.isWrongMaterialScanned = false;
        this.scannedMaterial = value;
        this.scannedFilmsBags.push({
          ...element,
          value: value,
          isChecked: true,
          po: value.split('x')[0],
        });
      }
    });

    this.isProceededToScan = true;
    this.isScanEnabled = false;
    this.allFilmBagsScanned();
  }

  allFilmBagsScanned() {
    let count = 0;
    this.materialDetails.forEach((element: any) => {
      if (element.isChecked == true) {
        count++;
        if (count == 1) {
          this.isMaterialCheckScanComplete = true;
        }
      }
    });
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
  }

  materialPreviousScanned() {
    this.insertMaterial();
  }
}
