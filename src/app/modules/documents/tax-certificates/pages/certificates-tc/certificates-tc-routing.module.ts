import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CertificatesTcPage } from './certificates-tc.page';

const routes: Routes = [
  {
    path: '',
    component: CertificatesTcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesTcPageRoutingModule {}
