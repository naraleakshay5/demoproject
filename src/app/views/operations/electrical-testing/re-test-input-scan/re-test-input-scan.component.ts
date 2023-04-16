import { SharedService } from './../../Shared/shared.service';
import { ElTestingService } from './../el-testing.service';
import { WebsocketService } from 'src/app/websocket.service';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-re-test-input-scan',
  templateUrl: './re-test-input-scan.component.html',
  styleUrls: ['./re-test-input-scan.component.scss'],
})
export class ReTestInputScanComponent implements OnInit {
  poId: any;
  scannedBins: any[] = [];
  allScannedBins: any[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  isStartedScanning: boolean = false;
  totalBins!: number;
  scanned_bin: number = 0;
  is_btnDisabled: boolean = false;
  allowedBins: any[] = [];
  isScannedSuccess: boolean = false;
  isOpen: boolean = false;
  irRejectedCount!: number;
  capRejectedCount!: number;
  tanD1kRejectedCount!: number;
  tanD10k100KRejectedCount!: number;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private wsService: WebsocketService,
    private testingService: ElTestingService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // kept for further discussion
    // this.irRejectedCount = this.appStorage.get('IR_COUNT');
    // this.capRejectedCount = this.appStorage.get('CAP_COUNT');
    // this.tanD1kRejectedCount = this.appStorage.get('TAN_D_1K_COUNT');
    // this.tanD10k100KRejectedCount = this.appStorage.get('TAN_D_10K_100K_COUNT');

    this.materialCarrierBinded();
  }

  materialCarrierBinded() {
    const localStorageBins = this.appStorage.get('REJECTED_ARRAY');
    const bins = localStorageBins.filter((b: any) => b.value > 0);
    this.allowedBins = bins;
    this.scannedBins = bins.map((key: any) => ({
      ...key,
      scanned_bin: '',
      is_checked: false,
    }));

    this.totalBins = this.allowedBins.length;
  }

  startScanning() {
    this.isWrongBinScanned = true;
    this.isAlreadyBinScanned = false;
    this.isOpen = true;
  }

  cancelScan() {
    this.isScanEnabled = false;
    this.isStartedScanning = false;
    this.isOpen = false;
  }

  closeOpen() {
    this.isOpen = false;
  }

  checkScannedBins(binValue: any) {
    this.isOpen = false;
    let scanCount = 0;
    this.scannedBins = this.scannedBins.map((record: any, index: number) => {
      if (record.binName == binValue && record.is_checked == false) {
        record.scanned_bin = binValue;
        record.is_checked = true;
        this.scanned_bin++;
        scanCount = 1;
      } else if (record.binName == binValue && record.is_checked == true) {
        this.isAlreadyBinScanned = true;
      }
      return record;
    });

    setTimeout(() => {
      if (scanCount == 1) {
        this.isOpen = true;
      }
    }, 500);

    if (this.scanned_bin == this.totalBins) {
      this.is_btnDisabled = true;
      return;
    }
    const allBins = this.allowedBins.map((ele: any) => ele.name);
    this.isWrongBinScanned = allBins.includes(binValue);
  }

  proceed() {
    // kept for further  discussion
    // if (this.irRejectedCount != 0) {
    //   this.wsService.sendNode(
    //     this.testingService.machineInterlocks.PROC_INTL_IR_RESET_COUNT,
    //     true
    //   );
    // }
    // if (this.capRejectedCount != 0) {
    //   this.wsService.sendNode(
    //     this.testingService.machineInterlocks.PROC_INTL_CAP_RESET_COUNT,
    //     true
    //   );
    // }
    // if (this.tanD1kRejectedCount != 0) {
    //   this.wsService.sendNode(
    //     this.testingService.machineInterlocks.PROC_INTL_TAN_D_1K_RESET_COUNT,
    //     true
    //   );
    // }
    // if (this.tanD10k100KRejectedCount != 0) {
    //   this.wsService.sendNode(
    //     this.testingService.machineInterlocks
    //       .PROC_INTL_TAN_D_10K_100k_RESET_COUNT,
    //     true
    //   );
    // }

    // this.wsService.sendNode(
    //   this.testingService.machineInterlocks.PROC_INTL_GOOD_COUNT_RESET,
    //   true
    // );
    this.wsService.sendNode(
      this.testingService.machineInterlocks.PROC_INTL_COUNT_RESET,
      true
    );
    this.wsService.sendNode(
      this.testingService.machineInterlocks.PROC_INTL_COUNT_RESET,
      false
    );
    this.sharedService.sentClickEventpoStageCompleted('retest-ip-carrier-scan');
    this.router.navigate(['op/el/re-test']);
  }
}
