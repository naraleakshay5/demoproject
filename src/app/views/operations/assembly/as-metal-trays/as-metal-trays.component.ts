import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { AppStorage } from 'src/app/storage.service';
import { environment } from 'src/environments/environment';
import { PO_DATA } from '../../Shared/shared-model';
import { tray } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-metal-trays',
  templateUrl: './as-metal-trays.component.html',
  styleUrls: ['./as-metal-trays.component.scss'],
})
export class AsMetalTraysComponent implements OnInit {
  isScanned: boolean = false;
  isLoading: boolean = false;
  trays: tray[] = [];
  machineId: any;
  wicPoData!: PO_DATA;
  processId: any;
  tray: tray[] = [];
  is_scanned: boolean = false;
  is_wait: boolean = false;
  is_wrong: boolean = false;
  trayScanned: tray[] = [];
  constructor(
    private router: Router,
    private commonService: CommonService,
    private appStorage: AppStorage,
    private assemblyService: AssemblyService
  ) {}

  ngOnInit(): void {
    this.wicPoData = this.appStorage.get('WIC_PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.trays = this.appStorage.get('METAL_TRAYS');
  }

  scan() {
    this.isLoading = true;
  }

  createJob() {
    this.isLoading = true;
    const reqBody = {
      machine_id: this.machineId,
      process_id: this.processId,
      po_id: this.wicPoData.po_id,
      type_id: 3,
      trays: this.trays.filter((ele: any) => ele.isUsed === false),
    };
    this.assemblyService.job(reqBody).subscribe((res: any) => {
      this.appStorage.set('SCANNING_ONE_JOB_ID', res.data[0].id);
    });
  }

  completeJob() {
    this.is_wait = false;
    this.is_wrong = false;
    const jobId = this.appStorage.get('SCANNING_ONE_JOB_ID');
    this.assemblyService.completeJob(jobId).subscribe((res: any) => {
      if (res.data.errorCode == 1) {
        this.is_wait = true;
      } else if (res.data.errorCode == 2) {
        this.is_wrong = true;
      } else {
        // this code for 2D scanner use in future

        // const trays = res.data.scanned_data.scannedJob;
        // trays.forEach((ele: any) => {
        //   this.trays = this.trays.map((e: any) => {
        //     if (e.rfid_epc == ele.trayId.toLowerCase()) {
        //       e.isUsed = true;
        //     }
        //     return e;
        //   });
        // });

        res.data.scanned_entities.forEach((ele: any) => {
          this.trays = this.trays.map((e: any) => {
            if (e.rfid_epc == ele.code.toLowerCase()) {
              e.isUsed = true;
            }
            return e;
          });
        });

        this.trayScanned = this.tray.filter((ele: any) => ele.isScan === false);
        this.isLoading = false;

        this.appStorage.set('METAL_TRAYS', this.trays);
      }
    });
  }

  proceed() {
    localStorage.setItem('METAL_TRAYS', JSON.stringify(this.trays));
    this.router.navigate(['op/as/operation']);
  }
}
