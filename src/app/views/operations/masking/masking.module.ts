import { SharedModules } from './../Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import All Modules
import { MaskingRoutingModule } from './masking-routing.module';
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

import { MaskingComponent } from './masking.component';
import { MaInputCarrierScanComponent } from './ma-input-carrier-scan/ma-input-carrier-scan.component';
import { MaMaterialCheckComponent } from './ma-material-check/ma-material-check.component';
import { MaToolCheckComponent } from './ma-tool-check/ma-tool-check.component';
import { MaOutputCarrierScanComponent } from './ma-output-carrier-scan/ma-output-carrier-scan.component';
import { MaMachineSetupComponent } from './ma-machine-setup/ma-machine-setup.component';
import { MaRecipeSetupComponent } from './ma-recipe-setup/ma-recipe-setup.component';
import { MaMaskingComponent } from './ma-masking/ma-masking.component';
import { MaPrintLabelComponent } from './ma-print-label/ma-print-label.component';
import { MaScrapBookingComponent } from './ma-scrap-booking/ma-scrap-booking.component';
import { MaPopUpModalComponent } from './ma-pop-up-modal/ma-pop-up-modal.component';
import { MaskingPopUpModalComponent } from './ma-masking/masking-pop-up-modal/masking-pop-up-modal.component';
import { MaskingReworkPopUpModalComponent } from './ma-masking/masking-rework-pop-up-modal/masking-rework-pop-up-modal.component';
import { StartMaskingComponent } from './start-masking/start-masking.component';

@NgModule({
  declarations: [
    MaskingComponent,
    MaInputCarrierScanComponent,
    MaMaterialCheckComponent,
    MaToolCheckComponent,
    MaOutputCarrierScanComponent,
    MaMachineSetupComponent,
    MaRecipeSetupComponent,
    MaMaskingComponent,
    MaPrintLabelComponent,
    MaScrapBookingComponent,
    MaPopUpModalComponent,
    MaskingPopUpModalComponent,
    MaskingReworkPopUpModalComponent,
    StartMaskingComponent,
  ],
  imports: [
    CommonModule,
    MaskingRoutingModule,
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
export class MaskingModule {}
