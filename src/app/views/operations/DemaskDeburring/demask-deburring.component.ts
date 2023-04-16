import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from './../Shared/shared-model';
import { DemaskDeburringService } from './demask-deburring.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/websocket.service';
import { SharedService } from '../Shared/shared.service';

@Component({
  selector: 'app-demask-deburring',
  templateUrl: './demask-deburring.component.html',
  styleUrls: ['./demask-deburring.component.scss'],
})
export class DemaskDeburringComponent implements OnInit {
  poData!: PO_DATA;
  machineId!: number;
  processId!: number;
  clickEventsubscription!: Subscription;
  inProcesspoStage: any;
  poStages: any;

  constructor(
    private router: Router,
    private demaskDeburService: DemaskDeburringService,
    private wsService: WebsocketService,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');

    this.poStage();

    this.clickEventsubscription = this.sharedService
      .getClickEventpoStageCompleted()
      .subscribe({
        next: (currentStageSlug: any) => {
          const inProcesspoStage = this.poStages.some(
            (ele: any) =>
              ele.url_slug === currentStageSlug &&
              ele.stage_status === 'in_process'
          );
          if (inProcesspoStage) {
            this.postPostage();
          }
        },
        error: (error) => {
          console.info(error);
        },
      });

    this.wsService.sendNode(
      this.demaskDeburService.machineInterlocks
        .BATCH_PRODUCTION_START_ON_MACHINE,
      true
    );

    this.wsService.sendNode(
      this.demaskDeburService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
      false
    );
  }

  poStage() {
    this.processId = this.appStorage.get('PROCESS_ID');

    this.sharedService.poStage(this.processId, this.poData?.po_id).subscribe({
      next: (res: any) => {
        this.poStages = res.data;
        this.inProcesspoStage = this.poStages.filter(
          (ele: any) => ele.stage_status === 'in_process'
        );

        this.router.navigate(['op/dd/' + this.inProcesspoStage[0]?.url_slug]);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  postPostage() {
    this.inProcesspoStage = this.poStages.filter(
      (ele: any) => ele.stage_status === 'in_process'
    );
    const stageId = this.inProcesspoStage[0]?.stage_id;
    this.sharedService.postPoStage(this.poData?.po_id, stageId).subscribe({
      next: (res: any) => {
        this.inProcessStage();
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  inProcessStage() {
    let index = -1;
    this.poStages = this.poStages?.map((ele: any, i: number) => {
      if (ele.stage_status === 'in_process') {
        ele.is_completed = true;
        ele.stage_status = 'completed';
        index = i;
      } else if (index !== -1 && i === index + 1) {
        ele.stage_status = 'in_process';
        ele.in_process = true;
        index = -1;
      }
      return ele;
    });
  }

  ngOnDestroy() {
    this.clickEventsubscription.unsubscribe();
  }
}
