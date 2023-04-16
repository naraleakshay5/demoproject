import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { ModulesComponent } from './views/modules/modules.component';
import { PoListComponent } from './views/operations/Shared/po-list/po-list.component';
import { SapConfirmationComponent } from './views/operations/Shared/sap-confirmation/sap-confirmation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Modules',
    pathMatch: 'full',
  },
  {
    path: 'Modules',
    component: ModulesComponent,
    data: {
      title: 'Modules',
    },
  },
  {
    path: 'training',
    loadChildren: () =>
      import('./views/training/training.module').then((m) => m.TrainingModule),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'po-list',
        component: PoListComponent,
        data: {
          title: 'Modules',
        },
      },
      {
        path: 'sap-confirmation',
        component: SapConfirmationComponent,
        data: {
          title: 'Modules',
        },
      },
      {
        path: 'aoi-sup',
        loadChildren: () =>
          import(
            './views/operations/aoi/aoi-supervisor/aoi-supervisor.module'
          ).then((m) => m.AoiSupervisorModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./views/authentication/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'op/wd',
        loadChildren: () =>
          import('./views/operations/winding/winding.module').then(
            (m) => m.WindingModule
          ),
      },
      {
        path: 'op/ps',
        loadChildren: () =>
          import('./views/operations/pre-scan/pre-scan.module').then(
            (m) => m.PreScanModule
          ),
      },
      {
        path: 'op/hp',
        loadChildren: () =>
          import('./views/operations/hot-press/hot-press.module').then(
            (m) => m.HotPressModule
          ),
      },
      {
        path: 'op/ma',
        loadChildren: () =>
          import('./views/operations/masking/masking.module').then(
            (m) => m.MaskingModule
          ),
      },
      {
        path: 'op/ms',
        loadChildren: () =>
          import('./views/operations/metal-spray/metal-spray.module').then(
            (m) => m.MetalSprayModule
          ),
      },
      {
        path: 'op/dd',
        loadChildren: () =>
          import(
            './views/operations/DemaskDeburring/demask-deburring.module'
          ).then((m) => m.DemaskDeburringModule),
      },
      {
        path: 'op/tmp',
        loadChildren: () =>
          import('./views/operations/tempering/tempering.module').then(
            (m) => m.TemperingModule
          ),
      },
      {
        path: 'op/as',
        loadChildren: () =>
          import('./views/operations/assembly/assembly.module').then(
            (m) => m.AssemblyModule
          ),
      },
      {
        path: 'op/el',
        loadChildren: () =>
          import(
            './views/operations/electrical-testing/electrical-testing.module'
          ).then((m) => m.ElectricalTestingModule),
      },
      {
        path: 'op/aoi',
        loadChildren: () =>
          import('./views/operations/aoi/aoi-operator/aoi.module').then(
            (m) => m.AoiModule
          ),
      },
      {
        path: 'op/offline',
        loadChildren: () =>
          import(
            './views/operations/offline-clearing/offline-clearing.module'
          ).then((m) => m.OfflineClearingModule),
      },
      {
        path: 'op/fqa',
        loadChildren: () =>
          import('./views/operations/fqa/fqa.module').then((m) => m.FqaModule),
      },
      {
        path: 'op/tp',
        loadChildren: () =>
          import('./views/operations/taping/taping.module').then(
            (m) => m.TapingModule
          ),
      },
      {
        path: 'op/res',
        loadChildren: () =>
          import('./views/operations/resin/resin.module').then(
            (m) => m.ResinModule
          ),
      },
      {
        path: 'batchcard',
        loadChildren: () =>
          import('./views/batchcard/batchcard.module').then(
            (m) => m.BatchcardModule
          ),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
