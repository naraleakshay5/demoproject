import { OfflineLineClearanceComponent } from './offline-line-clearance/offline-line-clearance.component';
import { OfflineScrapBookingComponent } from './offline-scrap-booking/offline-scrap-booking.component';
import { OfflineOutputCarrierScanComponent } from './offline-output-carrier-scan/offline-output-carrier-scan.component';
import { OfflineOperationsComponent } from './offline-operations/offline-operations.component';
import { OfflineInputCarrierScanComponent } from './offline-input-carrier-scan/offline-input-carrier-scan.component';
import { OfflineRecipeSetupComponent } from './offline-recipe-setup/offline-recipe-setup.component';
import { OfflineClearingComponent } from './offline-clearing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ip-carrier-scan',
    pathMatch: 'full',
  },
  {
    path: '',
    component: OfflineClearingComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'ip-carrier-scan',
        component: OfflineInputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'line-clearance',
        component: OfflineLineClearanceComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: OfflineRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'operations',
        component: OfflineOperationsComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'op-carrier-scan',
        component: OfflineOutputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: OfflineScrapBookingComponent,
        data: {
          title: '',
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfflineClearingRoutingModule {}
