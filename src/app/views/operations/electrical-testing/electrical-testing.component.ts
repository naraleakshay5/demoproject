import { PO_DATA } from './../Shared/shared-model';
import { VideoJetService } from './../../../video-jet.service';
import { ElTestingService } from './el-testing.service';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../Shared/shared.service';

@Component({
  selector: 'app-electrical-testing',
  templateUrl: './electrical-testing.component.html',
  styleUrls: ['./electrical-testing.component.scss'],
})
export class ElectricalTestingComponent implements OnInit {
  poData!: PO_DATA;
  machineId!: number;
  processId!: number;
  clickEventsubscription!: Subscription;
  inProcesspoStage: any;
  poStages: any;
  machineData: any;
  videoJetStatus: string = '';
  yearCode!: any;
  monthCode!: any;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private appStorage: AppStorage,
    private testingService: ElTestingService,
    private vjService: VideoJetService
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.machineData = this.appStorage.get('MACHINE');
    this.machineId = this.machineData?.id;

    if (this.testingService.isLoadedOnce == 0) {
      this.testingService.isLoadedOnce = 1;
      this.getYearCode();
    }

    this.getSpcSchedule();
    this.poStage();
    this.checkVideoJetStatus();

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
  }

  getYearCode() {
    this.testingService.getYearCode().subscribe({
      next: (resp: any) => {
        this.yearCode = resp.data[0].code;
        this.getMonthCode();
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  getMonthCode() {
    this.testingService.getMonthCode().subscribe({
      next: (resp: any) => {
        this.monthCode = resp.data[0].code;
        this.getJson();
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  getJson() {
    this.testingService.getJson(this.poData?.sach_id).subscribe({
      next: (resp: any) => {
        const topLine1 = resp.data[0].top_line_1;
        let firstHalf = null;
        let secondHalf = null;
        //kept for further development
        // if (topLine1.contains('?')) {
        //   firstHalf = topLine1.split('?????????')[0];
        //   secondHalf = topLine1.split('?????????')[1];
        // } else {
        //   firstHalf = topLine1.split('YYYYYYYYY')[0];
        //   secondHalf = topLine1.split('YYYYYYYYY')[1];
        // }
        firstHalf = topLine1.split('?????????')[0];
        secondHalf = topLine1.split('?????????')[1];

        const printTopLine1 = firstHalf + this.poData?.po_number + secondHalf;

        let topLine2 = resp.data[0].top_line_2;

        const code = this.monthCode + this.yearCode;
        topLine2 = topLine2.replace('XX', code);
        topLine2 = topLine2.replace('#', '~');
        topLine2 = topLine2.replace('u', '\u00B5');
        const printTopLine2 = topLine2;

        const intensity = (0.0).toFixed(1);

        const json = {
          State: 'INIT',
          PurchaseOrder: this.poData?.po_number,
          SachNo: this.poData?.sach_number,
          LS: this.poData?.lead_space,
          Box: resp.data[0].box,
          TopLine1: printTopLine1,
          TopLine2: printTopLine2,
          TopMarking: resp.data[0].top_marking,
          SideMarking: resp.data[0].side_marking,
          SideLine1: resp.data[0].side_line_1,
          SideLine2: resp.data[0].side_line_2,
          ENEC: resp.data[0].enec,
          Picture: resp.data[0].picture,
          ConfirmRequired: 0,
          MarkingSpeed: 0,
          Intensity: intensity,
          TopProductCount: 0,
          TopMarkingCount: 0,
          SideProductCount: 0,
          SideMarkingCount: 0,
        };
        this.appStorage.set('JSON', json);
        this.setJson(json);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  setJson(data: any) {
    this.vjService.send({
      op: 'CREATE_BATCH',
      data: data,
    });
  }

  checkVideoJetStatus() {
    this.vjService.status.subscribe({
      next: (resp: any) => {
        this.videoJetStatus = resp;

        if (this.videoJetStatus == 'verified') {
          this.appStorage.set('VJ_VERIFIED', true);
        }
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  async poStage() {
    await this.sharedService
      .poStage(this.processId, this.poData?.po_id)
      .subscribe((res: any) => {
        this.poStages = res.data;
        this.inProcesspoStage = this.poStages.filter(
          (ele: any) => ele.stage_status === 'in_process'
        );
        this.router.navigate(['op/el/' + this.inProcesspoStage[0]?.url_slug]);
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

  getSpcSchedule() {
    this.sharedService
      .getSpcSchedule(this.processId, this.poData?.po_id)
      .subscribe((res: any) => {
        localStorage.setItem('TEM_SPC_SCHEDULE', JSON.stringify(res.data));
      });
  }

  ngOnDestroy() {
    this.clickEventsubscription.unsubscribe();
  }
}
