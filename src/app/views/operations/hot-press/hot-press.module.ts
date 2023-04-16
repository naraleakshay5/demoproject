import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import All Modules
import { HotPressRoutingModule } from './hot-press-routing.module';

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

// import All Components
import { HotPressComponent } from './hot-press.component';
import { HpIPCarrierScanComponent } from './hp-ipcarrier-scan/hp-ipcarrier-scan.component';
import { HpOfflinePrePressComponent } from './hp-offline-pre-press/hp-offline-pre-press.component';
import { HpGrillSelectionComponent } from './hp-grill-selection/hp-grill-selection.component';
import { HpRecipeSetupComponent } from './hp-recipe-setup/hp-recipe-setup.component';
import { HpOperationComponent } from './hp-operation/hp-operation.component';
import { HpOutputCarrierScanComponent } from './hp-output-carrier-scan/hp-output-carrier-scan.component';
import { HpProcessQualityCheckComponent } from './hp-process-quality-check/hp-process-quality-check.component';
import { HpPreHeatingComponent } from './hp-pre-heating/hp-pre-heating.component';
import { HpScrapBookingComponent } from './hp-scrap-booking/hp-scrap-booking.component';
@NgModule({
  declarations: [
    HotPressComponent,
    HpIPCarrierScanComponent,
    HpOfflinePrePressComponent,
    HpGrillSelectionComponent,
    HpRecipeSetupComponent,
    HpOperationComponent,
    HpOutputCarrierScanComponent,
    HpProcessQualityCheckComponent,
    HpPreHeatingComponent,
    HpScrapBookingComponent,
  ],
  imports: [
    CommonModule,
    HotPressRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    GridModule,
    TabsModule,
    NavModule,
    ModalModule,
    ProgressModule,
    FormModule,
    FormModule,
    ListGroupModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    TooltipModule,
    SharedModules,
  ],
})
export class HotPressModule {}
