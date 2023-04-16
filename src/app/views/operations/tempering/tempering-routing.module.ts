import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemInputTrolleysComponent } from './tem-input-trolleys/tem-input-trolleys.component';
import { TemLoadingTrolleysComponent } from './tem-loading-trolleys/tem-loading-trolleys.component';
import { TemOperationComponent } from './tem-operation/tem-operation.component';
import { TemRecipeSetupComponent } from './tem-recipe-setup/tem-recipe-setup.component';
import { TemScrapBookingComponent } from './tem-scrap-booking/tem-scrap-booking.component';

import { TemperingComponent } from './tempering.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ip-carrier-scan',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TemperingComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'ip-carrier-scan',
        component: TemInputTrolleysComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'loading-trolley',
        component: TemLoadingTrolleysComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: TemRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'operations',
        component: TemOperationComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: TemScrapBookingComponent,
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
export class TemperingRoutingModule {}
