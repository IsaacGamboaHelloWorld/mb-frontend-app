import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { IonicModule } from '@ionic/angular';

import { FormRechargeComponent } from '@modules/recharges/new-recharge/components/form-recharge/form-recharge.component';
import { OperatorsNameService } from '@modules/recharges/new-recharge/services/operators-name.service';
import { CellPhoneRechargeService } from '@modules/recharges/new-recharge/services/cell-phone-recharge.service';
import {
  IRechargesState,
  rechargeFeatureName
} from '@modules/recharges/new-recharge/store/recharges.state';
import { rechargesRootReducer } from '@modules/recharges/new-recharge/store/reducers';
import { RechargeEffect } from '@modules/recharges/new-recharge/store/effects/recharge.effect';
import { OperatorsEffect } from '@modules/recharges/new-recharge/store/effects/operators.effect';
import { RechargesFacade } from '@modules/recharges/new-recharge/recharges.facade';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { RechargesPage } from '@modules/recharges/new-recharge/recharges.page';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocitySmallCardModule } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.module';
import { VelocityTransactionCostModule } from '@commons/velocity/molecules/velocity-transaction-cost/velocity-transaction-cost.module';
import { VelocityOperatorModule } from '@commons/velocity/molecules/velocity-operator/velocity-operator.module';
import { VelocityBoxInputModule } from '@commons/velocity/molecules/velocity-box-input/velocity-box-input.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { RechargesRoutingModule } from '@modules/recharges/new-recharge/recharges-routing.module';
import { InitTemplateRechargeGuard } from '@modules/recharges/new-recharge/guard/init-template-recharge.guard';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

export const FEATURE_RECHARGE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IRechargesState>
>('Recharge Module State');

@NgModule({
  declarations: [FormRechargeComponent, RechargesPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    VelocityButtonModule,
    VelocitySmallCardModule,
    VelocityTransactionCostModule,
    VelocityOperatorModule,
    VelocityBoxInputModule,
    ContErrorModule,
    GlobalDirectivesModule,
    RechargesRoutingModule,
    GlobalPipesModule,
    StoreModule.forFeature(rechargeFeatureName, FEATURE_RECHARGE_REDUCER_TOKEN),
    EffectsModule.forFeature([RechargeEffect, OperatorsEffect]),
    CustomHeaderModule
  ],
  providers: [
    OperatorsNameService,
    CellPhoneRechargeService,
    RechargesFacade,
    InitTemplateRechargeGuard,
    {
      provide: FEATURE_RECHARGE_REDUCER_TOKEN,
      useValue: rechargesRootReducer
    }
  ]
})
export class RechargesModule {
  constructor() {}
}
