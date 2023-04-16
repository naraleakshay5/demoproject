import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cilCheck, cilWarning } from '@coreui/icons';
import { Subscription } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../Shared/shared-model';
import { SharedService } from '../Shared/shared.service';
import { WindingService } from './winding.service';

@Component({
  selector: 'app-winding',
  templateUrl: './winding.component.html',
  styleUrls: ['./winding.component.scss'],
})
export class WindingComponent implements OnInit {
  stages: any;
  user!: any;
  isSetter: boolean = false;
  isOperator: boolean = false;
  machineId!: number;
  poData!: PO_DATA;
  po!: string;
  sach!: string;
  processId!: number;
  poStages: any;
  inProcesspoStage: any;
  icons = { cilCheck, cilWarning };
  alarms: any[] = [];
  isAlarms: boolean = false;

  constructor(
    private router: Router,
    private windingService: WindingService,
    private sharedService: SharedService,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  static componentRendered = 0;
  clickEventsubscription!: Subscription;

  ngOnInit(): void {
    this.user = this.appStorage.get('USER_DATA');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.poStage();
    this.getSpcSchedule();

    this.clickEventsubscription = this.windingService
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

    if (this.user.role == 'Setter') {
      this.wsService.sendNode(
        this.windingService.machineInterlocks.BATCH_START_CHECKS_COMPLETED,
        true
      );
      this.wsService.sendNode(
        this.windingService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
        false
      );
    }

    // this.wsService.alarms.subscribe({
    //   next: (values: any) => {
    //     this.alarms = values;

    //     this.isAlarms = !!this.alarms && !!this.alarms.length;
    //   },
    // });
  }

  poStage() {
    this.sharedService
      .poStage(this.processId, this.poData?.po_id)
      .subscribe((res: any) => {
        this.poStages = res.data;
        this.inProcesspoStage = this.poStages.filter(
          (ele: any) => ele.stage_status === 'in_process'
        );
        // this.router.navigate(['op/wd/' + this.inProcesspoStage[0]?.url_slug]);
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

  getSpcSchedule() {
    this.sharedService
      .getSpcSchedule(this.processId, this.poData?.po_id)
      .subscribe((res: any) => {
        this.appStorage.set('TEM_SPC_SCHEDULE', res.data);
      });
  }

  ngOnDestroy() {
    this.clickEventsubscription.unsubscribe();
  }
}
