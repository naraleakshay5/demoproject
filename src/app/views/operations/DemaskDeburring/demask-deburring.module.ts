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

import { DemaskDeburringRoutingModule } from './demask-deburring-routing.module';
import { DemaskDeburringComponent } from './demask-deburring.component';
import { DdLabelPrintingComponent } from './dd-label-printing/dd-label-printing.component';
import { DdOperationComponent } from './dd-operation/dd-operation.component';
import { DdRecipeSetupComponent } from './dd-recipe-setup/dd-recipe-setup.component';
import { DdInputWheelsComponent } from './dd-input-wheels/dd-input-wheels.component';
import { DdOutputMetalTraysComponent } from './dd-output-metal-trays/dd-output-metal-trays.component';
import { DdScrapBookingComponent } from './dd-scrap-booking/dd-scrap-booking.component';
import { WarningPopUpModalComponent } from './warning-pop-up-modal/warning-pop-up-modal.component';
import { SuccessPopUpModalComponent } from './success-pop-up-modal/success-pop-up-modal.component';
import { DdInputWheelScanComponent } from './dd-input-wheel-scan/dd-input-wheel-scan.component';
import { DdStartOperationsComponent } from './dd-start-operations/dd-start-operations.component';

@NgModule({
  declarations: [
    DemaskDeburringComponent,
    DdLabelPrintingComponent,
    DdOperationComponent,
    DdRecipeSetupComponent,
    DdInputWheelsComponent,
    DdOutputMetalTraysComponent,
    DdScrapBookingComponent,
    WarningPopUpModalComponent,
    SuccessPopUpModalComponent,
    DdInputWheelScanComponent,
    DdStartOperationsComponent,
  ],
  imports: [
    CommonModule,
    DemaskDeburringRoutingModule,
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
export class DemaskDeburringModule {}
