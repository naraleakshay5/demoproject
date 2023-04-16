import { Component, OnInit, OnDestroy } from '@angular/core';

import { navItems } from './_nav';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from '../../common.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/websocket.service';
import { WindingService } from 'src/app/views/operations/winding/winding.service';
import { environment } from 'src/environments/environment.demo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  public todayDate: string = new Date().toDateString();
  public todayTime: string = new Date().toLocaleTimeString();
  public icons = {
    home: faHouse,
  };

  machineRunningStatus: String = '';
  machineConnectionStatus: String = '';
  obsMachineRunningStatus!: Subscription;
  obsMachineConnectionStatus!: Subscription;
  isDpsBypass: boolean = false;
  isRecipeRemote: boolean = false;
  isMaintence: boolean = false;
  isDryRunMode: boolean = false;
  electrode: boolean = false;
  machineRunningTimeInHrs!: number;
  machineRunningTimeInMin!: number;
  isAlarm: boolean = false;
  environment: any;

  constructor(
    private wsService: WebsocketService,
    private windingService: WindingService
  ) {}

  ngOnInit() {
    this.environment = environment;
    this.obsMachineRunningStatus = this.wsService
      .getMachineRunningStatus()
      .subscribe({
        next: (value: String) => {
          this.machineRunningStatus = value;
        },
      });

    this.obsMachineConnectionStatus = this.wsService
      .getMachineConnectionStatus()
      .subscribe({
        next: (value: String) => {
          this.machineConnectionStatus = value;
        },
      });

    this.wsService.machineSummary.subscribe((res: any) => {
      this.isDpsBypass = res.some(
        (ele: any) => ele.name === 'dps_bypass' && ele.value === true
      );

      this.isRecipeRemote = res.some(
        (ele: any) => ele.name === 'recipe_remote' && ele.value === true
      );

      this.isMaintence = res.some(
        (ele: any) =>
          ele.name === 'machine_stop_for_scheduled_breakdown' &&
          ele.value === true
      );

      this.isDryRunMode = res.some(
        (ele: any) => ele.name === 'dps_dry_run_mode' && ele.value === true
      );
    });

    this.wsService.machineRunningTimeInHrs.subscribe({
      next: (value: number) => {
        // this.machineRunningTimeInHrs = value;
        // this.electrode = false;
        // if (this.machineRunningTimeInHrs == 4) {
        //   this.electrode = true;
        // }
        this.wsService.machineRunningTimeInMin.subscribe({
          next: (value: number) => {
            this.machineRunningTimeInMin = value;
            this.electrode = false;
            if (
              this.machineRunningTimeInMin == 0 &&
              (this.machineRunningTimeInHrs == 4 ||
                this.machineRunningTimeInHrs == 0)
            ) {
              this.electrode = true;
            }
          },
        });
      },
    });
  }

  dpsControls(value: boolean) {
    this.wsService.sendNode(
      this.windingService.machineInterlocks.DPS_BYPASS,
      value
    );
  }

  recipeRemote(value: boolean) {
    this.wsService.sendNode(
      this.windingService.machineInterlocks.RECIPE_REMOTE,
      value
    );
  }

  maintence(value: boolean) {
    this.wsService.sendNode(
      this.windingService.machineInterlocks
        .MACHINE_STOPPED_DUE_TO_SCHEDULED_BREAKDOWN,
      value
    );
  }

  dpsDryRunMode(value: boolean) {
    this.wsService.sendNode(
      this.windingService.machineInterlocks.DPS_DRY_RUN_MODE,
      value
    );
  }

  ngOnDestroy() {
    this.obsMachineConnectionStatus.unsubscribe();
    this.obsMachineRunningStatus.unsubscribe();
  }

  openAlarms() {
    this.isAlarm = true;
  }

  closeAlarms() {
    this.isAlarm = false;
  }
}
