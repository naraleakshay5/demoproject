import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../Shared/shared-model';
import { SharedService } from '../Shared/shared.service';
import { poData } from './assembly-model';
import { AssemblyService } from './assembly.service';

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.component.html',
  styleUrls: ['./assembly.component.scss'],
})
export class AssemblyComponent implements OnInit {
  wicPoData!: PO_DATA;
  clickEventsubscription!: Subscription;
  machineId!: number;
  po!: string;
  sach!: string;
  processId!: number;
  current_po!: number;
  poStages: any;
  inProcesspoStage: any;

  constructor(
    private wsService: WebsocketService,
    private assemblyService: AssemblyService,
    private sharedService: SharedService,
    private appStorage: AppStorage,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.current_po = this.appStorage.get('CURRENT_PO_ID');
    this.wicPoData = this.appStorage.get('WIC_PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.poStage();

    this.clickEventsubscription = this.assemblyService
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
      this.assemblyService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
      true
    );

    this.wsService.sendNode(
      this.assemblyService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
      false
    );
    this.getSpcSchedule();
  }

  poStage() {
    this.sharedService
      .poStage(this.processId, this.current_po)
      .subscribe((res: any) => {
        this.poStages = res.data;
        this.inProcesspoStage = this.poStages.filter(
          (ele: any) => ele.stage_status === 'in_process'
        );
        this.router.navigate(['op/as/' + this.inProcesspoStage[0]?.url_slug]);
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

  postPostage(po_id: number) {
    this.inProcesspoStage = this.poStages.filter(
      (ele: any) => ele.stage_status === 'in_process'
    );
    const stageId = this.inProcesspoStage[0]?.stage_id;
    this.sharedService.postPoStage(po_id, stageId).subscribe({
      next: (res: any) => {
        this.inProcessStage();
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  getSpcSchedule() {
    this.sharedService
      .getSpcSchedule(this.processId, this.wicPoData?.po_id)
      .subscribe((res: any) => {
        localStorage.setItem('TEM_SPC_SCHEDULE', JSON.stringify(res.data));
      });
  }

  ngOnDestroy() {
    this.clickEventsubscription.unsubscribe();
  }
}
