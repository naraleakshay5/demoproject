import { WebsocketService } from 'src/app/websocket.service';
import { SharedService } from './../../Shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { poData } from '../tempering-model';
import { AppStorage } from 'src/app/storage.service';
import { TemperingService } from '../tempering.service';

@Component({
  selector: 'app-tem-operation',
  templateUrl: './tem-operation.component.html',
  styleUrls: ['./tem-operation.component.scss'],
})
export class TemOperationComponent implements OnInit {
  processStarted: boolean = false;
  progress: number = 0;
  poData!: poData;
  machineId!: number;
  processId!: number;
  totalTime: any;
  startTime: any;
  interval!: number;
  loadedRecipe: any;
  loadrecipeMain: any;
  temperingStarted!: boolean;
  //from machine
  temperingCoolingTimeInHrs!: number;
  temperingCoolingTimeInMins!: number;
  temperingHeatingingTimeHrs!: number;
  temperingHeatingTimeInMins!: number;
  //From recipe
  loadedRecipeCoolingHrs!: number;
  loadedRecipeCoolingMins!: number;
  loadedRecipeHeatingHrs!: number;
  loadedRecipeHeatingMins!: number;
  temperatureZone1: number = 0;
  temperatureZone2: number = 0;
  batchInTime!: Date;
  batchOutTime!: Date;
  etc!: any;
  po_ids: any[] = [];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private wsServcie: WebsocketService,
    private appStorage: AppStorage,
    private temperingService: TemperingService
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.po_ids = this.appStorage.get('PO_IDS');

    const loadedRecipe = localStorage.getItem('RECIPE_LOADED_FOR_PO')!;
    if (JSON.parse(loadedRecipe)) {
      this.loadedRecipe = JSON.parse(loadedRecipe);

      //TODO change all filter to find
      const loadedRecipeCoolingHrs = this.loadedRecipe.find(
        (ele: any) => ele.display_name == ' Set Cooling Time Hr'
      );
      this.loadedRecipeCoolingHrs = loadedRecipeCoolingHrs.value * 60;

      const loadedRecipeCoolingMins = this.loadedRecipe.find(
        (ele: any) => ele.display_name == ' Set Cooling Time Min'
      );
      this.loadedRecipeCoolingMins = loadedRecipeCoolingMins.value;

      const loadedRecipeHeatingHrs = this.loadedRecipe.find(
        (ele: any) => ele.display_name == ' Set Heating Time Hr'
      );
      this.loadedRecipeHeatingHrs = loadedRecipeHeatingHrs.value * 60;

      const loadedRecipeHeatingMins = this.loadedRecipe.find(
        (ele: any) => ele.display_name == ' Set Heating Time Min'
      );
      this.loadedRecipeHeatingMins = loadedRecipeHeatingMins.value;
    }

    this.wsServcie.machineSummary.subscribe((resp: any) => {
      const temperingCoolingTimeInHrs = resp.filter(
        (ele: any) => ele.name === 'cooling_time_actual_hrs'
      )[0].value;

      this.temperingCoolingTimeInHrs = temperingCoolingTimeInHrs * 60;

      this.temperingCoolingTimeInMins = resp.find(
        (ele: any) => ele.name === 'cooling_time_actual_min'
      ).value;

      const temperingHeatingingTimeHrs = resp.find(
        (ele: any) => ele.name === 'heating_time_actual_hrs'
      ).value;

      this.temperingHeatingingTimeHrs = temperingHeatingingTimeHrs * 60;

      this.temperingHeatingTimeInMins = resp.find(
        (ele: any) => ele.name === 'heating_time_actual_min'
      ).value;

      this.temperatureZone1 = resp.find(
        (ele: any) => ele.name === 'zone_1_actual_temperature'
      ).value;

      this.temperatureZone2 = resp.find(
        (ele: any) => ele.name === 'zone_2_actual_temperature'
      ).value;
    });

    // kept for testing will remove later
    // this.interval = setInterval(() => {
    //   this.callInterval();
    // }, 5000);
  }

  callInterval() {
    const numerator: number =
      this.temperingHeatingingTimeHrs +
      this.temperingHeatingTimeInMins +
      this.temperingCoolingTimeInHrs +
      this.temperingCoolingTimeInMins;

    const denominator: number =
      this.loadedRecipeCoolingHrs +
      this.loadedRecipeCoolingMins +
      this.loadedRecipeHeatingHrs +
      this.loadedRecipeHeatingMins;

    const progress = numerator / denominator;
    this.progress = Math.round(progress * 100);

    if (progress >= 100) {
      this.ngOnDestroy();
    }
  }

  setTheProcess() {
    this.interval = setInterval(() => {
      this.callInterval();
    }, 5000);
  }

  startTheProcess() {
    this.processStarted = true;
    const currentTime = new Date();

    const totalTime =
      this.loadedRecipeCoolingHrs +
      this.loadedRecipeCoolingMins +
      this.loadedRecipeHeatingHrs +
      this.loadedRecipeHeatingMins;
    const batchTime = currentTime.getTime();
    const batchOutTime = batchTime + totalTime * 60 * 1000;
    this.batchOutTime = new Date(batchOutTime);

    this.batchInTime = currentTime;

    this.appStorage.set('TEPERING_STARTED', 'true');
    // this.callInterval();
    this.setTheProcess();
  }

  replaceOutputCarrier() {
    this.router.navigate(['op/as/output-metal-trays']);
  }

  checkOutProcess() {
    // this.sharedService.sentClickEventpoStageCompleted('operations');
    // this.po_ids.forEach((ele: any) => {
    //   this.temperingService.sentClickEventpoStageCompleted(
    //     'operations',
    //     ele.production_order_id
    //   );
    // });
    this.router.navigate(['op/tmp/scrap-booking']);
  }

  incrementTheProgress() {
    this.progress += 10;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
