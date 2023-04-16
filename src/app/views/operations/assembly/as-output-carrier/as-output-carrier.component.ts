import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { poData } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-output-carrier',
  templateUrl: './as-output-carrier.component.html',
  styleUrls: ['./as-output-carrier.component.scss'],
})
export class AsOutputCarrierComponent implements OnInit {
  curingPoData!: PO_DATA;
  is_proceed: boolean = false;
  allowedBins: any[] = [];
  scannedBins: any[] = [];
  allScannedBins: any[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  totalBins!: number;
  scanned_bin: number = 0;
  is_btnDisabled: boolean = false;
  machineId!: any | null;
  processId: any;
  latestBinsScanned: any;

  isLoading: boolean = false;
  is_scanned: boolean = false;
  is_wait: boolean = false;
  is_wrong: boolean = false;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private assemblyService: AssemblyService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.curingPoData = this.appStorage.get('CURING_PO_DATA');

    this.getAllowedBins();
    this.materialCarrierBinded();
  }

  materialCarrierBinded() {
    this.sharedService
      .materialCarrierBinded(this.processId, this.curingPoData.po_id, 'output')
      .subscribe((res: any) => {
        this.scannedBins = res.data.filter(
          (ele: any) => ele.carrier_type === 'BIN'
        );
      });
  }

  getAllowedBins() {
    this.sharedService.getAllowdBins(this.processId).subscribe((res: any) => {
      this.allowedBins = res.data;
    });
  }

  startScanning() {
    this.isWrongBinScanned = true;
    this.isScanEnabled = true;
    this.isAlreadyBinScanned = false;
  }

  // this code for 2D scanner use in future

  // checkScannedBin(binValue: any) {
  //   this.scannedBins.map((res: any) => {
  //     if (res.name == binValue) {
  //       this.isAlreadyBinScanned = true;
  //     }
  //   });
  //   this.allScannedBins?.map((res: any) => {
  //     if (res.name == binValue) {
  //       this.isAlreadyBinScanned = true;
  //     }
  //   });
  //   this.allowedBins.forEach((record: any, index: number) => {
  //     if (record.name == binValue && !this.isAlreadyBinScanned) {
  //       this.scannedBins.push(record);
  //       this.latestBinsScanned = record.id;
  //       this.is_btnDisabled = true;
  //     }
  //     this.isScanEnabled = false;
  //   });
  //   const allBins = this.allowedBins.map((ele: any) => ele.name);
  //   this.isWrongBinScanned = allBins.includes(binValue);
  // }

  // cancelScan() {
  //   this.isScanEnabled = false;
  // }

  proceed() {
    const reqObj = {
      material_carrier_id: this.latestBinsScanned,
      production_order_id: this.curingPoData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
    };

    this.sharedService.postBins(reqObj).subscribe((res: any) => {
      this.router.navigate(['op/as/operation']);

      localStorage.setItem(
        'TOTAL_OUTPUT_BINS_SCANNED',
        JSON.stringify(this.scannedBins?.length)
      );
    });
  }

  createJob() {
    this.is_wait = false;
    this.is_wrong = false;
    this.curingPoData = this.appStorage.get('CURING_PO_DATA');
    const reqBody = {
      machine_id: this.machineId,
      process_id: this.processId,
      po_id: this.curingPoData.po_id,
      type_id: 4,
    };
    this.assemblyService.job(reqBody).subscribe((res: any) => {
      this.appStorage.set('SCANNING_JOB_ID', res.data[0].id);
    });
  }

  completeJob() {
    this.is_wait = false;
    this.is_wrong = false;
    const jobId = this.appStorage.get('SCANNING_JOB_ID');
    this.assemblyService.completeJob(jobId).subscribe((res: any) => {
      if (res.data.errorCode == 1) {
        this.is_wait = true;
      } else if (res.data.errorCode == 2) {
        this.is_wait = true;
        this.is_wrong = true;
      } else {
        res.data.scanned_entities.forEach((ele: any) => {
          this.allowedBins.forEach((record: any, index: number) => {
            if (record.name == ele.code) {
              this.scannedBins.push(record);
              this.latestBinsScanned = record.id;
              this.is_btnDisabled = true;
              this.isLoading = true;
            }
          });
        });
      }
    });
  }
}
