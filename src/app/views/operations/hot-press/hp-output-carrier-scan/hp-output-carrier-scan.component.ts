import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotPressService } from '../hot-press.service';
import { allowedBin } from '../hot-press-model';
import { SharedService } from '../../Shared/shared.service';
import { PO_DATA } from '../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-hp-output-carrier-scan',
  templateUrl: './hp-output-carrier-scan.component.html',
  styleUrls: ['./hp-output-carrier-scan.component.scss'],
})
export class HpOutputCarrierScanComponent implements OnInit {
  poData!: PO_DATA;
  isProceed: boolean = false;
  allowedBins: allowedBin[] = [];
  scannedBins: any[] = [];
  allScannedBins: any[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  totalBins!: number;
  scanned_bin: number = 0;
  isBtnDisabled: boolean = false;
  usedPreviousBin: boolean = true;
  machineId!: any | null;
  processId: any;
  latestBinsScanned: any;
  yes: boolean = false;
  no: boolean = false;
  operationalsLogs: any[] = [];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private hotPressService: HotPressService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.operationalsLogs = this.appStorage.getOperationalLogs();
    this.sharedService.sentClickEventpoStageCompleted('output-carrier-scan');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.getAllowedBins();
    this.materialCarrierBinded();
  }

  getAllowedBins() {
    this.sharedService.getAllowdBins(this.processId).subscribe((res: any) => {
      this.allowedBins = res.data;
    });
  }

  materialCarrierBinded() {
    this.sharedService
      .materialCarrierBinded(this.processId, this.poData.po_id, 'output')
      .subscribe((res: any) => {
        this.scannedBins = res.data;
        this.isBtnDisabled = this.scannedBins?.length !== 0 ? true : false;
        this.usedPreviousBin = this.scannedBins?.length !== 0 ? false : true;
      });
  }

  startScanning() {
    this.isWrongBinScanned = true;
    this.isScanEnabled = true;
    this.isStartedScanning = true;
    this.isAlreadyBinScanned = false;
  }

  checkScannedBin(binValue: any) {
    this.scannedBins.map((res: any) => {
      if (res.name == binValue) {
        this.isAlreadyBinScanned = true;
      }
    });
    this.allScannedBins.map((res: any) => {
      if (res.name == binValue) {
        this.isAlreadyBinScanned = true;
      }
    });

    this.allowedBins.map((record: any, index: number) => {
      if (record.name == binValue && !this.isAlreadyBinScanned) {
        this.scannedBins.push(record);
        this.latestBinsScanned = record.id;
        this.isBtnDisabled = true;
      }
      this.isScanEnabled = false;
    });
    if (this.isAlreadyBinScanned) return;
    const allBins = this.allowedBins.map((ele: any) => ele.name);
    this.isWrongBinScanned = allBins.includes(binValue);
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
  }
  proceed() {
    const reqObj = {
      material_carrier_id: this.latestBinsScanned,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
    };

    this.sharedService.postBins(reqObj).subscribe((res: any) => {
      this.isProceed = true;
    });
  }

  CompletedPo() {
    this.router.navigate(['op/hp/scrap-booking']);
  }

  remTrays() {
    this.router.navigate(['op/hp/recipe-setup'], {
      queryParams: { remaining_trays: true },
    });
  }

  onItemChange(event: any) {
    let value = event;
    this.isProceed = this.yes = value === 'yes';
    this.isBtnDisabled = this.no = value === 'no';
    this.usedPreviousBin = this.no = value === 'no';
  }
}
