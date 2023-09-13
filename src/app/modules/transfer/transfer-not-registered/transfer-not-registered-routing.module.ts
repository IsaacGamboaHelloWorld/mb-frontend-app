import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitTemplateGuard } from '@modules/transfer/transfer-not-registered/guard/init-template.guard';
import { TransferNotRegisteredPage } from '@modules/transfer/transfer-not-registered/transfer-not-registered.page';
const routes: Routes = [
  {
    path: '',
    component: TransferNotRegisteredPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TransferNotRegisteredPage,
        canActivate: [InitTemplateGuard],
        loadChildren: () =>
          import(
            '@commons/velocity/templates/basic-template/basic-template-routing.module'
          ).then((m) => m.BasicTemplateRoutingModule)
      }
    ])
  ],
  exports: [RouterModule]
})
export class TransferNotRegisteredPageRoutingModule {}
