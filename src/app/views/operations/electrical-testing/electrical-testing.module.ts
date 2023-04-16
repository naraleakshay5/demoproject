import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModules } from './../Shared/shared.module';

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

import { ElectricalTestingRoutingModule } from './electrical-testing-routing.module';
import { ElToolCheckComponent } from './el-tool-check/el-tool-check.component';
import { ElRecipeSetupComponent } from './el-recipe-setup/el-recipe-setup.component';
import { ElInputCarrierScanComponent } from './el-input-carrier-scan/el-input-carrier-scan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElLabelPrintingComponent } from './el-label-printing/el-label-printing.component';
import { ElScrapBookingComponent } from './el-scrap-booking/el-scrap-booking.component';
import { ElOutputCarrierScanComponent } from './el-output-carrier-scan/el-output-carrier-scan.component';
import { ElOperationsComponent } from './el-operations/el-operations.component';
import { ElProcessQualityCheckComponent } from './el-process-quality-check/el-process-quality-check.component';
import { ElReTestingComponent } from './el-re-testing/el-re-testing.component';
import { ReTestInputScanComponent } from './re-test-input-scan/re-test-input-scan.component';
import { ElVideoJetImageComponent } from './el-video-jet-image/el-video-jet-image.component';

@NgModule({
  declarations: [
    ElToolCheckComponent,
    ElRecipeSetupComponent,
    ElInputCarrierScanComponent,
    ElLabelPrintingComponent,
    ElScrapBookingComponent,
    ElOutputCarrierScanComponent,
    ElOperationsComponent,
    ElProcessQualityCheckComponent,
    ElReTestingComponent,
    ReTestInputScanComponent,
    ElVideoJetImageComponent,
  ],
  imports: [
    CommonModule,
    ElectricalTestingRoutingModule,
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
export class ElectricalTestingModule {}
