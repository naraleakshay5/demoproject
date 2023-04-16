import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemaskDeburringComponent } from './demask-deburring.component';
import { DdInputWheelsComponent } from './dd-input-wheels/dd-input-wheels.component';
import { DdLabelPrintingComponent } from './dd-label-printing/dd-label-printing.component';
import { DdOperationComponent } from './dd-operation/dd-operation.component';
import { DdOutputMetalTraysComponent } from './dd-output-metal-trays/dd-output-metal-trays.component';
import { DdRecipeSetupComponent } from './dd-recipe-setup/dd-recipe-setup.component';
import { DdScrapBookingComponent } from './dd-scrap-booking/dd-scrap-booking.component';
import { DdInputWheelScanComponent } from './dd-input-wheel-scan/dd-input-wheel-scan.component';
import { DdStartOperationsComponent } from './dd-start-operations/dd-start-operations.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ip-carrier-scan',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DemaskDeburringComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'ip-carrier-scan',
        component: DdInputWheelsComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'ip-wheel-scan',
        component: DdInputWheelScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: DdRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'start-operations',
        component: DdStartOperationsComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'operations',
        component: DdOperationComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'output-carrier-scan',
        component: DdOutputMetalTraysComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'label-printing',
        component: DdLabelPrintingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: DdScrapBookingComponent,
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
export class DemaskDeburringRoutingModule {}
