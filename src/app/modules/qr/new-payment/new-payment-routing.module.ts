import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPaymentPage } from './new-payment.page';
import { InitTemplateQrGuard } from '@modules/qr/new-payment/guard/init-template-qr.guard';

const routes: Routes = [
  {
    path: '',
    component: NewPaymentPage,
    canActivate: [InitTemplateQrGuard],
    loadChildren: () =>
      import(
        '@commons/velocity/templates/basic-template/basic-template.module'
      ).then((m) => m.BasicTemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPaymentPageRoutingModule {}
