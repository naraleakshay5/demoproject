import { PO_DATA } from './../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { SharedService } from './../../Shared/shared.service';
import { ElTestingService } from './../el-testing.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-el-label-printing',
  templateUrl: './el-label-printing.component.html',
  styleUrls: ['./el-label-printing.component.scss'],
})
export class ElLabelPrintingComponent implements OnInit {
  poData!: PO_DATA;
  machineId!: number;
  labelDetails: any;
  elementCount!: number;
  binsCount!: number;

  constructor(
    private router: Router,
    private testingService: ElTestingService,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    const bins = this.appStorage.get('SCANNED_OUTPUT_BINS');
    this.binsCount = bins.length;
    this.elementCount = this.appStorage.get('TOTAL_ELEMENT_COUNT');
    this.getLabelDetails();
  }

  getLabelDetails() {
    this.poData = this.appStorage.get('PO_DATA');

    this.testingService
      .getLabelDetails(this.poData?.sach_id)
      .subscribe((resp: any) => {
        this.getLabelDetails = resp.data[0];
      });
  }

  printLabel() {
    this.machineId = this.appStorage.get('MACHINE_ID');

    const reqObj = {
      totalBins: this.binsCount,
      poNumber: this.poData?.po_number,
      sachNumber: this.poData?.sach_number,
      poQuantity: this.elementCount,
    };
    this.sharedService
      .labelPrinting(this.machineId, this.poData.po_id, reqObj)
      .subscribe((res: any) => {
        this.sharedService.sentClickEventpoStageCompleted('label-printing');
        this.router.navigate(['op/el/scrap-booking']);
        this.appStorage.clear('TOTAL_OUTPUT_BINS_SCANNED');
      });
  }
}
