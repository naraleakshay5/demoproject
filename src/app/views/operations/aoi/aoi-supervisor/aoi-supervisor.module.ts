import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AoiSupervisorRoutingModule } from './aoi-supervisor-routing.module';
import { AoiSupervisorSortingComponent } from './aoi-supervisor-sorting/aoi-supervisor-sorting.component';
import { AoiSupervisorCheckoutComponent } from './aoi-supervisor-checkout/aoi-supervisor-checkout.component';
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
import { SharedModules } from '../../Shared/shared.module';
import { AoiSupervisorProcessorComponent } from './aoi-supervisor-processor/aoi-supervisor-processor.component';
import { AoiSupervisorDataFlowComponent } from './aoi-data/aoi-supervisor-data-flow/aoi-supervisor-data-flow.component';
import { AoiSupervisorCheckoutFlowComponent } from './aoi-supervisor-checkout/aoi-supervisor-checkout-flow/aoi-supervisor-checkout-flow.component';

@NgModule({
  declarations: [AoiSupervisorSortingComponent, AoiSupervisorCheckoutComponent, AoiSupervisorProcessorComponent, AoiSupervisorDataFlowComponent, AoiSupervisorCheckoutFlowComponent],
  imports: [
    CommonModule,
    AoiSupervisorRoutingModule,
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
export class AoiSupervisorModule {}
