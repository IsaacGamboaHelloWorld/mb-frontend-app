import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WhereToRedeemComponent } from '@modules/tuplus/components/container-where-to-redeem-tuplus/where-to-redeem.component';
import { OptionRedemptionComponent } from '@modules/tuplus/components/option-redemption/option-redemption.component';
import { GuardWhereToRedeemGuard } from '@modules/tuplus/guard/guard-where-to-redeem.guard';
import { TuplusPage } from '@modules/tuplus/tuplus.page';
import { ContainerDetailComponentTuplus } from '@modules/tuplus/components/container-detail-tuplus/container-tuplus-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TuplusPage,
    children: [
      {
        path: 'detalle',
        component: ContainerDetailComponentTuplus
      },
      {
        path: 'opcion-redimir',
        component: OptionRedemptionComponent
      }
    ]
  },

  {
    path: 'donde-redimir',
    component: WhereToRedeemComponent,
    canActivateChild: [GuardWhereToRedeemGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuplusPageRoutingModule {}
