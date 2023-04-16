import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { WindingService } from '../winding.service';

@Component({
  selector: 'app-wd-tool-check',
  templateUrl: './wd-tool-check.component.html',
  styleUrls: ['./wd-tool-check.component.scss'],
})
export class WdToolCheckComponent implements OnInit {
  poToolList: any;
  poToolDetails: any;
  isToolAllSelected: boolean = false;
  poData!: PO_DATA;
  machine: any;
  previousSachSame: boolean = false;
  yes: boolean = false;
  no: boolean = false;

  constructor(
    private windingService: WindingService,
    private router: Router,
    private appStorage: AppStorage,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('tool-check');
    this.poData = this.appStorage.get('PO_DATA');
    this.machine = this.appStorage.get('MACHINE');

    this.previousSachSame = this.appStorage.get('PREVIOUS_BATCH_SAME');
    this.getPoTools();
  }

  getPoTools() {
    this.sharedService.getToolCheckPo(this.poData?.sach_id).subscribe({
      next: (res: any) => {
        this.poToolDetails = res.data.map((key: any) => ({
          ...key,
          isChecked: false,
        }));
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  proceedToCompleteToolCheck() {
    const req = this.poToolDetails.map((ele: any) => {
      return { tool_id: ele.tool_id, tool_value: ele.selectedValue };
    });

    const reqBody = req.map((e: any) => ({
      ...e,
      production_order_id: this.poData.po_id,
      machine_id: this.machine[0].id,
    }));

    this.sharedService.postTool(reqBody).subscribe({
      next: (res: any) => {
        this.router.navigate(['op/wd/recipe-setup']);
        if (this.machine[0].is_pre_press === true) {
          this.postPrePressMode();
        }
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  onToolSelected(value: any, item?: any) {
    item.isTouched = true;

    if (value == item?.required_value) {
      item.isChecked = true;
      item.selectedValue = value;
    } else {
      item.isChecked = false;
    }

    this.checkForAllScannedTools();
  }

  onItemChange(event: any) {
    let value = event.target.value;
    this.yes = value === 'yes' ? true : false;
    this.no = value === 'no' ? true : false;
    this.checkForAllScannedTools();
  }

  checkForAllScannedTools() {
    let count = 0;
    this.poToolDetails.forEach((element: any) => {
      if (element.isChecked == true) {
        count++;
        if (this.machine[0].is_pre_press === true) {
          if (
            count == this.poToolDetails.length &&
            (this.yes === true || this.no === true)
          ) {
            this.isToolAllSelected = true;
          } else {
            this.isToolAllSelected = false;
          }
        } else {
          if (count == this.poToolDetails.length) {
            this.isToolAllSelected = true;
          } else {
            this.isToolAllSelected = false;
          }
        }
      }
    });
  }

  confirmModalToCompleteMaterialCheck() {
    this.proceedToCompleteToolCheck();
  }

  postPrePressMode() {
    const reqBody = {
      production_order_id: this.poData.po_id,
      is_pre_press_mode: this.yes === true ? true : false,
    };
    this.windingService.postPrePressMode(reqBody).subscribe({
      next: (res: any) => {},
    });
  }

  cancelAllRollScanned() {
    this.previousSachSame = false;
  }
}
