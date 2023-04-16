import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from './../../Shared/shared-model';
import { SharedService } from './../../Shared/shared.service';
import { DemaskDeburringService } from './../demask-deburring.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dd-label-printing',
  templateUrl: './dd-label-printing.component.html',
  styleUrls: ['./dd-label-printing.component.scss'],
})
export class DdLabelPrintingComponent implements OnInit {
  elementCount!: number;
  trayCount!: number;
  temperature!: number;
  poData!: PO_DATA;
  machineId: any;

  processId!: any;
  trayDetails: any;

  constructor(
    private router: Router,
    private demaskDeburService: DemaskDeburringService,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.getTrayDetails();
    this.getTemperatureDetails();
  }

  getTrayDetails() {
    this.demaskDeburService
      .getWheelDetails(this.processId, this.poData?.po_id)
      .subscribe({
        next: (resp: any) => {
          this.trayDetails = resp.data;
          this.trayCount = this.trayDetails.length;
        },
        error: (error) => {
          console.info(error);
        },
      });
  }

  getTemperatureDetails() {
    this.processId = this.appStorage.get('PROCESS_ID');

    this.demaskDeburService
      .getTemperatureDetails(this.poData?.sach_id, this.processId)
      .subscribe({
        next: (resp: any) => {
          this.temperature = resp.data;
        },
        error: (error) => {
          console.info(error);
        },
      });
  }

  printLabel() {
    this.machineId = this.appStorage.get('MACHINE_ID');

    this.demaskDeburService
      .printLabels(
        this.machineId,
        this.poData?.po_id,
        this.poData?.po_number,
        this.poData?.sach_number,
        +this.poData?.target_quantity,
        this.trayDetails?.temperature,
        this.trayDetails?.trayCount
      )
      .subscribe({
        next: () => {
          this.sharedService.sentClickEventpoStageCompleted('label-printing');
          this.router.navigate(['op/dd/scrap-booking']);
        },
        error: (error) => {
          console.info(error);
        },
      });
  }
}
