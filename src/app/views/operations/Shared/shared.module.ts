import { OrderModule } from 'ngx-order-pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import All modules
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
  AlertModule,
} from '@coreui/angular';
import { SharedRoutingModule } from './shared-routing.module';

// import All components
import { LogoutComponent } from './logout/logout.component';
import { ScannerComponent } from './scanner/scanner.component';
import { PopUpModalComponent } from './pop-up-modal/pop-up-modal.component';
import { ModalMaterialComponent } from './modal-material/modal-material.component';
import { ScrapBookingComponent } from './scrap-booking/scrap-booking.component';
import { MachineValidationChecklistComponent } from './machine-validation-checklist/machine-validation-checklist.component';
import { PoListComponent } from './po-list/po-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { HelperService } from 'src/app/helpers/helper.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SpinnerL2Component } from './spinner-l2/spinner-l2.component';
import { CommonJobsComponent } from './common-jobs/common-jobs.component';
import { SapConfirmationComponent } from './sap-confirmation/sap-confirmation.component';
import { AutoNextDirective } from './auto-next.directive';

@NgModule({
  declarations: [
    LogoutComponent,
    ScannerComponent,
    PopUpModalComponent,
    ScrapBookingComponent,
    MachineValidationChecklistComponent,
    PoListComponent,
    ModalMaterialComponent,
    ErrorMessageComponent,
    SpinnerL2Component,
    CommonJobsComponent,
    SapConfirmationComponent,
    AutoNextDirective,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CardModule,
    TableModule,
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
    OrderModule,
    AlertModule,
  ],
  exports: [
    ScrapBookingComponent,
    LogoutComponent,
    PopUpModalComponent,
    ScannerComponent,
    ModalMaterialComponent,
    ErrorMessageComponent,
    SpinnerL2Component,
    CommonJobsComponent,
    AutoNextDirective,
  ],
  providers: [HelperService, AutoNextDirective],
})
export class SharedModules {}
