import { SharedService } from './../../Shared/shared.service';
import { MaskingService } from './../masking.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoData } from '../../Shared/shared-model';

@Component({
  selector: 'app-ma-print-label',
  templateUrl: './ma-print-label.component.html',
  styleUrls: ['./ma-print-label.component.scss'],
})
export class MaPrintLabelComponent implements OnInit {
  totalWheelCount!: number;
  fullWheelCount!: number;
  partialWheelCount!: number;
  poData!: PoData;
  machineId!: number;
  labelDetails: any;

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
    this.getWheelCount();
    this.getLabelDetails();
  }

  getLabelDetails() {
    this.maskingService
      .getLabelDetails(this.poData?.sach_id)
      .subscribe((resp: any) => {
        this.labelDetails = resp.data[0];
      });
  }

  getWheelCount() {
    this.maskingService
      .getWheelCount(this.poData?.sach_id, this.poData?.po_id)
      .subscribe((resp: any) => {
        this.totalWheelCount = resp?.data[0]?.TotalWheelCount;
        this.fullWheelCount = resp?.data[0]?.FullWheelCount;
        this.partialWheelCount = resp?.data[0]?.PartialWheelCount;
      });
  }

  printLabel() {
    this.maskingService
      .printLabels(
        this.machineId,
        this.poData?.po_id,
        this.totalWheelCount,
        this.poData?.po,
        this.poData?.sach,
        this.poData?.quantity,
        this.labelDetails?.label_name
      )
      .subscribe((resp: any) => {
        this.sharedService.sentClickEventpoStageCompleted('label-printing');
        this.router.navigate(['op/ma/scrap-booking']);
      });
  }
}
