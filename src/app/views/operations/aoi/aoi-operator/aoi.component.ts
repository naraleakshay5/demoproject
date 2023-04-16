import { AoiMachineService } from '../../../../aoi-machine.service';
import { AoiService } from './aoi.service';
import { PO_DATA } from '../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../Shared/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aoi',
  templateUrl: './aoi.component.html',
  styleUrls: ['./aoi.component.scss'],
})
export class AoiComponent implements OnInit {
  clickEventsubscription!: Subscription;
  processId!: number;
  poData!: PO_DATA;
  poStages: any;
  inProcessPoStage: any;
  sachNumber!: string;
  poNumber!: string;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private appStorage: AppStorage,
    private aoiService: AoiService,
    private aoiMachineService: AoiMachineService
  ) {}

  ngOnInit(): void {
    this.processId = this.appStorage.get('PROCESS_ID');
    this.poData = this.appStorage.get('PO_DATA');

    this.poNumber = this.poData?.po_number;
    this.sachNumber = this.poData?.sach_number;

    if (this.aoiService.isLoadedOnce == 0) {
      this.aoiService.isLoadedOnce = 1;
      this.getData();
    }

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
  }

  postPostage() {
    this.inProcessPoStage = this.poStages.filter(
      (ele: any) => ele.stage_status === 'in_process'
    );
    const stageId = this.inProcessPoStage[0]?.stage_id;

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

  getData() {
    this.aoiService.getRecipeData(this.poData?.sach_id).subscribe({
      next: (resp: any) => {
        this.createRecipe(resp.data[0]);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  createRecipe(recipeData: any) {
    this.poData = this.appStorage.get('PO_DATA');

    const batchData = {
      PONo: this.poData.po_number,
      POQty: this.poData.target_quantity,
      SachNo: this.poData.sach_number,
      AssemblyMachine: '',
      TestingMachine: '',
      IsImpregnation: '',
      IsWashingDone: '',
    };

    const recipe = {
      Rec_id: recipeData?.rec_id,
      SachNo: recipeData?.sach_no,
      RecipeName: recipeData?.recipe_name,
      TopLIne1: recipeData?.top_line_1,
      TopLine2: recipeData?.top_line_2,
      SideLine1: recipeData?.side_line_1,
      SideLine2: recipeData?.side_line_2,
      ENEC: recipeData?.enec,
      LeadLengthLower: recipeData?.lead_length_lower,
      LeadLengthUpper: recipeData?.lead_length_upper,
      Camera1_SG: recipeData?.camera_1_sg,
      Camera1_SN: recipeData?.camera_1_sn,
      Camera2_SG: recipeData?.camera_2_sg,
      Camera2_SN: recipeData?.camera_2_sn,
      Camera3_SG: recipeData?.camera_3_sg,
      Camera3_SN: recipeData?.camera_3_sn,
      RecipeName_C4: recipeData?.recipename_c4,
      RecipeName_C5: recipeData?.recipename_c5,
      RecipeName_C6: recipeData?.recipename_c6,
      RecipeName_C7: recipeData?.recipename_c7,
      RecipeName_C8: recipeData?.recipename_c8,
      RecipeName_C9: recipeData?.recipename_c9,
      RecipeName_C1: recipeData?.recipename_c10,
    };

    this.aoiMachineService.send({
      op: 'CREATE_BATCH',
      batchData: batchData,
      recipeData: recipe,
    });
  }

  poStage() {
    this.sharedService
      .poStage(this.processId, this.poData?.po_id)
      .subscribe((res: any) => {
        this.poStages = res.data;

        this.inProcessPoStage = this.poStages.filter(
          (ele: any) => ele.stage_status === 'in_process'
        );

        this.router.navigate(['op/aoi/' + this.inProcessPoStage[0]?.url_slug]);
      });
  }

  getSpcSchedule() {
    this.sharedService
      .getSpcSchedule(this.processId, this.poData?.po_id)
      .subscribe((res: any) => {
        this.appStorage.set('SPC_SCHEDULE', res.data);
      });
  }

  ngOnDestroy() {
    this.clickEventsubscription.unsubscribe();
  }
}
