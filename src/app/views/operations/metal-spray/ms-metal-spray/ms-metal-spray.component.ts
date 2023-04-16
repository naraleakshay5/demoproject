import { MetalSprayComponent } from './../metal-spray.component';
import { Subscription } from 'rxjs';
import { MetalSprayService } from './../metal-spray.service';
import { WebsocketService } from 'src/app/websocket.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoData } from '../../Shared/shared-model';
import { Recipe } from '../metal-spray-model';

@Component({
  selector: 'app-ms-metal-spray',
  templateUrl: './ms-metal-spray.component.html',
  styleUrls: ['./ms-metal-spray.component.scss'],
})
export class MsMetalSprayComponent implements OnInit {
  processStarted: boolean = false;
  indexingComplete: boolean = false;
  poData!: PoData;
  machineId!: number;
  gun1Details: any;
  gun2Details: any;
  sprayCycleG1Total!: any;
  sprayCycleG1Current!: any;
  sprayCycleG2Current!: any;
  sprayCycleG2Total!: any;
  loadWheelDetails: any;
  isload: boolean = false;
  wheelDetailsCount!: number;
  wheelMessage!: string;
  interval: any;
  gun2Recipe: Recipe[] = [];
  gun1Recipe: Recipe[] = [];
  recipeParameters: Recipe[] = [];
  loadrecipes: Recipe[] = [];
  machineSummarySub!: Subscription;
  startNewPo: boolean = false;
  previousPoData!: PoData;
  callOnInitSub!: Subscription;

  constructor(
    private router: Router,
    private metalSprayService: MetalSprayService,
    private wsServcie: WebsocketService,
    private metalSprayComponent: MetalSprayComponent
  ) {}

  ngOnInit(): void {
    this.prepareData();
    this.getAllGunStatus();
    this.watchMachineTags();
  }

  prepareData() {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);

    const previousPoData = localStorage.getItem('PREVIOUS_PO_DATA')!;
    this.poData = JSON.parse(previousPoData);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    const gun1Details = localStorage.getItem('GUN_1_DETAILS')!;
    if (JSON.parse(gun1Details)) {
      this.gun1Details = JSON.parse(gun1Details);
    }
    const gun2Details = localStorage.getItem('GUN_2_DETAILS')!;
    if (JSON.parse(gun2Details)) {
      this.gun2Details = JSON.parse(gun2Details);
    }
    const loadWheelDetails = localStorage.getItem('LOAD_WHEEL_DETAILS')!;

    if (JSON.parse(loadWheelDetails)) {
      this.loadWheelDetails = JSON.parse(loadWheelDetails);
    }

    const gun1Recipe = localStorage.getItem('GUN1_RECIPE')!;
    if (JSON.parse(gun1Recipe)) {
      this.gun1Recipe = JSON.parse(gun1Recipe);
    }
    const gun2Recipe = localStorage.getItem('GUN2_RECIPE')!;
    if (JSON.parse(gun2Recipe)) {
      this.gun2Recipe = JSON.parse(gun2Recipe);
    }

    this.callOnInitSub = this.metalSprayComponent.callOnInit.subscribe(
      (resp: boolean) => {
        if (resp === true) {
          this.metalSprayService.doubleRender = 1;
          this.prepareData();
          this.getAllGunStatus();
          this.watchMachineTags();
        }
      }
    );
  }

  watchMachineTags() {
    this.machineSummarySub = this.wsServcie.machineSummary.subscribe(
      (resp: any) => {
        resp.forEach((tag: any) => {
          switch (tag.name) {
            case 'spray_cycle_g1_total':
              this.sprayCycleG1Total = tag;
              break;
            case 'spray_cycle_g1_current':
              this.sprayCycleG1Current = tag;
              break;
            case 'spray_cycle_g2_total':
              this.sprayCycleG2Total = tag;
              break;
            case 'spray_cycle_g2_current':
              this.sprayCycleG2Current = tag;
              break;
          }
        });
      }
    );
  }

  getAllGunStatus() {
    this.metalSprayService
      .getGunWheels(this.machineId)
      .subscribe((resp: any) => {
        this.gun1Details = resp.data.find((ele: any) => ele.loaded_on === 'g1');

        this.gun2Details = resp.data.find((ele: any) => ele.loaded_on === 'g2');

        this.loadWheelDetails = resp.data.find(
          (ele: any) => ele.loaded_on === 'la'
        );

        if (!!this.gun1Details) {
          let poDetails = localStorage.getItem('PO_DATA')!;
          let poData: PoData = JSON.parse(poDetails);
          let previousPoDetails = localStorage.getItem('PREVIOUS_PO_DATA')!;
          let previousPoData = JSON.parse(previousPoDetails);

          let poDataForGun1Details = null;

          if (this.gun1Details.po_id === poData?.po_id) {
            poDataForGun1Details = poData;
          } else {
            poDataForGun1Details = previousPoData;
          }

          localStorage.setItem(
            'GUN_1_DETAILS',
            JSON.stringify({
              loadedOn: this.gun1Details.loaded_on,
              wheelId: this.gun1Details.wheel_id,
              wheelName: this.gun1Details.wheel_name,
              face: this.gun1Details.face,
              recipe: this.gun1Details.recipe,
              poData: poDataForGun1Details,
            })
          );

          this.gun2Recipe = this.metalSprayService.setGun2Recipe(
            this.gun1Details.recipe,
            poDataForGun1Details
          );
          localStorage.setItem('GUN2_RECIPE', JSON.stringify(this.gun2Recipe));
        } else {
          localStorage.setItem('GUN_1_DETAILS', 'null');
        }

        if (!!this.loadWheelDetails) {
          let poDetails = localStorage.getItem('PO_DATA')!;
          const poData: PoData = JSON.parse(poDetails);
          let previousPoDetails = localStorage.getItem('PREVIOUS_PO_DATA')!;
          const previousPoData = JSON.parse(previousPoDetails);

          let poDataForLoadWheelDetails = null;

          if (this.loadWheelDetails.po_id == poData?.po_id) {
            poDataForLoadWheelDetails = poData;
          } else {
            poDataForLoadWheelDetails = previousPoData;
          }

          localStorage.setItem(
            'LOAD_WHEEL_DETAILS',
            JSON.stringify({
              loadedOn: this.loadWheelDetails.loaded_on,
              wheelId: this.loadWheelDetails.wheel_id,
              wheelName: this.loadWheelDetails.wheel_name,
              face: this.loadWheelDetails.face,
              poData: poDataForLoadWheelDetails,
            })
          );
        } else {
          this.startNewPo = true;
          localStorage.setItem('LOAD_WHEEL_DETAILS', 'null');
        }

        if (!!this.gun2Details) {
          let poDetails = localStorage.getItem('PO_DATA')!;
          const poData: PoData = JSON.parse(poDetails);
          let previousPoDetails = localStorage.getItem('PREVIOUS_PO_DATA')!;
          const previousPoData = JSON.parse(previousPoDetails);

          let poDataForLoadWheelDetails: PoData | null = null;

          //kept for future use
          // this.metalSprayService
          //   .getWheelDetailsCount(this.machineId, this.gun2Details?.wheel_id)
          //   .subscribe((response: any) => {
          this.wheelDetailsCount = this.gun2Details.faceCount;
          // this.wheelMessage = response.message;

          if (this.gun2Details.po_id == poData?.po_id) {
            poDataForLoadWheelDetails = poData;
          } else {
            poDataForLoadWheelDetails = previousPoData;
          }
          localStorage.setItem(
            'GUN_2_DETAILS',
            JSON.stringify({
              loadedOn: this.gun2Details.loaded_on,
              wheelId: this.gun2Details.wheel_id,
              wheelName: this.gun2Details.wheel_name,
              face: this.gun2Details.face,
              poData: poDataForLoadWheelDetails,
              wheelDetailCount: this.wheelDetailsCount,
            })
          );
        } else {
          localStorage.setItem('GUN_2_DETAILS', 'null');
        }

        if (this.metalSprayService.doubleRender != 1) {
          this.metalSprayService.prepareAndLoadRecipe();
        }
      });
  }

  startNewPoFunc() {
    let po = localStorage.getItem('PO_DATA')!;
    const poData = JSON.parse(po);

    localStorage.setItem('PREVIOUS_PO_DATA', JSON.stringify(poData));

    let totalWheel = localStorage.getItem('TOTAL_WHEEL_DETAILS')!;
    const totalWheelDetails = JSON.parse(totalWheel);
    let scannedWheel = localStorage.getItem('TOTAL_WHEEL_DETAILS')!;
    const scannedWheelDetails = JSON.parse(scannedWheel);
    const indexingAfterNewPO = 0;
    localStorage.setItem('IS_START_NEW_PO', 'true');

    localStorage.setItem(
      'INDEXING_AFTER_NEW_PO',
      JSON.stringify(indexingAfterNewPO)
    );
    let allPo = localStorage.getItem('ALL_PO_DATA_DETAILS')!;
    let allPoDataDetails = JSON.parse(allPo);
    let poDataDetails = [this.poData, totalWheelDetails, scannedWheelDetails];
    localStorage.setItem(
      'ALL_PO_DATA_DETAILS',
      JSON.stringify(allPoDataDetails)
    );
    this.router.navigate(['po-list']);
  }

  startTheProcess() {
    this.processStarted = true;
    localStorage.setItem('METAL_SPRAY_STARTED', 'true');
  }

  loadWheel() {
    this.router.navigate(['/op/ms/wheel-operation']);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.machineSummarySub) {
      this.machineSummarySub.unsubscribe();
    }
    if (this.callOnInitSub) {
      this.callOnInitSub.unsubscribe();
    }
  }
}
export interface SprayCycle {
  name: string;
  value: number;
}

export class SetSprayCycle {
  name: string = '';
  value: number = 0;
}
