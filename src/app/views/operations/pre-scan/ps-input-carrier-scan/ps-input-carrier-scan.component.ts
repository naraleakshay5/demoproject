import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreScanService } from '../pre-scan.service';
import { bin } from '../pre-scan-model';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-ps-input-carrier-scan',
  templateUrl: './ps-input-carrier-scan.component.html',
  styleUrls: ['./ps-input-carrier-scan.component.scss'],
})
export class PsInputCarrierScanComponent implements OnInit {
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
    private preScanService: PreScanService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.poId = this.route.snapshot.queryParamMap.get('poId');
    this.processId = localStorage.getItem('PROCESS_ID');
    this.poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(this.poData);

    this.materialCarrierBinded();

    // this.sharedService.getClickEventpoStageCompleted().subscribe({
    //   next: (change) => {
    //     this.router.navigate(['/po-list']);
    //   },
    // });
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
    this.sharedService.sentClickEventpoStageCompleted('ip-carrier-scan-hp');
    setTimeout(() => {
      this.router.navigate(['/po-list']);
    }, 1000);
  }
}
