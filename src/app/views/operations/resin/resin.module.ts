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

import { ResinRoutingModule } from './resin-routing.module';
import { ResinComponent } from '../resin/resin.component';
import { ResRecipeSetUpComponent } from './res-recipe-set-up/res-recipe-set-up.component';
import { ResTankFillingComponent } from './res-tank-filling/res-tank-filling.component';
import { ResDrumLoadComponent } from './res-drum-load/res-drum-load.component';
import { ResStrokeComponent } from './res-stroke/res-stroke.component';
import { SharedModules } from '../Shared/shared.module';

@NgModule({
  declarations: [
    ResinComponent,
    ResRecipeSetUpComponent,
    ResTankFillingComponent,
    ResDrumLoadComponent,
    ResStrokeComponent,
  ],
  imports: [
    CommonModule,
    ResinRoutingModule,
    SharedModules,
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
  ],
})
export class ResinModule {}
