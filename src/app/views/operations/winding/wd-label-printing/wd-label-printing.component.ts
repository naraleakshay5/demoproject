import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { WindingService } from '../winding.service';

@Component({
  selector: 'app-wd-label-printing',
  templateUrl: './wd-label-printing.component.html',
  styleUrls: ['./wd-label-printing.component.scss'],
})
export class WdLabelPrintingComponent implements OnInit {
  elementCount!: string;
  binsCount: any;
  poData!: PO_DATA;
  machineId: any;
  enableScrapBooking: boolean = false;
  isScrapSubmitted: boolean = false;
  isScrapFromLabelPrinting: boolean = false;
  processId!: any;

  constructor(
    private router: Router,
    private windingService: WindingService,
    private wsService: WebsocketService,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('label-printing');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.elementCount = this.appStorage.get('TEM_ELEMENT_COUNT');

    this.materialCarrierBinded();
  }

  materialCarrierBinded() {
    this.sharedService
      .materialCarrierBinded(this.processId, this.poData?.po_id, 'output')
      .subscribe((resp: any) => {
        this.binsCount = resp.data.length;
      });
  }

  printLabel() {
    this.isScrapFromLabelPrinting = true;

    const reqObj = {
      totalBins: this.binsCount,
      poNumber: this.poData?.po_number,
      sachNumber: this.poData?.sach_number,
      poQuantity: this.elementCount,
    };
    this.sharedService
      .labelPrinting(this.machineId, this.poData?.po_id, reqObj)
      .subscribe((res: any) => {
        this.appStorage.set('PREVIOUS_PO_DATA', {
          po_id: this.poData.po_id,
          sach_id: this.poData.sach_id,
          ls_id: this.poData.ls_id,
          po_number: this.poData.po_number,
          sach_number: this.poData.sach_number,
          target_quantity: this.poData.target_quantity,
        });
        this.appStorage.clear('TEM_ELEMENT_COUNT');
        this.router.navigate(['op/wd/scrap-booking']);
      });
  }
}
