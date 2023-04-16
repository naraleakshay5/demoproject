import { AoiInputCarrierScanComponent } from './aoi-input-carrier-scan/aoi-input-carrier-scan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AoiRoutingModule } from './aoi-routing.module';
import { AoiRecipeSetupComponent } from './aoi-recipe-setup/aoi-recipe-setup.component';
import { SharedModules } from '../../Shared/shared.module';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
  TooltipModule,
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { AoiBatchResultComponent } from './aoi-batch-result/aoi-batch-result.component';
import { AoiDryRunComponent } from './aoi-dry-run/aoi-dry-run.component';
import { AoiToolCheckComponent } from './aoi-tool-check/aoi-tool-check.component';
import { AoiOPerationsComponent } from './aoi-operations/aoi-operations.component';
import { AoiOutputCarrierRejectedScanComponent } from './aoi-output-carrier-rejected-scan/aoi-output-carrier-rejected-scan.component';
import { AoiOutputCarrierScanComponent } from './aoi-output-carrier-scan/aoi-output-carrier-scan.component';
import { AoiComponent } from './aoi.component';

@NgModule({
  declarations: [
    AoiComponent,
    AoiToolCheckComponent,
    AoiInputCarrierScanComponent,
    AoiRecipeSetupComponent,
    AoiOPerationsComponent,
    AoiOutputCarrierScanComponent,
    AoiOutputCarrierRejectedScanComponent,
    AoiBatchResultComponent,
    AoiDryRunComponent,
  ],

  imports: [
    CommonModule,
    AoiRoutingModule,
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
export class AoiModule {}
