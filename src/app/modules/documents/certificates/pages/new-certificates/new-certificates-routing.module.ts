import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewCertificatesPage } from './new-certificates.page';

const routes: Routes = [
  {
    path: '',
    component: NewCertificatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCertificatesPageRoutingModule {}
