import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestProductPage } from './request-product.page';

const routes: Routes = [
  {
    path: '',
    component: RequestProductPage
  },
  {
    path: 'informacion',
    loadChildren: () =>
      import('../open-account-custom/open-account-custom.module').then(
        (m) => m.OpenAccountCustomPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestProductPageRoutingModule {}
