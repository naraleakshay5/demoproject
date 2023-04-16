import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../Shared/shared-model';
import { SharedService } from '../Shared/shared.service';
import { HotPressService } from './hot-press.service';

@Component({
  selector: 'app-hot-press',
  templateUrl: './hot-press.component.html',
  styleUrls: ['./hot-press.component.scss'],
})
export class HotPressComponent implements OnInit {
  clickEventsubscription!: Subscription;
  machineId!: number;
  poData!: PO_DATA;
  po!: string;
  sach!: string;
  processId!: number;
  user!: any;
  poStages: any;
  inProcesspoStage: any;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private wsService: WebsocketService,
    private hotPressService: HotPressService,
    private appStorage: AppStorage
  ) {}

  ngOnInit() {
    this.user = this.appStorage.get('USER_DATA');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.poStage();

    this.clickEventsubscription = this.sharedService
      .getClickEventpoStageCompleted()
      .subscribe((currentUrl_slug: any) => {
        this.appStorage.set('TEM_LAST_URL', currentUrl_slug);

        // const inProcesspoStage = this.poStages.some(
        //   (ele: any) =>
        //     ele.url_slug === currentUrl_slug &&
        //     ele.stage_status === 'in_process'
        // );

        // if (inProcesspoStage) {
        //   this.postPostage();
        // }
      });

    this.wsService.sendNode(
      this.hotPressService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
      true
    );

    this.wsService.sendNode(
      this.hotPressService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
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
        // this.router.navigate(['op/hp/' + this.inProcesspoStage[0]?.url_slug]);
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

  ngOnDestroy() {
    this.clickEventsubscription.unsubscribe();
  }
}
