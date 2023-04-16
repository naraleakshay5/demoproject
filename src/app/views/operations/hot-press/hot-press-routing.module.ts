import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import All Components

import { HotPressComponent } from './hot-press.component';
import { HpGrillSelectionComponent } from './hp-grill-selection/hp-grill-selection.component';
import { HpIPCarrierScanComponent } from './hp-ipcarrier-scan/hp-ipcarrier-scan.component';
import { HpOfflinePrePressComponent } from './hp-offline-pre-press/hp-offline-pre-press.component';
import { HpOperationComponent } from './hp-operation/hp-operation.component';
import { HpOutputCarrierScanComponent } from './hp-output-carrier-scan/hp-output-carrier-scan.component';
import { HpPreHeatingComponent } from './hp-pre-heating/hp-pre-heating.component';
import { HpProcessQualityCheckComponent } from './hp-process-quality-check/hp-process-quality-check.component';
import { HpRecipeSetupComponent } from './hp-recipe-setup/hp-recipe-setup.component';
import { HpScrapBookingComponent } from './hp-scrap-booking/hp-scrap-booking.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'offline-pre-press',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HotPressComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'ip-carrier-scan',
        component: HpIPCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'offline-pre-press',
        component: HpOfflinePrePressComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'grill-selection',
        component: HpGrillSelectionComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: HpRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'operations',
        component: HpOperationComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'output-carrier-scan',
        component: HpOutputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'proces-quality-check',
        component: HpProcessQualityCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: HpScrapBookingComponent,
        data: {
          title: '',
        },
      },
    ],
  },
  {
    path: 'pre-heating',
    component: HpPreHeatingComponent,
    data: {
      title: '',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotPressRoutingModule {}
