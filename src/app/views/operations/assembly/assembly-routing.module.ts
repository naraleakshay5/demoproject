import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsChangeOverComponent } from './as-change-over/as-change-over.component';
import { AsInputCarrierComponent } from './as-input-carrier/as-input-carrier.component';
import { AsLabelPrintingComponent } from './as-label-printing/as-label-printing.component';
import { AsLeadWireScanningComponent } from './as-lead-wire-scanning/as-lead-wire-scanning.component';
import { AsLineClearanceComponent } from './as-line-clearance/as-line-clearance.component';
import { AsMaterialCheckComponent } from './as-material-check/as-material-check.component';
import { AsMetalTraysComponent } from './as-metal-trays/as-metal-trays.component';
import { AsOperationComponent } from './as-operation/as-operation.component';
import { AsOutputCarrierComponent } from './as-output-carrier/as-output-carrier.component';
import { AsProcessQualityCheckComponent } from './as-process-quality-check/as-process-quality-check.component';
import { AsRecipeSetupComponent } from './as-recipe-setup/as-recipe-setup.component';
import { AsScrapBookingComponent } from './as-scrap-booking/as-scrap-booking.component';
import { AssemblyComponent } from './assembly.component';
import { AsTensileStrengthCheckComponent } from './as-tensile-strength-check/as-tensile-strength-check.component';
import { AsLeadLengthCheckComponent } from './as-lead-length-check/as-lead-length-check.component';
import { AsReginHeightCheckComponent } from './as-regin-height-check/as-regin-height-check.component';
import { AsProductAppearanceComponent } from './as-product-appearance/as-product-appearance.component';
import { AsImpulseTestComponent } from './as-impulse-test/as-impulse-test.component';
import { AsCuringRecipeSetupComponent } from './as-curing-recipe-setup/as-curing-recipe-setup.component';
import { AsDispensarRecipeSetupComponent } from './as-dispensar-recipe-setup/as-dispensar-recipe-setup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ip-carrier',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AssemblyComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'ip-carrier',
        component: AsInputCarrierComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'line-clearance',
        component: AsLineClearanceComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'change-over',
        component: AsChangeOverComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'material-check',
        component: AsMaterialCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'lead-wire-scanning',
        component: AsLeadWireScanningComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: AsRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'curing-recipe-setup',
        component: AsCuringRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'dispenser-recipe-setup',
        component: AsDispensarRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'metal-trays',
        component: AsMetalTraysComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'operation',
        component: AsOperationComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'output-carrier',
        component: AsOutputCarrierComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'process-quality-check',
        component: AsProcessQualityCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'tensile-strength-quality-check',
        component: AsTensileStrengthCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'resin-height-check',
        component: AsReginHeightCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'lead-length-check',
        component: AsLeadLengthCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'product-appearance',
        component: AsProductAppearanceComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'impulse-test',
        component: AsImpulseTestComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'label-printing',
        component: AsLabelPrintingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: AsScrapBookingComponent,
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
export class AssemblyRoutingModule {}
