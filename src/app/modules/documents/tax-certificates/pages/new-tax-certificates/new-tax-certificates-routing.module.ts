import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewTaxCertificatesPage } from './new-tax-certificates.page';

const routes: Routes = [
  {
    path: '',
    component: NewTaxCertificatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewTaxCertificatesPageRoutingModule {}
