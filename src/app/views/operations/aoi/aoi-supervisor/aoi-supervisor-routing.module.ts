import { AoiDataComponent } from './aoi-data/aoi-data.component';
import { AoiSupervisorProcessorComponent } from './aoi-supervisor-processor/aoi-supervisor-processor.component';
import { AoiSupervisorSortingComponent } from './aoi-supervisor-sorting/aoi-supervisor-sorting.component';
import { AoiSupervisorCheckoutComponent } from './aoi-supervisor-checkout/aoi-supervisor-checkout.component';
import { AoiSupervisorComponent } from './aoi-supervisor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AoiSupervisorDataFlowComponent } from './aoi-data/aoi-supervisor-data-flow/aoi-supervisor-data-flow.component';
import { AoiSupervisorCheckoutFlowComponent } from './aoi-supervisor-checkout/aoi-supervisor-checkout-flow/aoi-supervisor-checkout-flow.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'aoi-sup',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AoiSupervisorComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'checkout',
        component: AoiSupervisorCheckoutComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'checkout-flow',
        component: AoiSupervisorCheckoutFlowComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'sorting',
        component: AoiSupervisorSortingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'processor',
        component: AoiSupervisorProcessorComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'data',
        component: AoiDataComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'data-flow',
        component: AoiSupervisorDataFlowComponent,
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
export class AoiSupervisorRoutingModule {}
