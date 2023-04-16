import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { WindingService } from '../winding.service';

@Component({
  selector: 'app-wd-visual-inspection',
  templateUrl: './wd-visual-inspection.component.html',
  styleUrls: ['./wd-visual-inspection.component.scss'],
})
export class WdVisualInspectionComponent implements OnInit {
  isProceed = false;
  visualInspect: any;
  radioSelvisualInspectSample1: any;
  radioSelvisualInspectSample2: any;
  allradioSelvisualInspectSample1: any;
  allradioSelvisualInspectSample2: any;
  disabledBtn: boolean = false;
  poData!: PO_DATA;
  machineId: any;
  processId: any;
  isFromWinding: any;
  userData: any;
  testId!: number;

  constructor(
    private windingService: WindingService,
    private sharedService: SharedService,
    private router: Router,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('visual-inspection');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.userData = this.appStorage.get('userData');

    this.getSpcvisualInspect();
  }

  getSpcvisualInspect() {
    const reqBody = {
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      test_sub_type: this.sharedService.testParametersBySubType.VISUAL,
      sach_id: this.poData.sach_id,
    };
    this.sharedService.getTestParameters(reqBody).subscribe((resp: any) => {
      this.testId = resp.data.test_id;

      this.visualInspect = resp.data.params.map((key: any) => ({
        ...key,
        is_sample_1_ok: false,
        is_sample_1_not_ok: false,
        is_sample_2_ok: false,
        is_sample_2_not_ok: false,
      }));
    });
  }

  onItemChange(event: any) {
    let value = event.target.value;

    this.visualInspect = this.visualInspect.map(
      (record: any, index: number) => {
        if (
          value.split('_')[0] == 'oksample1' &&
          value.split('_')[1] == index
        ) {
          record.sample1 = true;
          record.is_sample_1_ok = true;
          record.is_sample_1_not_ok = false;
        } else if (
          value.split('_')[0] == 'notoksample1' &&
          value.split('_')[1] == index
        ) {
          record.sample1 = false;
          record.is_sample_1_not_ok = true;
          record.is_sample_1_ok = false;
        } else if (
          value.split('_')[0] == 'oksample2' &&
          value.split('_')[1] == index
        ) {
          record.sample2 = true;
          record.is_sample_2_ok = true;
          record.is_sample_2_not_ok = false;
        } else if (
          value.split('_')[0] == 'notoksample2' &&
          value.split('_')[1] == index
        ) {
          record.sample2 = false;
          record.is_sample_2_not_ok = true;
          record.is_sample_2_ok = false;
        }
        return record;
      }
    );
    this.getSelecteditem();
  }

  getSelecteditem() {
    this.allradioSelvisualInspectSample1 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_1_ok == true || Item.is_sample_1_not_ok == true
    );
    this.allradioSelvisualInspectSample1 =
      this.allradioSelvisualInspectSample1.every((ele: any) => ele === true);

    this.allradioSelvisualInspectSample2 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_2_ok == true || Item.is_sample_2_not_ok == true
    );
    this.allradioSelvisualInspectSample2 =
      this.allradioSelvisualInspectSample2.every((ele: any) => ele === true);

    this.radioSelvisualInspectSample1 = this.visualInspect.map(
      (Item: any) => Item.is_sample_1_ok == true
    );
    this.radioSelvisualInspectSample1 = this.radioSelvisualInspectSample1.every(
      (ele: any) => ele === true
    );

    this.radioSelvisualInspectSample2 = this.visualInspect.map(
      (Item: any) => Item.is_sample_2_ok == true
    );
    this.radioSelvisualInspectSample2 = this.radioSelvisualInspectSample2.every(
      (ele: any) => ele === true
    );

    if (
      this.allradioSelvisualInspectSample1 &&
      this.allradioSelvisualInspectSample2
    ) {
      this.disabledBtn = true;
    } else {
      this.disabledBtn = false;
    }
  }

  completeVisualInspection() {
    const elements: any[] = [];
    this.visualInspect.forEach((e: any) => {
      for (let index = 1; index <= e.sample_size; index++) {
        const ele = {
          test_id: this.testId,
          test_param_id: e.id,
          sample: index,
          value: e['sample' + index],
          min: e.min,
          max: e.max,
          pass: e['sample' + index],
        };
        elements.push(ele);
      }
    });

    // const samplesByTestParams = groupBy(elements, (e) => e.test_param_id);
    // const formattedParams = Object.values(samplesByTestParams).map((params) => {
    //   let tempObj: any = {};
    //   for (let i = 0; i < params.length; i++) {
    //     if (Object.keys(tempObj).length) {
    //       tempObj['sample' + params[i].sample] = params[i].value;
    //     } else {
    //       tempObj = { ...params[i] };
    //       tempObj['sample' + tempObj.sample] = tempObj.value;
    //     }
    //   }
    //   delete tempObj.sample;
    //   return tempObj;
    // });

    this.sharedService.postTestResult(elements).subscribe({
      next: (res: any) => {
        if (
          this.radioSelvisualInspectSample1 &&
          this.radioSelvisualInspectSample2
        ) {
          this.router.navigate(['op/wd/measurement']);
        } else {
          this.router.navigate(['op/wd/recipe-setup']);
        }
      },
      error: (error) => {
        console.info(error);
      },
    });
  }
}
