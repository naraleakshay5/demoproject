import { AoiSupervisorService } from '../../aoi-supervisor.service';
import { PO_DATA } from '../../../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aoi-supervisor-checkout-flow',
  templateUrl: './aoi-supervisor-checkout-flow.component.html',
  styleUrls: ['./aoi-supervisor-checkout-flow.component.scss'],
})
export class AoiSupervisorCheckoutFlowComponent implements OnInit {
  poData!: PO_DATA;
  noOfGoodBoxes!: number;
  noOfGoodElement!: number;
  machineId!: number;
  processId!: number;

  constructor(
    private appStorage: AppStorage,
    private router: Router,
    private aoiSupervisorService: AoiSupervisorService
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.getBins();
  }

  getBins() {
    this.aoiSupervisorService.getGoodBins(this.poData?.po_id).subscribe({
      next: (resp: any) => {
        this.noOfGoodBoxes = resp.data;
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  proceed() {
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.aoiSupervisorService
      .postCheckout(this.processId, this.machineId, this.poData?.po_id)
      .subscribe({
        error: (error) => {
          console.info(error);
        },
      });
    this.router.navigate(['/aoi-sup/data/']);
  }
}
