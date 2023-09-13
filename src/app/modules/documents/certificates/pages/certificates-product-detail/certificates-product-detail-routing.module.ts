import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CertificatesProductDetailPage } from './certificates-product-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CertificatesProductDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesPageRoutingModule {}
