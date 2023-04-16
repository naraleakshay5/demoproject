import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { SharedService } from '../../../Shared/shared.service';
import { AoiSupervisorService } from '../aoi-supervisor.service';

@Component({
  selector: 'app-aoi-data',
  templateUrl: './aoi-data.component.html',
  styleUrls: ['./aoi-data.component.scss'],
})
export class AoiDataComponent implements OnInit {
  poListProdPlan: any;

  intervalSubscription!: Subscription;
  interval: Observable<number> = timer(0, 5 * 1000);
  machineId!: number;
  processId!: number;

  constructor(
    private sharedService: SharedService,
    private appStorage: AppStorage,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.intervalSubscription = this.interval.subscribe(() => {
      this.getPoList();
    });
  }

  getPoList() {
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.sharedService.getPoList(this.machineId, this.processId).subscribe({
      next: (resp: any) => {
        this.poListProdPlan = resp.data.filter(
          (po: any) => po.stage == 'PROCESSOR'
        );
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  poStarted(data: any) {
    this.appStorage.set('PO_ID', data.production_order_id);
    this.router.navigate(['/aoi-sup/data-flow/']);
  }
}
