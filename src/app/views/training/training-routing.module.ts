import { MaOperationComponent } from './masking/ma-operation/ma-operation.component';
import { MaLabelScrapBookingComponent } from './masking/ma-label-scrap-booking/ma-label-scrap-booking.component';
import { TrainingComponent } from './training.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from 'src/app/containers';
import { MaMAterialToolMachineSetupComponent } from './masking/ma-material-tool-machine-setup/ma-material-tool-machine-setup.component';
import { MaInputScanComponent } from './masking/ma-input-scan/ma-input-scan.component';
import { MaOutputScanComponent } from './masking/ma-output-scan/ma-output-scan.component';
import { MaRecipeComponent } from './masking/ma-recipe/ma-recipe.component';
//import { HotPressComponent } from './hot-press/hot-press/hot-press.component';
//import { IpCarrierScanComponent } from './hot-press/ip-carrier-scan/ip-carrier-scan.component';
// import { HotPressComponent } from './hot-press/hot-press/hot-press.component';
// import { IpCarrierScanComponent } from './hot-press/ip-carrier-scan/ip-carrier-scan.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Modules',
    pathMatch: 'full',
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },

    children: [
      {
        path: '',
        component: TrainingComponent,
        data: {
          title: 'Modules',
        },
      },
      {
        path: 'training-masking',
        component: MaMAterialToolMachineSetupComponent,
        data: {
          title: 'Modules',
        },
      },
      {
        path: 'masking-recipe',
        component: MaRecipeComponent,
        data: {
          title: 'Modules',
        },
      },
      {
        path: 'masking-input-scan',
        component: MaInputScanComponent,
        data: {
          title: 'Modules',
        },
      },
      {
        path: 'masking-output-scan',
        component: MaOutputScanComponent,
        data: {
          title: 'Modules',
        },
      },
      {
        path: 'masking-operation',
        component: MaOperationComponent,
        data: {
          title: 'Modules',
        },
      },
      {
        path: 'label-scrap',
        component: MaLabelScrapBookingComponent,
        data: {
          title: 'Modules',
        },
      },

      //hot-press-module//

      {
        path: 'hot-press',
        loadChildren: () =>
          import('./hot-press/hot-press/hot-press.module').then(
            (m) => m.HotPressModule
          ),
      },

      // {
      //   path: 'training-hot-press',
      //   component: HotPressComponent,
      //   data: {
      //     title: 'Modules',
      //   },
      // },
      // {
      //   path: 'ip-carrier-scan',
      //   component: IpCarrierScanComponent,
      //   data: {
      //     title: 'Modules',
      //   },
      // },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TrainingRoutingModule {}
