import { SharedService } from './../../Shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoData } from '../../Shared/shared-model';
import { MaskingService } from '../masking.service';

@Component({
  selector: 'app-ma-tool-check',
  templateUrl: './ma-tool-check.component.html',
  styleUrls: ['./ma-tool-check.component.scss'],
})
export class MaToolCheckComponent implements OnInit {
  pusherId!: string;
  elementGuideId!: string;
  pusherIdCheck: boolean = false;
  elementGuideIdCheck: boolean = false;
  allChecked: boolean = false;
  poData!: PoData;
  machineId!: number;

  constructor(
    private router: Router,
    private maskingService: MaskingService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    this.getPoTools();
  }
  getPoTools() {
    this.maskingService
      .getToolCheckPo(this.poData?.sach_id)
      .subscribe((resp: any) => {
        this.pusherId = resp.data[0].value;
        this.elementGuideId = resp.data[1].value;
      });
  }

  checkPusherId(pusherIdCheck: any) {
    this.pusherIdCheck = pusherIdCheck.target.checked;
    this.allCheckBoxChecked();
  }

  checkElementGuideId(elementGuideIdCheck: any) {
    this.elementGuideIdCheck = elementGuideIdCheck.target.checked;
    this.allCheckBoxChecked();
  }

  allCheckBoxChecked() {
    if (this.pusherIdCheck && this.elementGuideIdCheck) {
      this.allChecked = true;
    } else {
      this.allChecked = false;
    }
  }

  proceedToCompleteToolCheck() {
    this.sharedService.sentClickEventpoStageCompleted('tool-check');
    this.router.navigate(['op/ma/machine-setup']);
  }
}
