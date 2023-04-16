import { ReTestInputScanComponent } from './re-test-input-scan/re-test-input-scan.component';
import { ElProcessQualityCheckComponent } from './el-process-quality-check/el-process-quality-check.component';
import { ElOperationsComponent } from './el-operations/el-operations.component';
import { ElOutputCarrierScanComponent } from './el-output-carrier-scan/el-output-carrier-scan.component';
import { ElScrapBookingComponent } from './el-scrap-booking/el-scrap-booking.component';
import { ElLabelPrintingComponent } from './el-label-printing/el-label-printing.component';
import { ElInputCarrierScanComponent } from './el-input-carrier-scan/el-input-carrier-scan.component';
import { ElRecipeSetupComponent } from './el-recipe-setup/el-recipe-setup.component';
import { ElectricalTestingComponent } from './electrical-testing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElToolCheckComponent } from './el-tool-check/el-tool-check.component';
import { ElReTestingComponent } from './el-re-testing/el-re-testing.component';
import { ElVideoJetImageComponent } from './el-video-jet-image/el-video-jet-image.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tool-check',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ElectricalTestingComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'tool-check',
        component: ElToolCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'video-jet',
        component: ElVideoJetImageComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: ElRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'ip-carrier-scan',
        component: ElInputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'operations',
        component: ElOperationsComponent,
        data: {
          title: '',
        },
      },
      {
        path: 're-test-ip-scan',
        component: ReTestInputScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 're-test',
        component: ElReTestingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'process-quality-check',
        component: ElProcessQualityCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'op-carrier-scan',
        component: ElOutputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'label-printing',
        component: ElLabelPrintingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: ElScrapBookingComponent,
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
export class ElectricalTestingRoutingModule {}
