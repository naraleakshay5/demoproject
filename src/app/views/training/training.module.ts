import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { MaMAterialToolMachineSetupComponent } from './masking/ma-material-tool-machine-setup/ma-material-tool-machine-setup.component';
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
import { SharedModules } from '../operations/Shared/shared.module';
import { MaInputScanComponent } from './masking/ma-input-scan/ma-input-scan.component';
import { MaOutputScanComponent } from './masking/ma-output-scan/ma-output-scan.component';
import { MaOperationComponent } from './masking/ma-operation/ma-operation.component';
import { MaLabelScrapBookingComponent } from './masking/ma-label-scrap-booking/ma-label-scrap-booking.component';
import { MaRecipeComponent } from './masking/ma-recipe/ma-recipe.component';
import { UrlService } from './hot-press/machine-setup/url.service';
//import { MachineSetupComponent } from './hot-press/machine-setup/machine-setup.component';
//mport { PreHeatingComponent } from './hot-press/pre-heating/pre-heating.component';
//import { OutputCarrierScanComponent } from './hot-press/output-carrier-scan/output-carrier-scan.component';
//import { OperationComponent } from './hot-press/operation/operation.component';
//import { RecipeSetupComponent } from './hot-press/recipe-setup/recipe-setup.component';
//import { GrillSelectionComponent } from './hot-press/grill-selection/grill-selection.component';
//import { HotPressComponent } from './hot-press/hot-press/hot-press.component';
//import { OfflinePrePressComponent } from './hot-press/offline-pre-press/offline-pre-press.component';
//import { ScrapBookingComponent } from './hot-press/scrap-booking/scrap-booking.component';
//import { IpCarrierScanComponent } from './hot-press/ip-carrier-scan/ip-carrier-scan.component';

@NgModule({
  declarations: [
    TrainingComponent,
    MaMAterialToolMachineSetupComponent,
    MaInputScanComponent,
    MaOutputScanComponent,
    MaOperationComponent,
    MaLabelScrapBookingComponent,
    MaRecipeComponent,
    //MachineSetupComponent,
    //PreHeatingComponent,
    //OutputCarrierScanComponent,
    //OperationComponent,
    //RecipeSetupComponent,
    // GrillSelectionComponent,
    //HotPressComponent,
    // OfflinePrePressComponent,
    //ScrapBookingComponent,
    //IpCarrierScanComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,

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
  providers: [UrlService],
})
export class TrainingModule {}
