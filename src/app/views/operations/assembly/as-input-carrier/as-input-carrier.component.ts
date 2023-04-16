import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { poData, tray } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-input-carrier',
  templateUrl: './as-input-carrier.component.html',
  styleUrls: ['./as-input-carrier.component.scss'],
})
export class AsInputCarrierComponent implements OnInit {
  isScanEnabled: boolean = false;
  isLoading: boolean = false;
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
    private assemblyService: AssemblyService,
    private sharedService: SharedService,
    private commonService: CommonService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.wicPoData = this.appStorage.get('WIC_PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.getTrays();

    this.commonService
      .getServerSentEvent('http://localhost:9999/my_endpoint')
      .subscribe((event: any) => {
        const eventData = event.data;

        if (eventData) {
          const formatted = JSON.parse(eventData);
          formatted.forEach((t: any) => {
            this.tray = this.tray.map((ele: any) => {
              if (t.EPC === ele.name) {
                ele.scanned_id = ele.name;
                ele.isScan = true;
                ele.isUsed = false;
                return ele;
              }
            });
            localStorage.setItem('METAL_TRAYS', JSON.stringify(this.tray));
            this.isLoading = false;
            this.is_scanned = true;
          });
        }
      });
  }

  getTrays() {
    this.sharedService
      .materialCarrierBinded(this.processId, this.wicPoData?.po_id)
      .subscribe((res: any) => {
        this.tray = res.data.filter((ele: any) => ele.carrier_type === 'TRAY');
        this.tray = this.tray.map((key: any) => ({
          ...key,
          isScan: false,
          isUsed: false,
        }));
      });
  }

  startScanning() {
    this.isLoading = true;
  }

  proceed() {
    this.router.navigate(['op/as/line-clearance']);
    this.assemblyService.sentClickEventpoStageCompleted(
      'ip-carrier',
      this.wicPoData.po_id
    );
  }

  createJob() {
    this.is_wait = false;
    this.is_wrong = false;
    this.isLoading = true;
    const reqBody = {
      machine_id: this.machineId,
      process_id: this.processId,
      po_id: this.wicPoData.po_id,
      type_id: 2,
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
        this.is_wrong = true;
      } else {
        // this code for 2D scanner use in future

        // const trays = res.data.scanned_data.scannedJob;
        // trays.forEach((ele: any) => {
        //   this.tray = this.tray.map((e: any) => {
        //     if (e.rfid_epc == ele.trayId) {
        //       e.isScan = true;
        //     }
        //     return e;
        //   });
        // });

        res.data.scanned_entities.forEach((ele: any) => {
          this.tray = this.tray.map((e: any) => {
            if (e.rfid_epc == ele.code) {
              e.isScan = true;
            }
            return e;
          });
        });
        this.trayScanned = this.tray.filter((ele: any) => ele.isScan == true);
        this.appStorage.set('METAL_TRAYS', this.trayScanned);

        this.isLoading = false;
        this.is_scanned = true;
      }
    });
  }
}
