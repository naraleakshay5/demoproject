import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trolley } from '../tempering-model';
import { TemperingService } from '../tempering.service';
import { PO_DATA } from '../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-tem-input-trolleys',
  templateUrl: './tem-input-trolleys.component.html',
  styleUrls: ['./tem-input-trolleys.component.scss'],
})
export class TemInputTrolleysComponent implements OnInit {
  trolleyInput: any;
  isStartedScanning: boolean = false;
  machineId: any;
  poData!: PO_DATA;
  processId: any;
  is_scanned: boolean = false;
  trolley: trolley[] = [];
  po_ids: any[] = [];
  trolleys: any;
  trays: Tray[] = [];
  enableReCheckButton: boolean = false;
  toProceed: boolean = false;
  poIds: any;

  constructor(
    private router: Router,
    private temperingService: TemperingService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.getTrolley();
  }

  getTrolley() {
    this.temperingService
      .getAllPoIds(this.poData?.po_id)
      .subscribe((resp: any) => {
        this.trolleys = resp.data;
        this.poIds = this.trolleys.map((ele: any) => ele.production_order_id);
        this.appStorage.set('PO_IDS', this.poIds);

        this.setMultiplePoInProcess(this.poIds);
      });
  }

  setMultiplePoInProcess(poIds: any) {
    const record = poIds.map((key: any) => ({
      poId: key,
      processId: this.processId,
      machineId: this.machineId,
    }));

    this.temperingService.setMultiplePoInProces(record).subscribe({
      next: (resp: any) => {},
      error: (error) => {
        console.info(error);
      },
    });
  }

  proceed() {
    this.temperingService.sentClickEventpoStageCompleted(
      'ip-carrier-scan',
      this.poData.po_id
    );
    this.router.navigate(['op/tmp/loading-trolley']);
  }

  startScanning() {
    this.isStartedScanning = true;
    this.temperingService.createJob(this.poData?.trolley_id).subscribe({
      next: (resp: any) => {
        this.enableReCheckButton = true;
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  reCheck() {
    // kept for reuse
    // const record = this.poIds.map((key: any) => ({
    //   poId: key,
    //   processId: this.processId,
    //   trolleyId: this.trolleys[0].trolley_id,
    // }));

    this.temperingService
      .getAllTrolleyDetails(this.processId, this.trolleys[0].trolley_id)
      .subscribe({
        next: (resp: any) => {
          // this.trays = resp.data.trays;
          const scannedTrolleyAndTrays = resp.data;
          this.appStorage.set(
            'SCANNED_TROLLEY_AND_TRAYS',
            scannedTrolleyAndTrays
          );
          this.enableReCheckButton = false;
          this.is_scanned = true;
          this.toProceed = true;
        },
        error: (error) => {
          console.info(error);
          this.enableReCheckButton = true;
        },
      });
  }
}

export interface Tray {
  id: number;
  po: number;
  epc: string;
  name: string;
}
