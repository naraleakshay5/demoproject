import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsInputCarrierScanComponent } from './ps-input-carrier-scan/ps-input-carrier-scan.component';
import { PreScanComponent } from './pre-scan.component';
import { MaInputCarrierScanComponent } from './ma-input-carrier-scan/ma-input-carrier-scan.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ip-carrier-scan-hp',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PreScanComponent,
    data: {
      title: '',
    },
    children: [
      {
        path: 'ip-carrier-scan-ma',
        component: MaInputCarrierScanComponent,
        data: {
          title: '',
        },
      },
      {
        path: 'ip-carrier-scan-hp',
        component: PsInputCarrierScanComponent,
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
export class PreScanRoutingModule {}
