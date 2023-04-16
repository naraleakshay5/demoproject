import { MsMaterialScanComponent } from './ms-material-scan/ms-material-scan.component';
import { MsProcessQualityCheckComponent } from './ms-process-quality-check/ms-process-quality-check.component';
import { MsMetalSprayComponent } from './ms-metal-spray/ms-metal-spray.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetalSprayComponent } from './metal-spray.component';
import { MsIpcarrierValidationComponent } from './ms-ipcarrier-validation/ms-ipcarrier-validation.component';
import { MsMachineSetupComponent } from './ms-machine-setup/ms-machine-setup.component';
import { MsMaterialCheckComponent } from './ms-material-check/ms-material-check.component';
import { MsWheelOperationComponent } from './ms-wheel-operation/ms-wheel-operation.component';
import { MsScrapBookingComponent } from './ms-scap-booking/ms-scrap-booking.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'input-carrier',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MetalSprayComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'input-carrier',
        component: MsIpcarrierValidationComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'material-check',
        component: MsMaterialCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'material-scan',
        component: MsMaterialScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'machine-setup',
        component: MsMachineSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'metal-spray',
        component: MsMetalSprayComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'wheel-operation',
        component: MsWheelOperationComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'process-quality-check',
        component: MsProcessQualityCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: MsScrapBookingComponent,
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
export class MetalSprayRoutingModule {}
