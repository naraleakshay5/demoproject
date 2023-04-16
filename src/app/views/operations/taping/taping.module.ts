import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModules } from '../Shared/shared.module';
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

import { TapingRoutingModule } from './taping-routing.module';
import { TapingComponent } from '../taping/taping.component';
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
import { TpLineClearanceComponent } from './tp-line-clearance/tp-line-clearance.component';

@NgModule({
  declarations: [TapingComponent, TpInputBinScanComponent, TpOnlineRestoComponent, TpKardexRestoComponent, TpToolChangeOverComponent, TpRecipeSetupComponent, TpPackingMaterialComponent, TpOperationComponent, TpLabelPrintingComponent, TpScrapBookingComponent, TpBatchCompletionComponent, TpLoadBinComponent, TpProcessQualityComponent, TpDifferanceSachComponent, TpLineClearanceComponent],
  imports: [
    CommonModule,
    TapingRoutingModule,
    SharedModules,
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
  ],
})
export class TapingModule {}
