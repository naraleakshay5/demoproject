import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-tp-label-printing',
  templateUrl: './tp-label-printing.component.html',
  styleUrls: ['./tp-label-printing.component.scss'],
})
export class TpLabelPrintingComponent implements OnInit {
  elementCount!: string;
  boxCount: any;
  poData!: PO_DATA;
  machineId: any;
  enableScrapBooking: boolean = false;
  isScrapSubmitted: boolean = false;
  isScrapFromLabelPrinting: boolean = false;
  processId!: any;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.elementCount = this.appStorage.get('CAPACITOR_COUNT');
    this.boxCount = this.appStorage.get('BOX_COUNTER');
  }

  printLabel() {
    // this.router.navigate(['op/tp/scrap-booking']);

    this.isScrapFromLabelPrinting = true;
    const reqObj = {
      totalBins: this.boxCount,
      poNumber: this.poData?.po_number,
      sachNumber: this.poData?.sach_number,
      poQuantity: this.elementCount,
    };
    this.sharedService
      .labelPrinting(this.machineId, this.poData?.po_id, reqObj)
      .subscribe((res: any) => {
        if (this.appStorage.get('NEXT_SACH') === this.poData.sach_number) {
          this.router.navigate(['op/tp/scrap-booking']);
        } else {
          this.router.navigate(['op/tp/diff-sach']);
        }
      });
  }
}
