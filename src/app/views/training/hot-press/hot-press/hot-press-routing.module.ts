import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotPressComponent } from './hot-press.component';
import { OfflinePrePressComponent } from '../offline-pre-press/offline-pre-press.component';
import { ScrapBookingComponent } from '../scrap-booking/scrap-booking.component';
import { IpCarrierScanComponent } from '../ip-carrier-scan/ip-carrier-scan.component';
import { GrillSelectionComponent } from '../grill-selection/grill-selection.component';
import { RecipeSetupComponent } from '../recipe-setup/recipe-setup.component';
import { OperationComponent } from '../operation/operation.component';
import { OutputCarrierScanComponent } from '../output-carrier-scan/output-carrier-scan.component';
import { PreHeatingComponent } from '../pre-heating/pre-heating.component';
import { MachineSetupComponent } from '../machine-setup/machine-setup.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'offline-pre-press',
  //   pathMatch: 'full',
  // },

  {
    path: '',
    redirectTo: 'hotPress',
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
        path: 'offline-pre-press',
        component: OfflinePrePressComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: ScrapBookingComponent,
      },
      {
        path: 'ip-carrier-scan',
        component: IpCarrierScanComponent,
      },
      {
        path: 'grill-selection',
        component: GrillSelectionComponent,
      },
      {
        path: 'recipe-setup',
        component: RecipeSetupComponent,
      },
      {
        path: 'operations',
        component: OperationComponent,
      },
      {
        path: 'output-carrier-scan',
        component: OutputCarrierScanComponent,
      },
      // {
      //   path: 'hotPress',
      //   component: MachineSetupComponent,
      // },
    ],
  },
  {
    path: 'pre-heating',
    component: PreHeatingComponent,
    data: {
      title: '',
    },
  },
  {
    path: 'hotPress',
    component: MachineSetupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotPressRoutingModule {}
