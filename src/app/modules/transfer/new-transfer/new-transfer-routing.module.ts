import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NewTransferPage } from '@modules/transfer/new-transfer/new-transfer.page';
import { InitTemplateTransferGuard } from '@modules/transfer/new-transfer/guard/init-template-transfer.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NewTransferPage,
        canActivate: [InitTemplateTransferGuard],
        loadChildren: () =>
          import(
            '@commons/velocity/templates/advance-template/advance-template.module'
          ).then((m) => m.AdvanceTemplateModule)
      }
    ])
  ],
  exports: [RouterModule]
})
export class NewTransferRoutingModule {}
