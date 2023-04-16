import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../Shared/shared-model';
import { SharedService } from '../Shared/shared.service';

@Component({
  selector: 'app-fqa',
  templateUrl: './fqa.component.html',
  styleUrls: ['./fqa.component.scss'],
})
export class FqaComponent implements OnInit {
  // poData!: PO_DATA;

  // constructor() {}

  // ngOnInit(): void {
  //   const poData = localStorage.getItem('PO_DATA')!;
  //   this.poData = JSON.parse(poData);
  // }

  poData!: PO_DATA;
  clickEventsubscription!: Subscription;
  machineId!: number;
  po!: string;
  sach!: string;
  processId!: number;
  poStages: any;
  inProcesspoStage: any;

  constructor(
    private appStorage: AppStorage,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.poData = this.appStorage.get('PO_DATA');
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);

    this.poStage();

    this.clickEventsubscription = this.sharedService
      .getClickEventpoStageCompleted()
      .subscribe((currentStageUrl: any) => {
        const inProcesspoStage = this.poStages.some(
          (ele: any) =>
            ele.url_slug === currentStageUrl &&
            ele.stage_status === 'in_process'
        );

        if (inProcesspoStage) {
          this.postPostage();
        }
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
        // this.router.navigate(['op/tp/' + this.inProcesspoStage[0]?.url_slug]);
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
