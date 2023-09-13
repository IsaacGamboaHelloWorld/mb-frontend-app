import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RechargesPage } from '@modules/recharges/new-recharge/recharges.page';
import { InitTemplateRechargeGuard } from '@modules/recharges/new-recharge/guard/init-template-recharge.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RechargesPage,
        canActivate: [InitTemplateRechargeGuard],
        loadChildren: () =>
          import(
            '@commons/velocity/templates/basic-template/basic-template.module'
          ).then((m) => m.BasicTemplateModule)
      }
    ])
  ],
  exports: [RouterModule]
})
export class RechargesRoutingModule {}
