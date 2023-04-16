import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotPressService } from '../hot-press.service';
import { grill_name, grill } from '../hot-press-model';
import { SharedService } from '../../Shared/shared.service';
import { PO_DATA } from '../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-hp-grill-selection',
  templateUrl: './hp-grill-selection.component.html',
  styleUrls: ['./hp-grill-selection.component.scss'],
})
export class HpGrillSelectionComponent implements OnInit {
  poData!: PO_DATA;
  grill_name!: grill_name;
  grills: grill[] = [];
  isBtnValid: boolean = false;
  isWarning: boolean = false;
  selectedGrill!: string;
  machineId: any;
  log!: { time: number; action: string; value: any };
  operationalsLogs: any[] = [];

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private hotPressService: HotPressService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.operationalsLogs = this.appStorage.getOperationalLogs();
    this.sharedService.sentClickEventpoStageCompleted('grill-selection');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.getAllGrillS();
    this.getSuggestedGrill();
  }

  getAllGrillS() {
    this.hotPressService.getAllGrills().subscribe((res: any) => {
      this.grills = res.data;
    });
  }

  getSuggestedGrill() {
    this.hotPressService
      .getSuggestedGrill(this.poData.po_id)
      .subscribe((res: any) => {
        this.grill_name = res.data[0].grill_name;
      });
  }

  onChange(value: any) {
    this.isBtnValid = false;
    this.isWarning = true;
    if (value == this.grill_name) {
      this.isBtnValid = true;
      this.isWarning = false;
      this.selectedGrill = value;
    }

    this.log = {
      time: new Date().getTime(),
      action:
        this.isBtnValid == true
          ? this.sharedService.operationalLOgsActions.CORRECT_GRILL
          : this.sharedService.operationalLOgsActions.WRONG_GRILL,
      value: value,
    };
    this.operationalsLogs.push(this.log);
  }

  Confirm() {
    this.appStorage.setOperationalLogs(this.operationalsLogs);
    const reqBody = {
      production_order_id: this.poData.po_id,
      machine_id: this.machineId,
      tool_value: this.selectedGrill,
      tool_name: this.sharedService.testParametersBySubType.GRILL,
    };
    this.hotPressService.postGrill(reqBody).subscribe((res: any) => {
      this.router.navigate(['op/hp/recipe-setup']);
    });
  }
}
