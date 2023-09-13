import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransferWithdrawalPage } from './transfer-withdrawal.page';
import { InitTemplateTransferWithdrawalGuard } from '@modules/transfer-withdrawal/new-withdrawal/guard/init-template-transfer-withdrawal.guard';

const routes: Routes = [
  {
    path: '',
    component: TransferWithdrawalPage,
    canActivate: [InitTemplateTransferWithdrawalGuard],
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
export class TransferWithdrawalRoutingModule {}
