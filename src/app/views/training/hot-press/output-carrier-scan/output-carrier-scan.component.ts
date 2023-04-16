import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { allowedBin } from 'src/app/views/operations/hot-press/hot-press-model';
import { HotPressService } from 'src/app/views/operations/hot-press/hot-press.service';
import { PO_DATA } from 'src/app/views/operations/Shared/shared-model';
import { SharedService } from 'src/app/views/operations/Shared/shared.service';
import { environment } from 'src/environments/environment.demo';
@Component({
  selector: 'app-output-carrier-scan',
  templateUrl: './output-carrier-scan.component.html',
  styleUrls: ['./output-carrier-scan.component.scss'],
})
export class OutputCarrierScanComponent implements OnInit {
  poData!: PO_DATA;
  isProceed: boolean = false;
  allowedBins: allowedBin[] = [];

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
  environment: any;
  scannedBins: any[] = [
    {
      name: 'N_DC-AUTO_WDG_BIN_010',
    },
    {
      name: 'N_DC-AUTO_WDG_BIN_011',
    },
  ];
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private hotPressService: HotPressService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.environment = environment;
    this.appStorage.set('TEM_LAST_URL', 'output-carrier-scan');
    this.operationalsLogs = this.appStorage.getOperationalLogs();
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
    // this.sharedService
    //   .materialCarrierBinded(this.processId, this.poData.po_id, 'output')
    //   .subscribe((res: any) => {
    //     this.scannedBins = res.data;
    //     this.isBtnDisabled = this.scannedBins?.length !== 0 ? true : false;
    //     this.usedPreviousBin = this.scannedBins?.length !== 0 ? false : true;
    //   });
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
    this.isProceed = true;
    // const reqObj = {
    //   material_carrier_id: this.latestBinsScanned,
    //   production_order_id: this.poData.po_id,
    //   process_id: this.processId,
    //   machine_id: this.machineId,
    // };

    // this.sharedService.postBins(reqObj).subscribe((res: any) => {
    //   this.isProceed = true;
    // });
  }

  CompletedPo() {
    this.router.navigate(['training/hot-press/scrap-booking']);
    // alert('complate the po');
    // this.router.navigate(['training//hot-press/hotPress']);
    // const lastUrl = this.appStorage.get('TEM_LAST_URL');
    // if (lastUrl) {
    //   this.router.navigate(['training/hot-press/' + lastUrl]);
    // } else {
    //   this.router.navigate(['training/hot-press/offline-pre-press']);
    // }
  }

  remBin() {
    this.router.navigate(['training/hot-press/ip-carrier-scan']);
    // , {
    //   queryParams: { remaining_trays: true },
    // });
  }

  onItemChange(event: any) {
    let value = event;
    this.isProceed = this.yes = value === 'yes';
    this.isBtnDisabled = this.no = value === 'no';
    this.usedPreviousBin = this.no = value === 'no';
  }
}
