import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: () =>
      import('./pages/new-tax-certificates/new-tax-certificates.module').then(
        (m) => m.NewTaxCertificatesPageModule
      )
  },
  {
    path: 'certificados-tc',
    loadChildren: () =>
      import('./pages/certificates-tc/certificates-tc.module').then(
        (m) => m.CertificatesTcPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxCertificatesRoutingModule {}
