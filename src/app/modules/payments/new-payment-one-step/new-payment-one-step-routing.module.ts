import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewPaymentOneStepPage } from './new-payment-one-step.page';
import { InitTemplatePaymentOneStepGuard } from '@modules/payments/new-payment-one-step/guard/init-template-payment-one-step.guard';

const routes: Routes = [
  {
    path: '',
    component: NewPaymentOneStepPage,
    canActivate: [InitTemplatePaymentOneStepGuard],
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
export class NewPaymentOneStepRoutingModule {}
