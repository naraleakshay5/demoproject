import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaskingComponent } from './masking.component';
import { MaInputCarrierScanComponent } from './ma-input-carrier-scan/ma-input-carrier-scan.component';
import { MaMachineSetupComponent } from './ma-machine-setup/ma-machine-setup.component';
import { MaMaskingComponent } from './ma-masking/ma-masking.component';
import { MaMaterialCheckComponent } from './ma-material-check/ma-material-check.component';
import { MaOutputCarrierScanComponent } from './ma-output-carrier-scan/ma-output-carrier-scan.component';
import { MaRecipeSetupComponent } from './ma-recipe-setup/ma-recipe-setup.component';
import { MaScrapBookingComponent } from './ma-scrap-booking/ma-scrap-booking.component';
import { MaToolCheckComponent } from './ma-tool-check/ma-tool-check.component';
import { MaPrintLabelComponent } from './ma-print-label/ma-print-label.component';
import { StartMaskingComponent } from './start-masking/start-masking.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'material-check',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MaskingComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'ip-carrier-scan',
        component: MaInputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'material-check',
        component: MaMaterialCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'tool-check',
        component: MaToolCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'machine-setup',
        component: MaMachineSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: MaRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'start-masking',
        component: StartMaskingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'masking',
        component: MaMaskingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'output-carrier-scan',
        component: MaOutputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'label-printing',
        component: MaPrintLabelComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: MaScrapBookingComponent,
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
export class MaskingRoutingModule {}
