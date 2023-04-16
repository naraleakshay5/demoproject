import { AoiDryRunComponent } from './aoi-dry-run/aoi-dry-run.component';
import { AoiOutputCarrierScanComponent } from './aoi-output-carrier-scan/aoi-output-carrier-scan.component';
import { AoiOutputCarrierRejectedScanComponent } from './aoi-output-carrier-rejected-scan/aoi-output-carrier-rejected-scan.component';
import { AoiToolCheckComponent } from './aoi-tool-check/aoi-tool-check.component';
import { AoiRecipeSetupComponent } from './aoi-recipe-setup/aoi-recipe-setup.component';
import { AoiInputCarrierScanComponent } from './aoi-input-carrier-scan/aoi-input-carrier-scan.component';
import { AoiComponent } from './aoi.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AoiOPerationsComponent } from './aoi-operations/aoi-operations.component';
import { AoiBatchResultComponent } from './aoi-batch-result/aoi-batch-result.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tool-check',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AoiComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'tool-check',
        component: AoiToolCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'input-carrier',
        component: AoiInputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: AoiRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'dry-run',
        component: AoiDryRunComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'output-rejected-bin',
        component: AoiOutputCarrierRejectedScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'output-good-bin',
        component: AoiOutputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'operations',
        component: AoiOPerationsComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'batch-result',
        component: AoiBatchResultComponent,
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
export class AoiRoutingModule {}
