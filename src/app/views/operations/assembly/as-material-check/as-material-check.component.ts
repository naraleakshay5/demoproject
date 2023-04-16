import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { AssemblyBox, poData } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-material-check',
  templateUrl: './as-material-check.component.html',
  styleUrls: ['./as-material-check.component.scss'],
})
export class AsMaterialCheckComponent implements OnInit {
  isLoading: boolean = false;
  is_scanned: boolean = false;
  wicPoData!: PO_DATA;
  material: AssemblyBox[] = [];
  scannedMaterial: AssemblyBox[] = [];
  isWrongBinScanned: boolean = true;
  isAlreadyBinScanned: boolean = false;
  isScanEnabled: boolean = false;
  machineId: any;
  processId: any;
  is_wait: boolean = false;
  is_wrong: boolean = false;

  constructor(
    private router: Router,
    private assemblyService: AssemblyService,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.wicPoData = this.appStorage.get('WIC_PO_DATA');

    this.getMaterialsBox();
  }

  getMaterialsBox() {
    this.assemblyService
      .material(this.wicPoData.sach_id, 'BOX')
      .subscribe((res: any) => {
        this.material = res.data.map((key: any) => ({
          ...key,
          scanned_id: '',
          is_scan: false,
        }));
      });
  }

  // this code for 2D scanner use in future

  // startScan() {
  //   this.isWrongBinScanned = true;
  //   this.isScanEnabled = true;
  //   this.isAlreadyBinScanned = false;
  //   this.is_scanned = true;

  // IMP code currently i used dummy code

  // this.isLoading = true;
  // setInterval(() => {
  //   this.material = this.material.map((ele: any) => {
  //     ele.scanned_id = ele.material_code;
  //     ele.is_scan = true;
  //     return ele;
  //   });
  //   this.isLoading = false;
  //   this.is_scanned = true;
  // }, 5000);
  // }

  // checkScannedBin(binValue: any) {
  //   this.material = this.material.map((ele: any) => {
  //     if (ele.material_code == binValue && ele.is_scan === true) {
  //       this.isAlreadyBinScanned = true;
  //     } else if (ele.material_code == binValue && ele.is_scan === false) {
  //       ele.scanned_id = ele.material_code;
  //       ele.is_scan = true;
  //       this.scannedMaterial.push(ele);
  //     } else {
  //       const allBins = this.material.map((ele: any) => ele.material_id);
  //       this.isWrongBinScanned = allBins.includes(binValue);
  //     }
  //     return ele;
  //   });
  //   this.isScanEnabled = false;
  // }

  // cancelScan() {
  //   this.isScanEnabled = false;
  // }

  proceed() {
    if (this.appStorage.get('IS_SCAN_CAN_BOX')) {
      this.router.navigate(['op/as/operation']);
      this.appStorage.clear('IS_SCAN_CAN_BOX');
    } else {
      this.router.navigate(['op/as/lead-wire-scanning']);
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
      type_id: 6,
      sach_id: this.wicPoData.sach_id,
      type: 'BOX',
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
        this.material = this.material.map((ele: any) => {
          res.data.scanned_entities.forEach((e: any) => {
            if (ele.material_code == e.code) {
              ele.scanned_id = ele.material_code;
              ele.is_scan = true;
              this.scannedMaterial.push(ele);
              this.isLoading = false;
            }
          });
          return ele;
        });
      }
    });
  }
}
