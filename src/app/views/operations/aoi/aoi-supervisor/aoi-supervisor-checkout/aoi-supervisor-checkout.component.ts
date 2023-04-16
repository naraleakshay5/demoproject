import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { SharedService } from '../../../Shared/shared.service';

@Component({
  selector: 'app-aoi-supervisor-checkout',
  templateUrl: './aoi-supervisor-checkout.component.html',
  styleUrls: ['./aoi-supervisor-checkout.component.scss'],
})
export class AoiSupervisorCheckoutComponent implements OnInit {
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
        this.poListProdPlan = resp.data.filter((po: any) => po.stage == 'DATA');
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  poStarted(data: any) {
    const poData = {
      po_id: data.production_order_id,
      sach_id: data.sach_id,
      lead_space: data.lead_space,
      ls_id: data.ls_id,
      po: data.po_number,
      sach: data.sach_number,
      quantity: data.target_quantity,
      ls: data.ls,
      box: data.box,
    };

    this.appStorage.set('PO_DATA', poData);
    this.router.navigate(['/aoi-sup/checkout-flow/']);
  }
}
