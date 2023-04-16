import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from './../../Shared/shared-model';
import { SharedService } from './../../Shared/shared.service';
import { Subscription } from 'rxjs';
import { DemaskDeburringService } from './../demask-deburring.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RfidService } from 'src/app/rfid.service';

@Component({
  selector: 'app-dd-output-metal-trays',
  templateUrl: './dd-output-metal-trays.component.html',
  styleUrls: ['./dd-output-metal-trays.component.scss'],
})
export class DdOutputMetalTraysComponent implements OnInit {
  poData!: PO_DATA;
  allowedTrays: any[] = [];
  scannedTray: any[] = [];
  allScannedBins: any[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  totalBins!: number;
  scanned_bin: number = 0;
  isBtnDisabled: boolean = false;
  machineId!: any | null;
  processId!: number;
  trayInput: any;
  newAddedTray: any;
  rfId!: Subscription;
  error: string | null = null;

  constructor(
    private router: Router,
    private demaskDeburService: DemaskDeburringService,
    private sharedService: SharedService,
    private rfIdService: RfidService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.getAllowedBins();
    this.getTrayCarriers();
  }

  scanViaRfId() {
    this.rfId = this.rfIdService.tags.subscribe((wEpc: any) => {
      if (wEpc && wEpc.length) {
        this.checkScannedTray(wEpc);
      }
    });
  }

  getTrayCarriers() {
    this.demaskDeburService
      .getAlottedTrays(this.processId, this.poData?.po_id)
      .subscribe({
        next: (resp: any) => {
          this.scannedTray = resp.data;
        },
        error: (error) => {
          console.info(error);
        },
      });
  }

  getAllowedBins() {
    this.demaskDeburService.getAllowedBinsTrays(this.processId).subscribe({
      next: (resp: any) => {
        this.allowedTrays = resp.data;
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  startScanning() {
    this.isWrongBinScanned = true;
    this.isScanEnabled = true;
    this.isStartedScanning = true;
    this.isAlreadyBinScanned = false;
    this.scanViaRfId();
  }

  checkScannedTray(formatted: any) {
    const uniqueEpc = [...new Set(formatted.map((epc: any) => epc.EPC))];

    const isValid = uniqueEpc.some((wEpc: any) => {
      const isAllowed = this.allowedTrays.some(
        (wObj: any) => wObj.rfid_epc === wEpc
      );

      const isScanned = this.scannedTray.some(
        (wObj: any) => wObj.rfid_epc === wEpc
      );

      if (isAllowed && !isScanned) {
        this.newAddedTray = this.allowedTrays.find(
          (w: any) => w.rfid_epc === wEpc
        );
        this.scannedTray.push(this.newAddedTray);
        this.isBtnDisabled = true;
      }

      return isAllowed && !isScanned;
    });

    if (!isValid) {
      this.isWrongBinScanned = false;
      return;
    }
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
  }

  proceed() {
    this.machineId = this.appStorage.get('MACHINE_ID');

    const reqArraay = {
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      material_carrier_id: this.newAddedTray.id,
    };

    this.demaskDeburService.postOutputCarrierBin(reqArraay).subscribe({
      next: () => {
        this.sharedService.sentClickEventpoStageCompleted(
          'output-carrier-scan'
        );

        this.router.navigate(['op/dd/operations']);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  ngOnDestroy() {
    if (this.rfId) {
      this.rfId.unsubscribe();
    }
  }
}
