import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../../Shared/shared-model';
import { SharedService } from '../../../Shared/shared.service';
import { WindingService } from '../../winding.service';

@Component({
  selector: 'app-wd-recipe-setup-visual-inspection',
  templateUrl: './wd-recipe-setup-visual-inspection.component.html',
  styleUrls: ['./wd-recipe-setup-visual-inspection.component.scss'],
})
export class WdRecipeSetupVisualInspectionComponent implements OnInit {
  @Input() windingVisualInspection!: boolean;
  @Output() windingVisualInspectionCompleted = new EventEmitter();

  isProceed = false;
  measurement: any;
  visualInspect: any;
  radioSelmeasurement: any;
  radioSelmeasurement_1: any;
  radioSelvisualInspectSample1: any;
  radioSelvisualInspectSample2: any;
  allradioSelvisualInspectSample1: any;
  allradioSelvisualInspectSample2: any;
  disabledBtn: boolean = false;
  CapacitanceValue: any;
  poData!: PO_DATA;
  machineId: any;
  processId: any;

  isFromWinding: any;
  userData: any;
  constructor(
    private windingService: WindingService,
    private sharedService: SharedService,
    private router: Router,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    this.machineId = localStorage.getItem('MACHINE_ID');
    this.machineId = JSON.parse(this.machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    const userData = localStorage.getItem('USER_DATA')!;
    this.userData = JSON.parse(userData);

    this.isFromWinding = this.appStorage.get('TEM_WD_WINDING');

    // this.getSpcMeasurement();
    this.getSpcvisualInspect();
    if (this.isFromWinding) {
      this.isProceed = true;
    }
    this.wsService.sendNode(
      this.windingService.machineInterlocks.SPC_Check_successfully_Completed,
      false
    );
  }

  // getSpcMeasurement() {
  //   this.windingService
  //     .getSpcMeasurement(this.poData?.po_id)
  //     .subscribe((resp: any) => {
  //       this.measurement = resp.data;
  //       this.radioSelmeasurement = this.measurement.map(
  //         (Item: any) => Item.is_true == true
  //       );
  //       this.radioSelmeasurement_1 = this.measurement.map(
  //         (Item: any) => Item.is_true == true || Item.is_true == false
  //       );
  //       this.radioSelmeasurement = this.radioSelmeasurement.every(
  //         (ele: any) => ele === true
  //       );
  //     });
  // }

  getSpcvisualInspect() {
    const type = 'visual';
    this.sharedService
      .getSpcvisualInspect(this.processId, type)
      .subscribe((resp: any) => {
        this.visualInspect = resp.data.map((key: any) => ({
          ...key,
          is_sample_1_ok: false,
          is_sample_1_not_ok: false,
          is_sample_2_ok: false,
          is_sample_2_not_ok: false,
        }));
      });
  }

  isProceeded() {
    this.isProceed = true;
  }

  completeVisualInspection() {
    const req = this.visualInspect.map((ele: any) => {
      return {
        id: ele.id,
        sample1: ele.sample1,
        sample2: ele.sample2,
      };
    });

    const reqMeasurement = this.measurement.map((ele: any) => {
      return {
        id: ele.id,
        sample1: ele.sample1,
        sample2: ele.sample2,
      };
    });

    const reqarray = [...req, ...reqMeasurement];

    const reqArray = reqarray.map((key: any) => ({
      ...key,
      poid: this.poData.po_id,
      sachid: this.poData.sach_id,
      machine_id: this.machineId,
    }));

    // this.windingService
    //   .VisualInspection(reqArray, this.poData?.po_id)
    //   .subscribe();
    if (
      this.radioSelmeasurement &&
      this.radioSelvisualInspectSample1 &&
      this.radioSelvisualInspectSample2
    ) {
      this.wsService.sendNode(
        this.windingService.machineInterlocks.SPC_Check_successfully_Completed,
        true
      );
      if (this.isFromWinding) {
        this.router.navigate(['op/wd/winding']);
        this.isFromWinding = localStorage.removeItem('TEM_WD_WINDING');
      } else {
        this.router.navigate(['op/wd/machine-setup']);
      }
    } else {
      localStorage.setItem('IS_REWORK', 'true');
      this.router.navigate(['op/wd/recipe-setup']);
      this.wsService.sendNode(
        this.windingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
        true
      );
    }
  }

  onSelect(event: any) {
    this.CapacitanceValue = event.target.value;
    this.getSelecteditem();
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
      this.radioSelmeasurement_1 &&
      this.allradioSelvisualInspectSample1 &&
      this.allradioSelvisualInspectSample2
    ) {
      this.disabledBtn = true;
    } else {
      this.disabledBtn = false;
    }
  }
}
