import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TapingComponent } from './taping.component';
import { TpInputBinScanComponent } from './tp-input-bin-scan/tp-input-bin-scan.component';
import { TpOnlineRestoComponent } from './tp-online-resto/tp-online-resto.component';
import { TpKardexRestoComponent } from './tp-kardex-resto/tp-kardex-resto.component';
import { TpToolChangeOverComponent } from './tp-tool-change-over/tp-tool-change-over.component';
import { TpRecipeSetupComponent } from './tp-recipe-setup/tp-recipe-setup.component';
import { TpPackingMaterialComponent } from './tp-packing-material/tp-packing-material.component';
import { TpOperationComponent } from './tp-operation/tp-operation.component';
import { TpLabelPrintingComponent } from './tp-label-printing/tp-label-printing.component';
import { TpScrapBookingComponent } from './tp-scrap-booking/tp-scrap-booking.component';
import { TpBatchCompletionComponent } from './tp-batch-completion/tp-batch-completion.component';
import { TpLoadBinComponent } from './tp-load-bin/tp-load-bin.component';
import { TpProcessQualityComponent } from './tp-process-quality/tp-process-quality.component';
import { TpDifferanceSachComponent } from './tp-differance-sach/tp-differance-sach.component';
import { FqaScreenForKardexComponent } from '../fqa/fqa-screen-for-kardex/fqa-screen-for-kardex.component';
import { TpLineClearanceComponent } from './tp-line-clearance/tp-line-clearance.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'input-bin-scan',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TapingComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'input-bin-scan',
        component: TpInputBinScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'online-resto',
        component: TpOnlineRestoComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'kardex-resto',
        component: TpKardexRestoComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'line-clearance',
        component: TpLineClearanceComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'tool-change-over',
        component: TpToolChangeOverComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: TpRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'packing-material',
        component: TpPackingMaterialComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'load-bin',
        component: TpLoadBinComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'operation',
        component: TpOperationComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'process-quality-check',
        component: TpProcessQualityComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'batch-completion',
        component: TpBatchCompletionComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'label-printing',
        component: TpLabelPrintingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'diff-sach',
        component: TpDifferanceSachComponent,
        data: {
          title: '',
        },
      },

      {
        path: 'scrap-booking',
        component: TpScrapBookingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scan-screen',
        component: FqaScreenForKardexComponent,
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
export class TapingRoutingModule {}
