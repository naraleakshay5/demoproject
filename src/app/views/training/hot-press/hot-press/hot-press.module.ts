import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotPressRoutingModule } from './hot-press-routing.module';
import { OfflinePrePressComponent } from '../offline-pre-press/offline-pre-press.component';
import { HotPressComponent } from './hot-press.component';
import { ScrapBookingComponent } from '../scrap-booking/scrap-booking.component';
import { IpCarrierScanComponent } from '../ip-carrier-scan/ip-carrier-scan.component';
import { GrillSelectionComponent } from '../grill-selection/grill-selection.component';
import { RecipeSetupComponent } from '../recipe-setup/recipe-setup.component';
import { OperationComponent } from '../operation/operation.component';
import { OutputCarrierScanComponent } from '../output-carrier-scan/output-carrier-scan.component';
import { PreHeatingComponent } from '../pre-heating/pre-heating.component';
import { MachineSetupComponent } from '../machine-setup/machine-setup.component';
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
import { SharedModules } from '../../../operations/Shared/shared.module';

@NgModule({
  declarations: [
    OfflinePrePressComponent,
    HotPressComponent,
    ScrapBookingComponent,
    IpCarrierScanComponent,
    GrillSelectionComponent,
    RecipeSetupComponent,
    OperationComponent,
    OutputCarrierScanComponent,
    PreHeatingComponent,
    MachineSetupComponent,
  ],
  imports: [
    CommonModule,
    HotPressRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    IconModule,
    SharedModules,
  ],
})
export class HotPressModule {}
