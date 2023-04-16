import { Router } from '@angular/router';
import { SharedService } from './../Shared/shared.service';
import { PoData } from '../Shared/shared-model';
import { MaskingService } from './masking.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-masking',
  templateUrl: './masking.component.html',
  styleUrls: ['./masking.component.scss'],
})
export class MaskingComponent implements OnInit {
  poData!: PoData;
  machineId!: number;
  processId!: number;
  po!: string;
  sach!: string;

  clickEventsubscription!: Subscription;
  poStages: any;
  inProcesspoStage: any;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private maskingService: MaskingService,
    private wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);

    this.po = this.poData?.po;
    this.sach = this.poData?.sach;
    this.poStage();

    this.clickEventsubscription = this.sharedService
      .getClickEventpoStageCompleted()
      .subscribe((currentStageSlug: any) => {
        const inProcesspoStage = this.poStages.some(
          (ele: any) =>
            ele.url_slug === currentStageSlug &&
            ele.stage_status === 'in_process'
        );

        if (inProcesspoStage) {
          this.postPostage();
        }
      });

    this.wsService.sendNode(
      this.maskingService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
      true
    );

    this.wsService.sendNode(
      this.maskingService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
      false
    );
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

  poStage() {
    this.sharedService
      .poStage(this.processId, this.poData?.po_id)
      .subscribe((res: any) => {
        this.poStages = res.data;

        this.inProcesspoStage = this.poStages.filter(
          (ele: any) => ele.stage_status === 'in_process'
        );
        this.router.navigate(['op/ma/' + this.inProcesspoStage[0]?.url_slug]);
      });
  }

  ngOnDestroy() {
    this.clickEventsubscription.unsubscribe();
  }
}
