import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { WindingService } from '../winding.service';
import { groupBy } from 'lodash-es';

@Component({
  selector: 'app-wd-spc',
  templateUrl: './wd-spc.component.html',
  styleUrls: ['./wd-spc.component.scss'],
})
export class WdSpcComponent implements OnInit {
  // @Input() windingVisualInspection!: boolean;
  // @Output() windingVisualInspectionCompleted = new EventEmitter();

  isProceed = false;
  measurement: any[] = [];
  radioSelmeasurement: any;
  radioSelmeasurement_1: any;
  disabledBtn: boolean = false;
  poData!: PO_DATA;
  machineId: any;
  processId: any;
  isResult: boolean = false;
  userData: any;
  testId!: number;
  isSample2!: boolean;
  isSample1!: boolean;
  isResultSuccessfully: boolean = false;
  constructor(
    private windingService: WindingService,
    private sharedService: SharedService,
    private router: Router,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('spc');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.userData = this.appStorage.get('USER_DATA');
    this.getTestParameters();
    this.wsService.sendNode(
      this.windingService.machineInterlocks.SPC_Check_successfully_Completed,
      false
    );
  }

  getTestParameters() {
    const reqBody = {
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      test_sub_type: this.sharedService.testParametersBySubType.SPC,
    };
    this.sharedService.getTestParameters(reqBody).subscribe((resp: any) => {
      this.testId = resp.data.test_id;
    });
  }

  getSpcMeasurement() {
    const reqBody = {
      production_order_id: this.poData.po_id,
      test_id: 45,
      test_sub_type: this.sharedService.testParametersBySubType.SPC,
      sach_id: this.poData.sach_id,
    };
    this.sharedService.getTestResult(reqBody).subscribe((resp: any) => {
      this.measurement = resp.data;
      this.disabledBtn = this.measurement ? true : false;

      const samplesByTestParams = groupBy(
        this.measurement,
        (e) => e.test_param_id
      );
      this.measurement = Object.values(samplesByTestParams).map(
        (params: any) => {
          let tempObj: any = {};
          for (let i = 0; i < params.length; i++) {
            if (Object.keys(tempObj).length) {
              tempObj['sample' + params[i].sample] = params[i].value;
            } else {
              tempObj = { ...params[i] };
              tempObj['sample' + tempObj.sample] = tempObj.value;
            }
          }
          delete tempObj.sample;
          return tempObj;
        }
      );
      this.measurement = this.measurement.map((ele: any) => {
        if (ele.min <= ele.sample1 && ele.sample1 <= ele.max) {
          ele.is_sample_1 = true;
        } else if (ele.sample1 !== null && ele.sample1 !== undefined) {
          ele.is_sample_1 = false;
        }

        if (ele.min <= ele.sample2 && ele.sample2 <= ele.max) {
          ele.is_sample_2 = true;
          this.isSample2 = true;
        } else if (ele.sample2 !== null && ele.sample2 !== undefined) {
          ele.is_sample_2 = false;
        }
        return ele;
      });
      const dd = this.measurement.map(
        (Item: any) => Item.is_sample_2 === true && Item.is_sample_1 === true
      );

      this.isResultSuccessfully = dd.every((ele: any) => ele === true);
    });
  }

  getSelecteditem() {
    if (this.radioSelmeasurement_1) {
      this.disabledBtn = true;
    } else {
      this.disabledBtn = false;
    }
  }

  next() {
    this.isResult = true;
    this.getSpcMeasurement();
  }

  proceed() {
    if (this.isResultSuccessfully) {
      this.wsService.sendNode(
        this.windingService.machineInterlocks.SPC_Check_successfully_Completed,
        true
      );
      const user = this.appStorage.get('USER_DATA');
      if (user.role === 'Operator') {
        this.router.navigate(['op/wd/winding']);
      } else {
        this.router.navigate(['op/wd/visual-inspection']);
      }
    } else {
      this.router.navigate(['op/wd/recipe-setup']);
      this.wsService.sendNode(
        this.windingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
        true
      );
    }
  }
}
