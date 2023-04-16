import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoData } from '../../Shared/shared-model';
import { MetalSprayService } from '../metal-spray.service';

@Component({
  selector: 'app-ms-material-scan',
  templateUrl: './ms-material-scan.component.html',
  styleUrls: ['./ms-material-scan.component.scss'],
})
export class MsMaterialScanComponent implements OnInit {
  isScanEnabled: boolean = false;
  scannerInputValue: any;
  scannedDrums: any[] = [];
  enableRescanButton: boolean = false;
  enableProceed: boolean = false;
  gun1D1Value: any;
  gun1D2Value: any;
  gun2D1Value: any;
  gun2D2Value: any;
  poData!: PoData;
  machineId!: number;
  processId!: number;
  isIncorrectScannedMaterial: boolean = false;
  requiredGun1MaterialCode: any;
  requiredGun2MaterialCode: any;
  requiredGun1WireDiameter: any;
  requiredGun2WireDiameter: any;
  gun1Array: any[] = [];
  gun2Array: any[] = [];
  requiredMaterial: any;

  constructor(
    private router: Router,
    private metalSprayService: MetalSprayService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    const requiredGun1MaterialCode = localStorage.getItem(
      'REQUIRED_GUN1_MATERIAL_CODE'
    )!;
    if (JSON.parse(requiredGun1MaterialCode)) {
      this.requiredGun1MaterialCode = JSON.parse(requiredGun1MaterialCode);
    }
    const requiredGun2MaterialCode = localStorage.getItem(
      'REQUIRED_GUN2_MATERIAL_CODE'
    )!;
    if (JSON.parse(requiredGun2MaterialCode)) {
      this.requiredGun2MaterialCode = JSON.parse(requiredGun2MaterialCode);
    }
    const requiredGun1WireDiameter = localStorage.getItem(
      'REQUIRED_GUN1_WIRE_DIAMETER'
    )!;
    if (JSON.parse(requiredGun1WireDiameter)) {
      this.requiredGun1WireDiameter = JSON.parse(requiredGun1WireDiameter);
    }
    const requiredGun2WireDiameter = localStorage.getItem(
      'REQUIRED_GUN2_WIRE_DIAMETER'
    )!;
    if (JSON.parse(requiredGun2WireDiameter)) {
      this.requiredGun2WireDiameter = JSON.parse(requiredGun2WireDiameter);
    }
    const requiredMaterial = localStorage.getItem('REQUIRED_MATERIAL')!;
    if (JSON.parse(requiredMaterial)) {
      this.requiredMaterial = JSON.parse(requiredMaterial);
    }
  }

  startScnning() {
    this.isScanEnabled = true;
  }

  scannedGunDrums(data: any) {
    this.isIncorrectScannedMaterial = false;
    this.isScanEnabled = false;
    this.enableRescanButton = true;

    const scannedDrum = data.split('x');
    let isValidMatrial = false;
    if (
      this.requiredGun1MaterialCode === scannedDrum[0] ||
      this.requiredGun2MaterialCode === scannedDrum[0]
    ) {
      isValidMatrial = true;
    }

    const currentDate = new Date().getTime();
    let scannedDate = scannedDrum[1].split('-');

    const date = new Date(scannedDate[2], scannedDate[1] - 1, scannedDate[0]);

    let validDate = false;
    if (currentDate != null && currentDate <= date.getTime()) {
      validDate = true;
    }

    if (isValidMatrial && validDate) {
      this.scannerInputValue = scannedDrum[0];
    } else {
      this.isIncorrectScannedMaterial = true;
    }
  }

  cancelScanForGunDrums() {
    this.isScanEnabled = false;
    this.enableRescanButton = true;
  }

  gun1D1Selected() {
    this.gun1D1Value = this.scannerInputValue;
    if (this.gun1D1Value != '' && this.gun1D1Value != null) {
      this.checkGun1Object(this.gun1D1Value);
      this.scannerInputValue = null;
      this.enableRescanButton = false;
      this.checkAllDrumFilled();
    }
  }

  gun1D2Selected() {
    this.gun1D2Value = this.scannerInputValue;
    if (this.gun1D2Value != '' && this.gun1D2Value != null) {
      this.checkGun1Object(this.gun1D2Value);
      this.scannerInputValue = null;
      this.enableRescanButton = false;
      this.checkAllDrumFilled();
    }
  }

  checkGun1Object(gun1Value: any) {
    if (this.gun1Array.length <= 1) {
      this.gun1Array.push({
        spray_material_code: gun1Value,
        location: 'G1',
      });
    }
  }

  gun2D1Selected() {
    this.gun2D1Value = this.scannerInputValue;
    if (this.gun2D1Value != '' && this.gun2D1Value != null) {
      this.checkGun2Object(this.gun2D1Value);
      this.scannerInputValue = null;
      this.enableRescanButton = false;
      this.checkAllDrumFilled();
    }
  }

  gun2D2Selected() {
    this.gun2D2Value = this.scannerInputValue;
    if (this.gun2D2Value != '' && this.gun2D2Value != null) {
      this.checkGun2Object(this.gun2D2Value);
      this.scannerInputValue = null;
      this.enableRescanButton = false;
      this.checkAllDrumFilled();
    }
  }
  checkGun2Object(gun2Value: any) {
    if (this.gun2Array.length <= 1) {
      this.gun2Array.push({
        spray_material_code: gun2Value,
        location: 'G2',
      });
    }
  }

  checkAllDrumFilled() {
    if (this.gun2Array.length == 2 && this.gun1Array.length == 2) {
      this.enableProceed = true;
    } else {
      this.enableProceed = false;
    }
  }

  proceed() {
    this.insertSprayDrums();
  }

  insertSprayDrums() {
    const scannedDrumsArray = [this.gun1Array[0], this.gun2Array[0]];

    let scannedDrumsCodes = scannedDrumsArray.map((drumCode: any) => {
      const mat = this.requiredMaterial.find((material: any) => {
        return drumCode.required_material_code == material.spray_material_code;
      });

      return {
        ...drumCode,
        material_id: mat.required_material_id,
      };
    });

    const reqArraay = {
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      spray_gun: scannedDrumsCodes,
    };

    this.metalSprayService.addRequiredMaterial(reqArraay).subscribe({
      next: (res: any) => {
        this.router.navigate(['op/ms/material-check']);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }
}
