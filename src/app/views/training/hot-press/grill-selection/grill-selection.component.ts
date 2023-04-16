import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import {
  grill,
  grill_name,
} from 'src/app/views/operations/hot-press/hot-press-model';
import { HotPressService } from 'src/app/views/operations/hot-press/hot-press.service';
import { PO_DATA } from 'src/app/views/operations/Shared/shared-model';
import { SharedService } from 'src/app/views/operations/Shared/shared.service';

@Component({
  selector: 'app-grill-selection',
  templateUrl: './grill-selection.component.html',
  styleUrls: ['./grill-selection.component.scss'],
})
export class GrillSelectionComponent implements OnInit {
  poData!: PO_DATA;
  grill_name!: grill_name;

  isBtnValid: boolean = false;
  isWarning: boolean = false;
  selectedGrill!: string;
  machineId: any;
  log!: { time: number; action: string; value: any };
  operationalsLogs: any[] = [];

  grills: any = [
    {
      id: 1,
      grill_name: 'D',
    },
    {
      id: 2,
      grill_name: 'D (5.5)',
    },
    {
      id: 3,
      grill_name: 'E (7.6)',
    },
    {
      id: 4,
      grill_name: 'E',
    },
    {
      id: 5,
      grill_name: 'F (9.5)',
    },
    {
      id: 6,
      grill_name: 'F',
    },
    {
      id: 7,
      grill_name: 'G',
    },
    {
      id: 8,
      grill_name: 'H',
    },
    {
      id: 9,
      grill_name: 'I',
    },
    {
      id: 10,
      grill_name: 'J',
    },
    {
      id: 11,
      grill_name: 'L',
    },
    {
      id: 12,
      grill_name: 'M',
    },
    {
      id: 13,
      grill_name: 'K',
    },
  ];
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private hotPressService: HotPressService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.appStorage.set('TEM_LAST_URL', 'grill-selection');
    //console.log(this.grills.grill_name);
  }
  // getAllGrillS() {
  //   this.hotPressService.getAllGrills().subscribe((res: any) => {
  //     this.grills = res.data;
  //   });
  // }

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

    if (value === 'F') {
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
    this.router.navigate(['training/hot-press/recipe-setup']);
    // this.appStorage.setOperationalLogs(this.operationalsLogs);
    // const reqBody = {
    //   production_order_id: this.poData.po_id,
    //   machine_id: this.machineId,
    //   tool_value: this.selectedGrill,
    //   tool_name: this.sharedService.testParametersBySubType.GRILL,
    // };
    // this.hotPressService.postGrill(reqBody).subscribe((res: any) => {
    //   this.router.navigate(['op/hp/recipe-setup']);
    // });
  }
}
