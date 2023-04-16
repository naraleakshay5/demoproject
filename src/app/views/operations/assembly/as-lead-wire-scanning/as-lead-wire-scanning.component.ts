import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-lead-wire-scanning',
  templateUrl: './as-lead-wire-scanning.component.html',
  styleUrls: ['./as-lead-wire-scanning.component.scss'],
})
export class AsLeadWireScanningComponent implements OnInit {
  isLoading: boolean = false;
  is_scanned: boolean = false;

  Reel = [
    { name: 'LH', is_scan: false, scanned_id: '' },
    { name: 'RH', is_scan: false, scanned_id: '' },
  ];

  lead_wire: any[] = [];
  scannedReels: any[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  scanned_reel!: string | null;
  wicPoData!: PO_DATA;
  processId: any;
  machineId: any;
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
    this.wicPoData = this.appStorage.get('WIC_PO_DATA');
    this.getMaterialsLeadWire();
  }

  getMaterialsLeadWire() {
    this.assemblyService
      .material(this.wicPoData.sach_id, 'LEAD_WIRE')
      .subscribe((res: any) => {
        this.lead_wire = res.data;
      });
  }

  // this code for 2D scanner use in future

  // startScan() {
  //   this.isWrongBinScanned = true;
  //   this.isScanEnabled = true;
  //   this.isAlreadyBinScanned = false;
  // }

  // checkScannedBin(binValue: any) {
  //   this.isWrongBinScanned = this.lead_wire.some(
  //     (ele: any) => ele.material_code
  //   );
  //   if (this.isWrongBinScanned) {
  //     this.Reel = this.Reel.map((ele: any) => {
  //       if (ele.scanned_id == binValue && ele.is_scan === true) {
  //         this.isAlreadyBinScanned = true;
  //       } else {
  //         this.scanned_reel = binValue;
  //       }
  //       return ele;
  //     });
  //   }

  //   this.isScanEnabled = false;
  // }

  // cancelScan() {
  //   this.isScanEnabled = false;
  // }

  scannedReel(name: any) {
    this.Reel = this.Reel.map((ele: any) => {
      if (
        name == ele.name &&
        this.scanned_reel != '' &&
        this.scanned_reel != null
      ) {
        ele.scanned_id = this.scanned_reel;
        ele.is_scan = true;
        this.scannedReels.push(ele);
      }
      return ele;
    });
  }

  proceed() {
    this.assemblyService.sentClickEventpoStageCompleted(
      'material-check',
      this.wicPoData.po_id
    );

    if (this.appStorage.get('IS_SCAN_LEAD_WIRE')) {
      this.router.navigate(['op/as/operation']);
      this.appStorage.clear('IS_SCAN_LEAD_WIRE');
    } else {
      this.router.navigate(['op/as/recipe-setup']);
    }
  }

  createJob() {
    this.is_wait = false;
    this.is_wrong = false;
    this.isLoading = true;
    this.is_scanned = true;

    const reqBody = {
      machine_id: this.machineId,
      process_id: this.processId,
      po_id: this.wicPoData.po_id,
      type_id: 5,
      sach_id: this.wicPoData.sach_id,
      type: 'LEAD_WIRE',
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
        this.Reel = this.Reel.map((ele: any) => {
          res.data.scanned_entities.forEach((e: any) => {
            ele.scanned_id = e.code;
            ele.is_scan = true;
            this.scannedReels.push(ele);
            this.isLoading = false;
          });
          return ele;
        });
      }
    });
  }
}
