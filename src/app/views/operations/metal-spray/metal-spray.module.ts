import { MetalSprayRoutingModule } from './metal-spray-routing.module';
import { SharedModules } from './../Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// import All Modules
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

// import All Components

import { MetalSprayComponent } from './metal-spray.component';
import { MsMaterialCheckComponent } from './ms-material-check/ms-material-check.component';
import { MsIpcarrierValidationComponent } from './ms-ipcarrier-validation/ms-ipcarrier-validation.component';
import { WarningPopUpModalComponent } from './warning-pop-up-modal/warning-pop-up-modal.component';
import { SuccessPopUpModalComponent } from './success-pop-up-modal/success-pop-up-modal.component';
import { MsMachineSetupComponent } from './ms-machine-setup/ms-machine-setup.component';
import { MsMetalSprayComponent } from './ms-metal-spray/ms-metal-spray.component';
import { MsWheelOperationComponent } from './ms-wheel-operation/ms-wheel-operation.component';
import { MsProcessQualityCheckComponent } from './ms-process-quality-check/ms-process-quality-check.component';
import { MsMaterialScanComponent } from './ms-material-scan/ms-material-scan.component';
import { MsScrapBookingComponent } from './ms-scap-booking/ms-scrap-booking.component';

@NgModule({
  declarations: [
    MetalSprayComponent,
    MsIpcarrierValidationComponent,
    MsMaterialCheckComponent,
    WarningPopUpModalComponent,
    SuccessPopUpModalComponent,
    MsMachineSetupComponent,
    MsMetalSprayComponent,
    MsWheelOperationComponent,
    MsProcessQualityCheckComponent,
    MsMaterialScanComponent,
    MsScrapBookingComponent,
  ],
  imports: [
    CommonModule,
    MetalSprayRoutingModule,
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
  providers: [DatePipe],
})
export class MetalSprayModule {}
