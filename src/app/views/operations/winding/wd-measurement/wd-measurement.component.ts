import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { WindingService } from '../winding.service';

@Component({
  selector: 'app-wd-measurement',
  templateUrl: './wd-measurement.component.html',
  styleUrls: ['./wd-measurement.component.scss'],
})
export class WdMeasurementComponent implements OnInit {
  measurement: any[] = [];
  poData!: PO_DATA;
  machineId: any;
  processId: any;
  userData: any;
  testId!: number;
  isSample1!: boolean;
  isSample2!: boolean;

  constructor(
    private appStorage: AppStorage,
    private router: Router,
    private sharedService: SharedService,
    private windingService: WindingService
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('measurement');
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
      test_sub_type: this.sharedService.testParametersBySubType.STAGGER,
      sach_id: this.poData.sach_id,
    };
    this.sharedService.getTestParameters(reqBody).subscribe((resp: any) => {
      this.testId = resp.data.test_id;
      this.measurement = resp.data.params.map((key: any) => ({
        ...key,
        is_sample_1: null,
        is_sample_2: null,
      }));
    });
  }

  valueInput() {
    this.measurement = this.measurement.map((ele: any) => {
      if (ele.min <= ele.sample1 && ele.sample1 <= ele.max) {
        ele.is_sample_1 = true;
        this.isSample1 = this.isSample1 !== false ? true : false;
      } else if (ele.sample1 !== null && ele.sample1 !== undefined) {
        ele.is_sample_1 = false;
        this.isSample1 = false;
      }

      if (ele.min <= ele.sample2 && ele.sample2 <= ele.max) {
        ele.is_sample_2 = true;
        this.isSample2 = this.isSample2 !== false ? true : false;
      } else if (ele.sample2 !== null && ele.sample2 !== undefined) {
        ele.is_sample_2 = false;
        this.isSample2 = false;
      }
      return ele;
    });
  }

  proceed() {
    const element: any[] = [];
    this.measurement.forEach((e: any) => {
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
        element.push(ele);
      }
    });

    this.sharedService.postTestResult(element).subscribe({
      next: (res: any) => {
        if (this.isSample1 && this.isSample2) {
          const user = this.appStorage.get('USER_DATA');
          if (user.role === 'Operator') {
            this.router.navigate(['op/wd/spc']);
          } else {
            this.router.navigate(['op/wd/machine-setup']);
          }
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
