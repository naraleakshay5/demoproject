import { RfidService } from './../../../../rfid.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { poData } from '../tempering-model';
import { TemperingService } from '../tempering.service';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-tem-loading-trolleys',
  templateUrl: './tem-loading-trolleys.component.html',
  styleUrls: ['./tem-loading-trolleys.component.scss'],
})
export class TemLoadingTrolleysComponent implements OnInit {
  poData!: poData;
  machineId!: number;
  processId!: number;
  rfId!: Subscription;

  loadedTrolley: any[] = [];
  isTrolleyReceived: boolean = false;
  po_ids: any[] = [];
  trolleyFound: boolean = false;
  allowedTrolleys: any;
  newTrolley: any = null;
  trolley: any;

  constructor(
    private router: Router,
    private temperingService: TemperingService,
    private appStorage: AppStorage,
    private rfIdService: RfidService
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.trolley = this.appStorage.get('SCANNED_TROLLEY_AND_TRAYS');

    this.getAllowedTrolleys();

    this.rfId = this.rfIdService.tags.subscribe((wEpc: any) => {
      if (wEpc && wEpc.length && !this.trolleyFound) {
        this.trolleyFound = true;
        this.validateScannedTrolley(wEpc);
      }
    });
  }

  getAllowedTrolleys() {
    this.temperingService
      .getAllowedTrolleys(this.processId)
      .subscribe((resp: any) => {
        this.allowedTrolleys = resp.data;
      });
  }

  validateScannedTrolley(formatted: any) {
    const uniqueEpc = [...new Set(formatted.map((epc: any) => epc.EPC))];

    const isValid = uniqueEpc.some((wEpc: any) => {
      const isAllowed = this.allowedTrolleys.some(
        (wObj: any) => wObj.rfid_epc === wEpc
      );

      if (isAllowed) {
        this.newTrolley = this.allowedTrolleys.find(
          (w: any) => w.rfid_epc === wEpc
        );
      }
      return isAllowed;
    });

    if (isValid && this.newTrolley) {
      this.isTrolleyReceived = true;
      this.loadedTrolley = [this.newTrolley];
      this.loadedTrolley = this.loadedTrolley.map((ele: any) => {
        ele.scanned_id = ele.name;
        ele.is_scan = true;
        return ele;
      });
    }
  }

  proceed() {
    this.router.navigate(['op/tmp/recipe-setup']);
  }

  ngOnDestroy() {
    if (this.rfId) {
      this.rfId.unsubscribe();
    }
  }
}

export interface Trolley {
  id: number;
  trolley_id: number;
  epc: string;
}

export class Trolley {
  id: number = 0;
  trolley_id: number = 0;
  epc: string = '';
}
