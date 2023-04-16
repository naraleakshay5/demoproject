import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { poData } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-label-printing',
  templateUrl: './as-label-printing.component.html',
  styleUrls: ['./as-label-printing.component.scss'],
})
export class AsLabelPrintingComponent implements OnInit {
  elementCount!: any;
  binsCount: any;
  curingPoData!: PO_DATA;
  machineId: any;

  processId!: any;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private sharedService: SharedService,
    private assemblyService: AssemblyService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.curingPoData = this.appStorage.get('CURING_PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.binsCount = this.appStorage.get('TOTAL_OUTPUT_BINS_SCANNED');
    this.elementCount = this.appStorage.get('MACHINE_PART_COUNT');
  }

  printLabel() {
    const reqObj = {
      totalBins: this.binsCount,
      poNumber: this.curingPoData?.po_number,
      sachNumber: this.curingPoData?.sach_number,
      poQuantity: this.elementCount,
    };
    this.sharedService
      .labelPrinting(this.machineId, this.curingPoData?.po_id, reqObj)
      .subscribe((res: any) => {
        this.assemblyService.sentClickEventpoStageCompleted(
          'label-printing',
          this.curingPoData.po_id
        );
        this.router.navigate(['op/as/scrap-booking']);
        localStorage.removeItem('TOTAL_OUTPUT_BINS_SCANNED');
      });
  }
}
