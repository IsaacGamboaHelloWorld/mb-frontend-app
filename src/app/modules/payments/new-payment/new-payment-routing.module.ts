import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPaymentPage } from 'src/app/modules/payments/new-payment/new-payment.page';
import { InitTemplatePaymentGuard } from '@modules/payments/new-payment/guard/init-template-payment.guard';

const routes: Routes = [
  {
    path: '',
    component: NewPaymentPage,
    canActivate: [InitTemplatePaymentGuard],
    loadChildren: () =>
      import(
        '@commons/velocity/templates/advance-template/advance-template.module'
      ).then((m) => m.AdvanceTemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPaymentRoutingModule {}
