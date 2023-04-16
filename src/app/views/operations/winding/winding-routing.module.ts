import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WindingComponent } from './winding.component';
import { WdMaterialCheckComponent } from './wd-material-check/wd-material-check.component';
import { WdMaterialCheckFlimRollsComponent } from './wd-material-check/wd-material-check-flim-rolls/wd-material-check-flim-rolls.component';
import { WdToolCheckComponent } from './wd-tool-check/wd-tool-check.component';
import { WdRecipeSetupComponent } from './wd-recipe-setup/wd-recipe-setup.component';
import { WdOPCarrierBinComponent } from './wd-opcarrier-bin/wd-opcarrier-bin.component';
import { WdWindingComponent } from './wd-winding/wd-winding.component';
import { WdLabelPrintingComponent } from './wd-label-printing/wd-label-printing.component';
import { WdRecipeSetupMakingTrialPartComponent } from './wd-recipe-setup/wd-recipe-setup-making-trial-part/wd-recipe-setup-making-trial-part.component';
import { WdRecipeSetupVisualInspectionComponent } from './wd-recipe-setup/wd-recipe-setup-visual-inspection/wd-recipe-setup-visual-inspection.component';
import { WdMachineRecipeSetupComponent } from './wd-recipe-setup/wd-machine-recipe-setup/wd-machine-recipe-setup.component';
import { ScrapBookingComponent } from '../Shared/scrap-booking/scrap-booking.component';
import { LogoutComponent } from '../Shared/logout/logout.component';
import { WdVisualInspectionComponent } from './wd-visual-inspection/wd-visual-inspection.component';
import { WdSpcComponent } from './wd-spc/wd-spc.component';
import { WdMeasurementComponent } from './wd-measurement/wd-measurement.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'material-check',
    pathMatch: 'full',
  },
  {
    path: '',
    component: WindingComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'material-check',
        component: WdMaterialCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'material-check/films',
        component: WdMaterialCheckFlimRollsComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'tool-check',
        component: WdToolCheckComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup',
        component: WdRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup/making-trial-parts',
        component: WdRecipeSetupMakingTrialPartComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'recipe-setup/visual-inspection',
        component: WdRecipeSetupVisualInspectionComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'spc',
        component: WdSpcComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'visual-inspection',
        component: WdVisualInspectionComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'measurement',
        component: WdMeasurementComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'machine-setup',
        component: WdMachineRecipeSetupComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'scrap-booking',
        component: ScrapBookingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'output-carrier',
        component: WdOPCarrierBinComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'winding',
        component: WdWindingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'label-printing',
        component: WdLabelPrintingComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: {
          title: '',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WindingRoutingModule {}
