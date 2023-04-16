import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineClearingRoutingModule } from './offline-clearing-routing.module';
import { OfflineClearingComponent } from './offline-clearing.component';
import { OfflineInputCarrierScanComponent } from './offline-input-carrier-scan/offline-input-carrier-scan.component';
import { OfflineOutputCarrierScanComponent } from './offline-output-carrier-scan/offline-output-carrier-scan.component';
import { OfflineOperationsComponent } from './offline-operations/offline-operations.component';
import { OfflineRecipeSetupComponent } from './offline-recipe-setup/offline-recipe-setup.component';
import { OfflineScrapBookingComponent } from './offline-scrap-booking/offline-scrap-booking.component';
import { OfflineLineClearanceComponent } from './offline-line-clearance/offline-line-clearance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { IconModule } from '@coreui/icons-angular';
import { SharedModules } from '../Shared/shared.module';

@NgModule({
  declarations: [
    OfflineClearingComponent,
    OfflineInputCarrierScanComponent,
    OfflineOutputCarrierScanComponent,
    OfflineOperationsComponent,
    OfflineRecipeSetupComponent,
    OfflineScrapBookingComponent,
    OfflineLineClearanceComponent,
  ],
  imports: [
    CommonModule,
    OfflineClearingRoutingModule,
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
export class OfflineClearingModule {}
