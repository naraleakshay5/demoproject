import { TemperingService } from './tempering.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/websocket.service';
import { SharedService } from '../Shared/shared.service';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../Shared/shared-model';

@Component({
  selector: 'app-tempering',
  templateUrl: './tempering.component.html',
  styleUrls: ['./tempering.component.scss'],
})
export class TemperingComponent implements OnInit {
  poData!: PO_DATA;
  machineId!: number;
  processId!: number;
  clickEventsubscription!: Subscription;
  inProcesspoStage: any;
  poStages: any;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private sharedService: SharedService,
    private temperingService: TemperingService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.poStage();

    this.clickEventsubscription = this.temperingService
      .getClickEventpoStageCompleted()
      .subscribe((po_stage: any) => {
        const inProcesspoStage = this.poStages.some(
          (ele: any) =>
            ele.url_slug === po_stage.stage_url &&
            ele.stage_status === 'in_process'
        );
        if (inProcesspoStage) {
          this.postPostage(po_stage.po_id);
        }
      });

    this.wsService.sendNode(
      this.temperingService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
      true
    );

    this.wsService.sendNode(
      this.temperingService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
      false
    );
  }

  poStage() {
    this.sharedService
      .poStage(this.processId, this.poData?.po_id)
      .subscribe((res: any) => {
        this.poStages = res.data;
        this.inProcesspoStage = this.poStages.filter(
          (ele: any) => ele.stage_status === 'in_process'
        );

        this.router.navigate(['op/tmp/' + this.inProcesspoStage[0]?.url_slug]);
      });
  }

  postPostage(po_id: number) {
    this.inProcesspoStage = this.poStages.filter(
      (ele: any) => ele.stage_status === 'in_process'
    );
    const stageId = this.inProcesspoStage[0]?.stage_id;
    this.sharedService.postPoStage(po_id, stageId).subscribe({
      next: (res: any) => {
        if (this.poData.po_id == po_id) {
          this.inProcessStage();
        }
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
