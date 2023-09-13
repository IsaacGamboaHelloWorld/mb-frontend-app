import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: () =>
      import('./pages/new-certificates/new-certificates.module').then(
        (m) => m.NewCertificatesPageModule
      )
  },
  {
    path: 'detalle',
    loadChildren: () =>
      import(
        './pages/certificates-product-detail/certificates-product-detail.module'
      ).then((m) => m.CertificatesProductDetailModule)
  },
  {
    path: 'new-certificates',
    loadChildren: () =>
      import('./pages/new-certificates/new-certificates.module').then(
        (m) => m.NewCertificatesPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule {}
