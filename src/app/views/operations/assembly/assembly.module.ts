import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssemblyRoutingModule } from './assembly-routing.module';

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

import { AssemblyComponent } from '../assembly/assembly.component';
import { AsInputCarrierComponent } from './as-input-carrier/as-input-carrier.component';
import { AsLineClearanceComponent } from './as-line-clearance/as-line-clearance.component';
import { AsChangeOverComponent } from './as-change-over/as-change-over.component';
import { AsMaterialCheckComponent } from './as-material-check/as-material-check.component';
import { AsLeadWireScanningComponent } from './as-lead-wire-scanning/as-lead-wire-scanning.component';
import { AsRecipeSetupComponent } from './as-recipe-setup/as-recipe-setup.component';
import { AsLabelPrintingComponent } from './as-label-printing/as-label-printing.component';
import { AsScrapBookingComponent } from './as-scrap-booking/as-scrap-booking.component';
import { AsOperationComponent } from './as-operation/as-operation.component';
import { AsOutputCarrierComponent } from './as-output-carrier/as-output-carrier.component';
import { AsProcessQualityCheckComponent } from './as-process-quality-check/as-process-quality-check.component';
import { AsMetalTraysComponent } from './as-metal-trays/as-metal-trays.component';
import { AsTensileStrengthCheckComponent } from './as-tensile-strength-check/as-tensile-strength-check.component';
import { AsLeadLengthCheckComponent } from './as-lead-length-check/as-lead-length-check.component';
import { AsReginHeightCheckComponent } from './as-regin-height-check/as-regin-height-check.component';
import { AsProductAppearanceComponent } from './as-product-appearance/as-product-appearance.component';
import { AsImpulseTestComponent } from './as-impulse-test/as-impulse-test.component';
import { AsCuringRecipeSetupComponent } from './as-curing-recipe-setup/as-curing-recipe-setup.component';
import { AsDispensarRecipeSetupComponent } from './as-dispensar-recipe-setup/as-dispensar-recipe-setup.component';

@NgModule({
  declarations: [
    AssemblyComponent,
    AsInputCarrierComponent,
    AsLineClearanceComponent,
    AsChangeOverComponent,
    AsMaterialCheckComponent,
    AsLeadWireScanningComponent,
    AsRecipeSetupComponent,
    AsLabelPrintingComponent,
    AsScrapBookingComponent,
    AsOperationComponent,
    AsOutputCarrierComponent,
    AsProcessQualityCheckComponent,
    AsMetalTraysComponent,
    AsTensileStrengthCheckComponent,
    AsLeadLengthCheckComponent,
    AsReginHeightCheckComponent,
    AsProductAppearanceComponent,
    AsImpulseTestComponent,
    AsCuringRecipeSetupComponent,
    AsDispensarRecipeSetupComponent,
  ],
  imports: [
    CommonModule,
    AssemblyRoutingModule,
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
  ],
})
export class AssemblyModule {}
