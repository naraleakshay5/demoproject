import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResDrumLoadComponent } from './res-drum-load/res-drum-load.component';
import { ResRecipeSetUpComponent } from './res-recipe-set-up/res-recipe-set-up.component';
import { ResStrokeComponent } from './res-stroke/res-stroke.component';
import { ResTankFillingComponent } from './res-tank-filling/res-tank-filling.component';
import { ResinComponent } from './resin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'resin',
    pathMatch: 'full',
  },
  {
    path: 'resin',
    component: ResinComponent,
    data: {
      title: '',
    },
  },
  {
    path: 'recipe-setup',
    component: ResRecipeSetUpComponent,
    data: {
      title: '',
    },
  },
  {
    path: 'load-drum',
    component: ResDrumLoadComponent,
    data: {
      title: '',
    },
  },
  {
    path: 'tank-filling',
    component: ResTankFillingComponent,
    data: {
      title: '',
    },
  },
  {
    path: 'stroke-weight',
    component: ResStrokeComponent,
    data: {
      title: '',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResinRoutingModule {}
