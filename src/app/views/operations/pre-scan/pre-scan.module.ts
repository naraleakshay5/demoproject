import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import All Modules
import { PreScanRoutingModule } from './pre-scan-routing.module';

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
// import All components
import { PreScanComponent } from './pre-scan.component';
import { PsInputCarrierScanComponent } from './ps-input-carrier-scan/ps-input-carrier-scan.component';
import { MaInputCarrierScanComponent } from './ma-input-carrier-scan/ma-input-carrier-scan.component';

@NgModule({
  declarations: [
    PsInputCarrierScanComponent,
    PreScanComponent,
    MaInputCarrierScanComponent,
  ],
  imports: [
    CommonModule,
    PreScanRoutingModule,
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
export class PreScanModule {}
