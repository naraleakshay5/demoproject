import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FqaCollectSamplesComponent } from './fqa-collect-samples/fqa-collect-samples.component';
import { FqaHvTestComponent } from './fqa-impulse-test/fqa-hv-test/fqa-hv-test.component';
import { FqaImpulseTestComponent } from './fqa-impulse-test/fqa-impulse-test.component';
import { FqaIrTestComponent } from './fqa-impulse-test/fqa-ir-test/fqa-ir-test.component';
import { FqaCapacitorDimensionsComponent } from './fqa-quality-inspection/fqa-capacitor-dimensions/fqa-capacitor-dimensions.component';
import { FqaLeadLengthCheckComponent } from './fqa-quality-inspection/fqa-lead-length-check/fqa-lead-length-check.component';
import { FqaPitchMeasurementComponent } from './fqa-quality-inspection/fqa-pitch-measurement/fqa-pitch-measurement.component';
import { FqaPullTestComponent } from './fqa-quality-inspection/fqa-pull-test/fqa-pull-test.component';
import { FqaQualityInspectionComponent } from './fqa-quality-inspection/fqa-quality-inspection.component';
import { FqaResinHeightCheckComponent } from './fqa-quality-inspection/fqa-resin-height-check/fqa-resin-height-check.component';
import { FqaSolderGunTestComponent } from './fqa-quality-inspection/fqa-solder-gun-test/fqa-solder-gun-test.component';
import { FqaTapingGaugeComponent } from './fqa-quality-inspection/fqa-taping-gauge/fqa-taping-gauge.component';
import { FqaQtyVisualInspectionComponent } from './fqa-quality-inspection/fqa-visual-inspection/fqa-visual-inspection.component';
import { FqaRestoBoxComponent } from './fqa-resto-box/fqa-resto-box.component';
import { FqaComponent } from './fqa.component';
import { FqaPoCheckoutComponent } from './fqa-po-checkout/fqa-po-checkout.component';
import { FqaBoxedComponent } from './fqa-boxed/fqa-boxed.component';
import { FqaTapedComponent } from './fqa-taped/fqa-taped.component';
import { FqaTopSidePrintingComponent } from './fqa-quality-inspection/fqa-top-side-printing/fqa-top-side-printing.component';
import { FqaPrintedCapValueComponent } from './fqa-quality-inspection/fqa-printed-cap-value/fqa-printed-cap-value.component';
import { FqaRestoBoxVisualInspectionComponent } from './fqa-quality-inspection/fqa-resto-box-visual-inspection/fqa-resto-box-visual-inspection.component';
import { FqaRestoBoxPrintingCheckComponent } from './fqa-quality-inspection/fqa-resto-box-printing-check/fqa-resto-box-printing-check.component';
import { FqaPackingOpComponent } from './fqa-packing-op/fqa-packing-op.component';
import { FqaPackingStatusComponent } from './fqa-packing-status/fqa-packing-status.component';
import { FqaBoxesConfirmationComponent } from './fqa-boxes-confirmation/fqa-boxes-confirmation.component';
import { FqaScannedRestoBoxComponent } from './fqa-resto-box/fqa-scanned-resto-box/fqa-scanned-resto-box.component';
import { FqaScannedLabelsComponent } from './fqa-boxes-confirmation/fqa-scanned-labels/fqa-scanned-labels.component';
import { FqaRestoAdjustmentComponent } from './fqa-packing-status/fqa-resto-adjustment/fqa-resto-adjustment.component';
import { FqaScreenForKardexComponent } from './fqa-screen-for-kardex/fqa-screen-for-kardex.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'collect-samples',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FqaComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'collect-samples',
        component: FqaCollectSamplesComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'impulse-test',
        component: FqaImpulseTestComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'ir-test',
        component: FqaIrTestComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'hv-test',
        component: FqaHvTestComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'fqa-po-checkout',
        component: FqaPoCheckoutComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'boxed',
        component: FqaBoxedComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'taped',
        component: FqaTapedComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'quality-inspection',
        component: FqaQualityInspectionComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'resto-box',
        component: FqaRestoBoxComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scanned-resto-box',
        component: FqaScannedRestoBoxComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'printing-check',
        component: FqaTopSidePrintingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'resto-box-printing-check',
        component: FqaRestoBoxPrintingCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'resto-box-visual-inspection',
        component: FqaRestoBoxVisualInspectionComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'resin-height-check',
        component: FqaResinHeightCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'qty-visual-inspection',
        component: FqaQtyVisualInspectionComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'lead-length-check',
        component: FqaLeadLengthCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'capacitor-dimensions',
        component: FqaCapacitorDimensionsComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'pitch-measurement',
        component: FqaPitchMeasurementComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'solder-gun-test',
        component: FqaSolderGunTestComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'taping-gauge',
        component: FqaTapingGaugeComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'pull-test',
        component: FqaPullTestComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'cap-value-check',
        component: FqaPrintedCapValueComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'packing-op',
        component: FqaPackingOpComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'resto-adjustment',
        component: FqaRestoAdjustmentComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'packing-status',
        component: FqaPackingStatusComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'boxes-confirmation',
        component: FqaBoxesConfirmationComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'label-scan',
        component: FqaScannedLabelsComponent,
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
export class FqaRoutingModule {}
