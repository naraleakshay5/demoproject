import { RfidService } from './../../../../rfid.service';
import { Subscription } from 'rxjs';
import { MetalSprayService } from './../metal-spray.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoData } from '../../Shared/shared-model';
import { Recipe } from '../metal-spray-model';

@Component({
  selector: 'app-ms-wheel-operation',
  templateUrl: './ms-wheel-operation.component.html',
  styleUrls: ['./ms-wheel-operation.component.scss'],
})
export class MsWheelOperationComponent implements OnInit {
  wheelInput: any;
  enableProceed: boolean = false;
  disableWheelInput: boolean = false;
  poData!: PoData;
  machineId!: number;
  enableTurnOverWheel: boolean = false;
  wheelDetails: any;
  showWheel: boolean = false;
  showWheelDetails: boolean = false;
  wheelDetailsCount!: number;
  enableUnloadAndProceed: boolean = false;
  wheelMessage!: string;
  afterINdexingGun2Details: any;
  rfId!: Subscription;
  allowedWheelDetails: any[] = [];
  scannedWheel: any[] = [];
  isAlreadyWheelScanned: boolean = false;
  newlyAddedWheelId!: number;
  is_btnDisabled: boolean = false;

  isScanEnabled: boolean = false;
  isWrongWheelScanned: boolean = true;
  isStartNewPo!: boolean;
  gun1Recipe: Recipe[] = [];
  gun2Recipe: Recipe[] = [];
  error: string | null = null;
  wheelFound: boolean = false;
  static firstEpc = 0;
  allowedWheelDetailsForNewPo: any[] = [];
  scannedWheelForNewPO: any[] = [];
  processId!: number;

  constructor(
    private router: Router,
    private metalSprayService: MetalSprayService,
    private rfIdService: RfidService
  ) {}

  ngOnInit(): void {
    this.showWheelDetails = false;
    this.enableUnloadAndProceed = false;
    this.enableTurnOverWheel = false;

    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    const machineData = JSON.parse(localStorage.getItem('MACHINE') || '{}');
    if (machineData?.id) {
      this.machineId = machineData?.id;
    } else {
      const machineId = localStorage.getItem('MACHINE_ID')!;
      this.machineId = JSON.parse(machineId);
    }

    const gun2Details = localStorage.getItem('GUN_2_DETAILS')!;
    this.afterINdexingGun2Details = JSON.parse(gun2Details);

    const totalWheelDetails = localStorage.getItem('TOTAL_WHEEL_DETAILS')!;
    if (JSON.parse(totalWheelDetails)) {
      this.allowedWheelDetails = JSON.parse(totalWheelDetails);
    }

    const totalWheelDetailsForNewPo = localStorage.getItem(
      'TOTAL_WHEEL_DETAILS_FOR_NEW_PO'
    )!;
    if (JSON.parse(totalWheelDetailsForNewPo)) {
      this.allowedWheelDetailsForNewPo = JSON.parse(totalWheelDetailsForNewPo);
    }

    const scannedWheels = localStorage.getItem('SCANNED_WHEEL_DETAILS')!;
    if (JSON.parse(scannedWheels) && scannedWheels.length) {
      this.scannedWheel = JSON.parse(scannedWheels);
    }

    const scannedWheelsForNewPo = localStorage.getItem(
      'SCANNED_WHEEL_DETAILS_FOR_NEW_PO'
    )!;
    if (JSON.parse(scannedWheelsForNewPo) && scannedWheelsForNewPo.length) {
      this.scannedWheelForNewPO = JSON.parse(scannedWheelsForNewPo);
    }

    const isStartNewPo = localStorage.getItem('IS_START_NEW_PO')!;
    if (JSON.parse(isStartNewPo)) {
      this.isStartNewPo = JSON.parse(isStartNewPo);
    }

    this.rfId = this.rfIdService.tags.subscribe((wEpc: any) => {
      if (wEpc && wEpc.length && !this.wheelFound) {
        this.wheelFound = true;
        this.validateScannedWheel(wEpc);
      }
    });

    this.checkForLoadingZone();
  }

  validateScannedWheel(formatted: any) {
    const uniqueEpc = [...new Set(formatted.map((epc: any) => epc.EPC))];

    this.metalSprayService
      .getPoIdByEpc(this.processId, uniqueEpc[0])
      .subscribe((resp: any) => {
        let allpo = localStorage.getItem('ALL_PO_DATA_DETAILS')!;
        const allPoDetails = JSON.parse(allpo);

        //************/
        //kept for refactoring  localStorage for future

        // let index = allPoDetails.findIndex(
        //   (po: any) => po[1][0].poData?.po_id === resp.data[0].po_id
        // );

        //***************************//

        const isPesentInPreviousPo = this.allowedWheelDetails.some(
          (wObj: any) => wObj.poData?.po_id === resp.data[0].po_id
        );

        if (isPesentInPreviousPo) {
          let newWheel: any = null;

          const isValid = uniqueEpc.some((wEpc: any) => {
            const isAllowed = this.allowedWheelDetails.some(
              (wObj: any) => wObj.rfid_epc === wEpc
            );

            const isScanned = this.scannedWheel.some(
              (wObj: any) => wObj.rfid_epc === wEpc
            );

            if (isAllowed && !isScanned) {
              newWheel = this.allowedWheelDetails.find(
                (w: any) => w.rfid_epc === wEpc
              );
            }

            return isAllowed && !isScanned;
          });

          if (!isValid) {
            this.error = 'Wheel not valid or already scanned !';
            return;
          }

          localStorage.setItem(
            'SCANNED_WHEEL_DETAILS',
            JSON.stringify([...this.scannedWheel, newWheel])
          );

          this.metalSprayService
            .mountWheel(
              this.machineId,
              newWheel.poData?.sach_id,
              newWheel.poData?.po_id,
              newWheel?.id
            )
            .subscribe((resp: any) => {
              localStorage.setItem('RECIPE', JSON.stringify(resp.data));
              this.setRecipeParameters(resp.data, newWheel.poData);

              this.router.navigate(['/op/ms/recipe-setup']);

              this.wheelFound = false;
            });
        } else {
          let newWheel: any = null;

          const isValid = uniqueEpc.some((wEpc: any) => {
            const isAllowed = this.allowedWheelDetailsForNewPo.some(
              (wObj: any) => wObj.rfid_epc === wEpc
            );

            const isScanned = this.scannedWheelForNewPO.some(
              (wObj: any) => wObj.rfid_epc === wEpc
            );

            if (isAllowed && !isScanned) {
              newWheel = this.allowedWheelDetailsForNewPo.find(
                (w: any) => w.rfid_epc === wEpc
              );
            }

            return isAllowed && !isScanned;
          });

          if (!isValid) {
            this.error = 'Wheel not valid or already scanned !';
            return;
          }

          localStorage.setItem(
            'SCANNED_WHEEL_DETAILS_FOR_NEW_PO',
            JSON.stringify([...this.scannedWheelForNewPO, newWheel])
          );

          this.metalSprayService
            .mountWheel(
              this.machineId,
              newWheel.poData?.sach_id,
              newWheel.poData?.po_id,
              newWheel?.id
            )
            .subscribe((resp: any) => {
              localStorage.setItem('RECIPE', JSON.stringify(resp.data));
              this.setRecipeParameters(resp.data, newWheel.poData);

              if (this.isStartNewPo === true) {
                localStorage.removeItem('IS_START_NEW_PO');
              }

              this.router.navigate(['/op/ms/recipe-setup']);

              this.wheelFound = false;
            });
        }
      });
  }

  checkForLoadingZone() {
    if (this.isStartNewPo === true) {
      this.showWheelDetails = false;
      return;
    }

    if (
      this.afterINdexingGun2Details &&
      this.afterINdexingGun2Details != null
    ) {
      if (this.afterINdexingGun2Details?.wheelDetailCount === 1) {
        this.showWheelDet(this.afterINdexingGun2Details?.wheelId);
      } else if (this.afterINdexingGun2Details?.wheelDetailCount === 2) {
        this.showCompletedWheelDetail(this.afterINdexingGun2Details?.wheelId);
      }
    } else {
      this.showWheelDetails = false;
    }
  }

  checkWheelTurnOver(check: any) {
    this.enableProceed = check.target.checked;
  }

  proceed() {
    this.showWheelDetails = false;
  }

  unloadWheelAndMoveItToNext() {
    this.showWheelDetails = false;
  }

  setRecipeParameters(recipe: any, poData: PoData) {
    this.gun1Recipe = this.metalSprayService.setGun1Recipe(recipe, poData);

    this.gun2Recipe = this.metalSprayService.setGun2Recipe(recipe, poData);

    localStorage.setItem('GUN1_RECIPE', JSON.stringify(this.gun1Recipe));
    localStorage.setItem('GUN2_RECIPE', JSON.stringify(this.gun2Recipe));
  }

  showWheelDet(wheelId: number) {
    this.metalSprayService.showWheelDetails(wheelId).subscribe((resp: any) => {
      this.wheelDetails = resp.data[0];
      this.showWheelDetails = true;
      this.enableTurnOverWheel = true;
    });
  }

  showCompletedWheelDetail(wheelId: number) {
    this.metalSprayService.showWheelDetails(wheelId).subscribe((resp: any) => {
      this.wheelDetails = resp.data[0];
      this.showWheelDetails = true;
      this.enableUnloadAndProceed = true;
      this.router.navigate(['/op/ms/process-quality-check']);
    });
  }

  resetVariables() {
    this.wheelFound = false;
    this.error = null;
    MsWheelOperationComponent.firstEpc = 0;
  }

  ngOnDestroy() {
    this.rfId.unsubscribe();
  }
}
