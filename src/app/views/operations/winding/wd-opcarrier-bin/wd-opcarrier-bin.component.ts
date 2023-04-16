import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { WindingService } from '../winding.service';

@Component({
  selector: 'app-wd-opcarrier-bin',
  templateUrl: './wd-opcarrier-bin.component.html',
  styleUrls: ['./wd-opcarrier-bin.component.scss'],
})
export class WdOPCarrierBinComponent implements OnInit {
  // @Input() po: any;
  machineId: any;
  @Input('windingOutputCarrier') isWindingOutputCarrier!: boolean;
  @Output() completeWindingReplaceBin = new EventEmitter();
  isStartedScanning: boolean = false;
  carrierBins: any = [];
  isScanEnabled: boolean = false;
  binsCount: number = 0;
  isProceed: boolean = false;
  isWrongBinScanned = false;
  allowedBins: any;
  poData!: PO_DATA;
  isFromWinding: any;
  isAlreadyScanned: boolean = false;
  processId!: any;
  alreadyScanned: any;
  scannedBins: any;
  latestBinsScanned: any;
  allScannedBins: any[] = [];
  constructor(
    private windingService: WindingService,
    private router: Router,
    private sharedService: SharedService,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('output-carrier');
    this.wsService.sendNode(
      this.windingService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
      true
    );

    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.getAllowedBins();
    this.materialCarrierBinded();
  }

  materialCarrierBinded() {
    this.sharedService
      .materialCarrierBinded(this.processId, this.poData.po_id, 'output')
      .subscribe((res: any) => {
        this.scannedBins = res.data.map((b: any) => ({
          ...b,
          is_checked: true,
        }));
      });
  }

  getAllowedBins() {
    this.sharedService.getAllowdBins(this.processId).subscribe((resp: any) => {
      this.allowedBins = resp.data;
    });
  }

  startScanning() {
    this.isScanEnabled = true;
    this.isStartedScanning = true;
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
  }

  checkScannedBin(binValue: any) {
    this.isWrongBinScanned = false;
    this.isAlreadyScanned = false;
    const scannedBins = this.allowedBins?.filter(
      (element: any) => element.name == binValue
    );
    if (scannedBins?.length) {
      this.isProceed = true;
    }
    if (!scannedBins.length) {
      this.isWrongBinScanned = true;
    }

    this.alreadyScanned = this.carrierBins.filter(
      (element: any) => element.name == binValue
    );
    if (this.alreadyScanned && this.alreadyScanned.length) {
      this.isAlreadyScanned = true;
    }

    this.isScanEnabled = false;
    this.isStartedScanning = false;

    this.scannedBins = [...this.scannedBins, ...scannedBins].map((b: any) => ({
      ...b,
      is_checked: true,
    }));
    this.allowedBins.map((record: any, index: number) => {
      if (record.name == binValue && !this.isAlreadyScanned) {
        // this.scannedBins.push(record);
        this.latestBinsScanned = record.id;
        this.isProceed = true;
      }
      this.isScanEnabled = false;
    });
  }

  // checkScannedBin(binValue: any) {
  //   this.scannedBins.map((res: any) => {
  //     if (res.name == binValue) {
  //       this.isAlreadyScanned = true;
  //     }
  //   });
  //   this.allScannedBins.map((res: any) => {
  //     if (res.name == binValue) {
  //       this.isAlreadyScanned = true;
  //     }
  //   });
  //   this.allowedBins.map((record: any, index: number) => {
  //     if (record.name == binValue && !this.isAlreadyScanned) {
  //       this.scannedBins.push(record);
  //       this.latestBinsScanned = record.id;
  //       this.isProceed = true;
  //     }
  //     this.isScanEnabled = false;
  //   });
  //   const allBins = this.allowedBins.map((ele: any) => ele.name);
  //   this.isWrongBinScanned = allBins.includes(binValue);
  // }

  addbin() {
    const reqObj = {
      material_carrier_id: this.latestBinsScanned,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
    };

    this.sharedService.postBins(reqObj).subscribe((res: any) => {
      if (res.status != 'error') {
        this.binsCount = this.carrierBins.length;
        this.isStartedScanning = true;
        // this.getOutputCarrier();
        this.ProceedToCompleteOutputCarrierBin();
      }
    });
  }

  ProceedToCompleteOutputCarrierBin() {
    this.isStartedScanning = false;
    this.router.navigate(['op/wd/winding']);
  }
}
