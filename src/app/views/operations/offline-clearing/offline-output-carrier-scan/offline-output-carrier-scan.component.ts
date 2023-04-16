import { PO_DATA } from './../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { OfflineClearingService } from './../offline-clearing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { RfidService } from 'src/app/rfid.service';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-offline-output-carrier-scan',
  templateUrl: './offline-output-carrier-scan.component.html',
  styleUrls: ['./offline-output-carrier-scan.component.scss'],
})
export class OfflineOutputCarrierScanComponent implements OnInit {
  poData!: PO_DATA;
  is_proceed: boolean = false;
  allowedTrays: any[] = [];
  scannedTray: any[] = [];
  allScannedBins: any[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  totalBins!: number;
  scanned_bin: number = 0;
  is_btnDisabled: boolean = false;
  machineId!: any | null;
  processId!: number;
  trayInput: any;
  newAddedTray: any;
  rfId!: Subscription;
  error: string | null = null;
  offlineClearingStarted!: boolean;

  constructor(
    private router: Router,
    private offlineService: OfflineClearingService,
    private sharedService: SharedService,
    private rfIdService: RfidService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.offlineClearingStarted = this.appStorage.get(
      'OFFLINE_CLEARING_STARTED'
    );

    this.getAllowedTrays();
    this.getTrayCarriers();
  }

  scanViaRfId() {
    this.rfId = this.rfIdService.tags.subscribe((wEpc: any) => {
      if (wEpc && wEpc.length) {
        this.checkScannedTray1(wEpc);
      }
    });
  }

  getTrayCarriers() {
    // this.offlineService
    //   .getAlottedTrays(this.processId, this.poData?.po_id)
    //   .subscribe((resp: any) => {
    //     this.scannedTray = resp.data;
    //   });
    const scannedTray = this.appStorage.get('SCANNED_TRAYS');
    // this.scannedTray = scannedTray != undefined ? scannedTray : 0;
    if (scannedTray != undefined) {
      this.scannedTray = scannedTray;
    } else {
      this.scannedTray = [];
    }
  }

  getAllowedTrays() {
    this.offlineService
      .getAllowedBinsTrays(this.processId)
      .subscribe((resp: any) => {
        this.allowedTrays = resp.data;
      });
  }

  startScanning() {
    this.isWrongBinScanned = true;
    this.isScanEnabled = true;
    this.isStartedScanning = true;
    this.isAlreadyBinScanned = false;
    this.scanViaRfId();
  }

  checkScannedTray1(formatted: any) {
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
        this.appStorage.set('SCANNED_TRAYS', this.scannedTray);
        this.is_btnDisabled = true;
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
    this.is_proceed = true;

    const reqArraay = {
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      material_carrier_id: this.newAddedTray.id,
    };

    this.offlineService
      .postOutputCarrierBin(reqArraay)
      .subscribe((resp: any) => {
        this.sharedService.sentClickEventpoStageCompleted(
          'output-carrier-scan'
        );

        this.router.navigate(['op/offline/operations']);
      });
  }

  ngOnDestroy() {
    this.rfId.unsubscribe();
  }
}
