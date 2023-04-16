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

import { TemperingRoutingModule } from './tempering-routing.module';
import { TemperingComponent } from '../tempering/tempering.component';
import { TemRecipeSetupComponent } from './tem-recipe-setup/tem-recipe-setup.component';
import { TemOperationComponent } from './tem-operation/tem-operation.component';
import { TemScrapBookingComponent } from './tem-scrap-booking/tem-scrap-booking.component';
import { TemInputTrolleysComponent } from './tem-input-trolleys/tem-input-trolleys.component';
import { TemLoadingTrolleysComponent } from './tem-loading-trolleys/tem-loading-trolleys.component';

@NgModule({
  declarations: [TemperingComponent, TemRecipeSetupComponent, TemOperationComponent, TemScrapBookingComponent, TemInputTrolleysComponent, TemLoadingTrolleysComponent],
  imports: [
    CommonModule,
    TemperingRoutingModule,
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
export class TemperingModule {}
