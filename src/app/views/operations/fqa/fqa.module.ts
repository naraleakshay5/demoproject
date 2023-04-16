import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CardModule,
  TableModule,
  ButtonModule,
  GridModule,
  TabsModule,
  NavModule,
  ModalModule,
  FormModule,
  ProgressModule,
  ListGroupModule,
  TooltipModule,
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { SharedModules } from '../Shared/shared.module';
import { NgxBarcodeModule } from 'ngx-barcode';

import { FqaRoutingModule } from './fqa-routing.module';
import { FqaComponent } from '../fqa/fqa.component';
import { FqaCollectSamplesComponent } from './fqa-collect-samples/fqa-collect-samples.component';
import { FqaImpulseTestComponent } from './fqa-impulse-test/fqa-impulse-test.component';
import { FqaQualityInspectionComponent } from './fqa-quality-inspection/fqa-quality-inspection.component';
import { FqaResinHeightCheckComponent } from './fqa-quality-inspection/fqa-resin-height-check/fqa-resin-height-check.component';
import { FqaLeadLengthCheckComponent } from './fqa-quality-inspection/fqa-lead-length-check/fqa-lead-length-check.component';
import { FqaPitchMeasurementComponent } from './fqa-quality-inspection/fqa-pitch-measurement/fqa-pitch-measurement.component';
import { FqaSolderGunTestComponent } from './fqa-quality-inspection/fqa-solder-gun-test/fqa-solder-gun-test.component';
import { FqaCapacitorDimensionsComponent } from './fqa-quality-inspection/fqa-capacitor-dimensions/fqa-capacitor-dimensions.component';
import { FqaTapingGaugeComponent } from './fqa-quality-inspection/fqa-taping-gauge/fqa-taping-gauge.component';
import { FqaPullTestComponent } from './fqa-quality-inspection/fqa-pull-test/fqa-pull-test.component';
import { FqaRestoBoxComponent } from './fqa-resto-box/fqa-resto-box.component';
import { FqaTopSidePrintingComponent } from './fqa-quality-inspection/fqa-top-side-printing/fqa-top-side-printing.component';
import { FqaPrintedCapValueComponent } from './fqa-quality-inspection/fqa-printed-cap-value/fqa-printed-cap-value.component';
import { FqaQtyVisualInspectionComponent } from './fqa-quality-inspection/fqa-visual-inspection/fqa-visual-inspection.component';
import { FqaIrTestComponent } from './fqa-impulse-test/fqa-ir-test/fqa-ir-test.component';
import { FqaHvTestComponent } from './fqa-impulse-test/fqa-hv-test/fqa-hv-test.component';
import { FqaPoCheckoutComponent } from './fqa-po-checkout/fqa-po-checkout.component';
import { FqaBoxedComponent } from './fqa-boxed/fqa-boxed.component';
import { FqaTapedComponent } from './fqa-taped/fqa-taped.component';
import { FqaRestoBoxPrintingCheckComponent } from './fqa-quality-inspection/fqa-resto-box-printing-check/fqa-resto-box-printing-check.component';
import { FqaRestoBoxVisualInspectionComponent } from './fqa-quality-inspection/fqa-resto-box-visual-inspection/fqa-resto-box-visual-inspection.component';
import { FqaPackingOpComponent } from './fqa-packing-op/fqa-packing-op.component';
import { FqaPackingStatusComponent } from './fqa-packing-status/fqa-packing-status.component';
import { FqaBoxesConfirmationComponent } from './fqa-boxes-confirmation/fqa-boxes-confirmation.component';
import { FqaScannedRestoBoxComponent } from './fqa-resto-box/fqa-scanned-resto-box/fqa-scanned-resto-box.component';
import { FqaScannedLabelsComponent } from './fqa-boxes-confirmation/fqa-scanned-labels/fqa-scanned-labels.component';
import { FqaRestoAdjustmentComponent } from './fqa-packing-status/fqa-resto-adjustment/fqa-resto-adjustment.component';
import { FqaScreenForKardexComponent } from './fqa-screen-for-kardex/fqa-screen-for-kardex.component';

@NgModule({
  declarations: [
    FqaComponent,
    FqaCollectSamplesComponent,
    FqaImpulseTestComponent,
    FqaQualityInspectionComponent,
    FqaResinHeightCheckComponent,
    FqaLeadLengthCheckComponent,
    FqaPitchMeasurementComponent,
    FqaSolderGunTestComponent,
    FqaCapacitorDimensionsComponent,
    FqaTapingGaugeComponent,
    FqaPullTestComponent,
    FqaRestoBoxComponent,
    FqaTopSidePrintingComponent,
    FqaPrintedCapValueComponent,
    FqaQtyVisualInspectionComponent,
    FqaIrTestComponent,
    FqaHvTestComponent,
    FqaPoCheckoutComponent,
    FqaBoxedComponent,
    FqaTapedComponent,
    FqaRestoBoxPrintingCheckComponent,
    FqaRestoBoxVisualInspectionComponent,
    FqaPackingOpComponent,
    FqaPackingStatusComponent,
    FqaBoxesConfirmationComponent,
    FqaScannedRestoBoxComponent,
    FqaScannedLabelsComponent,
    FqaRestoAdjustmentComponent,
    FqaScreenForKardexComponent,
  ],
  imports: [
    CommonModule,
    FqaRoutingModule,
    CardModule,
    TableModule,
    ButtonModule,
    GridModule,
    TabsModule,
    NavModule,
    ModalModule,
    FormModule,
    ProgressModule,
    ListGroupModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    SharedModules,
    NgxBarcodeModule,
  ],
})
export class FqaModule {}
