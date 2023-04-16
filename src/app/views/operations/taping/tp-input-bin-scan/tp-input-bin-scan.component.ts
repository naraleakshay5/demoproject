import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-tp-input-bin-scan',
  templateUrl: './tp-input-bin-scan.component.html',
  styleUrls: ['./tp-input-bin-scan.component.scss'],
})
export class TpInputBinScanComponent implements OnInit {
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
  processId: any | null;
  poData: any;
  allowedBins: any[] = [];
  isScannedSuccess: boolean = false;
  isOpen: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.poId = this.route.snapshot.queryParamMap.get('poId');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.poData = this.appStorage.get('PO_DATA');

    this.materialCarrierBinded();
  }

  materialCarrierBinded() {
    this.sharedService
      .materialCarrierBinded(this.processId, this.poData.po_id, 'input')
      .subscribe((res: any) => {
        this.allowedBins = res.data;
        this.scannedBins = res.data.map((key: any) => ({
          ...key,
          scanned_bin: '',
          is_checked: false,
        }));
        this.totalBins = this.allowedBins.length;
      });
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
      if (record.name == binValue && record.is_checked == false) {
        record.scanned_bin = binValue;
        record.is_checked = true;
        this.scanned_bin++;
        scanCount = 1;
      } else if (record.name == binValue && record.is_checked == true) {
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
    }
    const allBins = this.allowedBins.map((ele: any) => ele.name);
    this.isWrongBinScanned = allBins.includes(binValue);
  }

  proceed() {
    // this.sharedService.sentClickEventpoStageCompleted('ip-carrier-scan-hp');
    const lastPoData = this.appStorage.get('LAST_PO_DATA');
    if (lastPoData?.sach_number === this.poData.sach_number) {
      this.router.navigate(['op/tp/online-resto']);
    } else {
      this.router.navigate(['op/tp/kardex-resto']);
    }
  }
}
