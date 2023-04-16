import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from 'src/app/views/operations/Shared/shared-model';
import { SharedService } from 'src/app/views/operations/Shared/shared.service';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
})
export class OperationComponent implements OnInit {
  poData!: PO_DATA;
  processId: any;
  progress: number = 95;
  isProgressCompleted: boolean = false;

  isSubmitBtn: boolean = false;
  isReworkBtn: boolean = false;
  machineHotPressCurrentTime: number = 0;
  machineHotPressExpectedTime: number = 0;
  estimatedTime: number = 0;
  testId!: number;
  operationalsLogs: any[] = [];

  trays: any[] = [
    {
      param_name: 'Top',
      sample_size: 2,
      is_sample_1_not_ok: false,
      is_sample_1_ok: true,
    },
    {
      param_name: 'Bottom',
      sample_size: 2,
      is_sample_1_not_ok: false,
      is_sample_1_ok: true,
    },
  ];
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.appStorage.set('TEM_LAST_URL', 'operations');
    this.operationalsLogs = this.appStorage.getOperationalLogs();
    this.sharedService.sentClickEventpoStageCompleted('operations');
    this.poData = this.appStorage.get('PO_DATA');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.gettrays();

    this.wsService.machineHotPressCurrentTime.subscribe({
      next: (value: number) => {
        this.machineHotPressCurrentTime = value;
        this.updateProgress();
      },
    });
    this.wsService.machineHotPressExpectedTime.subscribe({
      next: (value: number) => {
        this.machineHotPressExpectedTime = value;
        this.updateProgress();
      },
    });
  }

  updateProgress() {
    // const partsProgress =
    //   this.machineHotPressCurrentTime / this.machineHotPressExpectedTime;
    // this.estimatedTime =
    //   this.machineHotPressExpectedTime - this.machineHotPressCurrentTime;
    // this.progress = Math.round(partsProgress * 100);
    // if (this.progress == 100) {
    //   this.isProgressCompleted = true;
    // }
  }

  incrementTheProgress() {
    this.progress++;
    if (this.progress == 100) {
      this.isProgressCompleted = true;
    }
  }

  Submit() {
    this.router.navigate(['training/hot-press/output-carrier-scan']);
    // const elements: any[] = [];
    // this.trays.forEach((e: any) => {
    //   for (let index = 1; index <= e.sample_size; index++) {
    //     const ele = {
    //       test_id: this.testId,
    //       test_param_id: e.id,
    //       sample: index,
    //       value: e['sample' + index],
    //       min: e.min,
    //       max: e.max,
    //       pass: e['sample' + index],
    //     };
    //     elements.push(ele);
    //   }
    // });
    // this.sharedService.postTestResult(elements).subscribe({
    //   next: (res: any) => {
    //     if (this.isReworkBtn) {
    //       this.router.navigate(['training/hot-press/recipe-setup']);
    //     } else {
    //       this.router.navigate(['training/hot-press/output-carrier-scan']);
    //     }
    //   },
    //   error: (error) => {
    //     console.info(error);
    //   },
    // });
  }

  Rework() {
    this.router.navigate(['training/hot-press/recipe-setup']);
    //this.appStorage.set('IS_REWORK', true);
  }

  gettrays() {
    // const reqBody = {
    //   production_order_id: this.poData.po_id,
    //   process_id: this.processId,
    //   test_sub_type: this.sharedService.testParametersBySubType.VISUAL,
    //   sach_id: this.poData.sach_id,
    // };
    // this.sharedService.getTestParameters(reqBody).subscribe((resp: any) => {
    //   this.testId = resp.data.test_id;
    //   this.trays = resp.data.params.map((key: any) => ({
    //     ...key,
    //     is_sample_1_ok: null,
    //     is_sample_1_not_ok: null,
    //     is_sample_2_ok: null,
    //     is_sample_2_not_ok: null,
    //   }));
    // });
  }

  onItemChange(event: any) {
    let value = event.target.value;
    this.trays = this.trays.map((record: any, index: number) => {
      if (value.split('_')[0] == 'oksample1' && value.split('_')[1] == index) {
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
    });

    this.trays = this.trays.map((res: any) => {
      if (res.is_sample_1_ok && res.is_sample_2_ok) {
        res.Sample_ok = 2;
        res.Sample_not_ok = 0;
      } else if (res.is_sample_1_not_ok && res.is_sample_2_not_ok) {
        res.Sample_ok = 0;
        res.Sample_not_ok = 2;
      } else if (res.is_sample_1_not_ok && !res.is_sample_2_not_ok) {
        res.Sample_ok = 1;
        res.Sample_not_ok = 1;
      } else if (!res.is_sample_1_not_ok && res.is_sample_2_not_ok) {
        res.Sample_ok = 1;
        res.Sample_not_ok = 1;
      }
      return res;
    });
    const notOk = this.trays.map(
      (Item: any) =>
        Item.is_sample_1_not_ok == true || Item.is_sample_2_not_ok == true
    );

    this.isReworkBtn = notOk.some((ele: any) => ele === true);

    this.getSelecteditem();
  }

  getSelecteditem() {
    this.isSubmitBtn = false;
    const Allradio_1 = this.trays.map((Item: any) => Item.Sample_ok == 2);
    this.isSubmitBtn = Allradio_1.every((ele: any) => ele === true);
  }

  inputBinScan() {
    this.appStorage.set('TEM_SCAN_INPUT_BIN', true);
    this.router.navigate(['training/hot-press/ip-carrier-scan']);
  }
}
