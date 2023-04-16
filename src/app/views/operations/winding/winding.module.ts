import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import All modules
import { SharedModules } from '../Shared/shared.module';

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
import { WindingRoutingModule } from './winding-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';

// import All components

import { WindingComponent } from './winding.component';
import { WdMaterialCheckComponent } from './wd-material-check/wd-material-check.component';
import { WdMaterialCheckFlimRollsComponent } from './wd-material-check/wd-material-check-flim-rolls/wd-material-check-flim-rolls.component';
import { WdRecipeSetupComponent } from './wd-recipe-setup/wd-recipe-setup.component';
import { WdRecipeSetupMakingTrialPartComponent } from './wd-recipe-setup/wd-recipe-setup-making-trial-part/wd-recipe-setup-making-trial-part.component';
import { WdRecipeSetupVisualInspectionComponent } from './wd-recipe-setup/wd-recipe-setup-visual-inspection/wd-recipe-setup-visual-inspection.component';
import { WdMachineRecipeSetupComponent } from './wd-recipe-setup/wd-machine-recipe-setup/wd-machine-recipe-setup.component';
import { WdOPCarrierBinComponent } from './wd-opcarrier-bin/wd-opcarrier-bin.component';
import { WdWindingComponent } from './wd-winding/wd-winding.component';
import { WdLabelPrintingComponent } from './wd-label-printing/wd-label-printing.component';
import { WdToolCheckComponent } from './wd-tool-check/wd-tool-check.component';
import { WdVisualInspectionComponent } from './wd-visual-inspection/wd-visual-inspection.component';
import { WdSpcComponent } from './wd-spc/wd-spc.component';
import { WdMeasurementComponent } from './wd-measurement/wd-measurement.component';

@NgModule({
  declarations: [
    WindingComponent,
    WdMaterialCheckComponent,
    WdMaterialCheckFlimRollsComponent,
    WdRecipeSetupComponent,
    WdRecipeSetupMakingTrialPartComponent,
    WdRecipeSetupVisualInspectionComponent,
    WdMachineRecipeSetupComponent,
    WdOPCarrierBinComponent,
    WdWindingComponent,
    WdLabelPrintingComponent,
    WdToolCheckComponent,
    WdVisualInspectionComponent,
    WdSpcComponent,
    WdMeasurementComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    WindingRoutingModule,
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
    SharedModules,
    AlertModule,
  ],
})
export class WindingModule {}
