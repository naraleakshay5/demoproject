import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from './../../Shared/shared-model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RfidService } from 'src/app/rfid.service';

@Component({
  selector: 'app-dd-input-wheel-scan',
  templateUrl: './dd-input-wheel-scan.component.html',
  styleUrls: ['./dd-input-wheel-scan.component.scss'],
})
export class DdInputWheelScanComponent implements OnInit {
  wheelInput: any;
  poData!: PO_DATA;
  machineId!: number;
  processId!: number;
  recipeAlready: any;
  rfId!: Subscription;
  scannedWheel: any[] = [];
  isAlreadyBinScanned: boolean = false;
  allowedWheels: any[] = [];
  newAddedWheel: any;
  isWrongWheelScanned: boolean = false;

  isScanEnabled: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private rfIdService: RfidService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.scannedWheel = this.appStorage.get('INPUT_SCANNED_WHEEL');
    this.recipeAlready = this.appStorage.get('RECIPE_LOADED_FOR_PO');
    this.allowedWheels = this.appStorage.get('TOTAL_WHEEL_DETAILS');

    this.rfId = this.rfIdService.tags.subscribe((wEpc: any) => {
      if (wEpc && wEpc.length) {
        this.validateScannedWheel(wEpc);
      }
    });
  }

  validateScannedWheel(formatted: any) {
    const uniqueEpc = [...new Set(formatted.map((epc: any) => epc.EPC))];

    uniqueEpc.forEach((wEpc: any) => {
      const isAllowed = this.allowedWheels.some(
        (wObj: any) => wObj.rfid_epc === wEpc
      );

      const isScanned = this.scannedWheel.some(
        (wObj: any) => wObj.rfid_epc === wEpc
      );

      if (isAllowed && !isScanned) {
        this.newAddedWheel = this.allowedWheels.find(
          (w: any) => w.rfid_epc === wEpc
        );
        this.scannedWheel.push(this.newAddedWheel);
        this.appStorage.set('INPUT_SCANNED_WHEEL', this.scannedWheel);

        if (this.recipeAlready && this.recipeAlready != null) {
          this.router.navigate(['op/dd/operations']);
        } else {
          this.router.navigate(['op/dd/recipe-setup']);
        }
      } else {
        this.isWrongWheelScanned = true;
      }
    });
  }

  ngOnDestroy() {
    this.rfId.unsubscribe();
  }
}
