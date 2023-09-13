import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferWithdrawalRoutingModule } from './transfer-withdrawal-routing.module';

import { TransferWithdrawalPage } from './transfer-withdrawal.page';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  ITransferWithdrawalState,
  transferWithdrawalFeatureName
} from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.state';
import { featureTransferWithdrawalReducer } from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransferWithdrawalEffect } from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.effect';
import { TransferWithdrawalFacade } from '@modules/transfer-withdrawal/new-withdrawal/transfer-withdrawal.facade';
import { TransferWithdrawalService } from '@modules/transfer-withdrawal/new-withdrawal/services/transfer-withdrawal.service';
import { FormTransferWithdrawalComponent } from '@modules/transfer-withdrawal/new-withdrawal/components/form-transfer-withdrawal/form-transfer-withdrawal.component';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityBoxInputModule } from '@commons/velocity/molecules/velocity-box-input/velocity-box-input.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { VelocitySmallCardModule } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.module';
import { VelocityTransactionCostModule } from '@commons/velocity/molecules/velocity-transaction-cost/velocity-transaction-cost.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocityWithdrawalPlaceModule } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.module';
import { InitTemplateTransferWithdrawalGuard } from '@modules/transfer-withdrawal/new-withdrawal/guard/init-template-transfer-withdrawal.guard';
import { ModalInfoComponent } from '@modules/transfer-withdrawal/new-withdrawal/components/modal-info/modal-info.component';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

export const FEATURE_TRANSFER_WITHDRAWAL_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ITransferWithdrawalState>
>('Transfer Withdrawal Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TransferWithdrawalRoutingModule,
    VelocityButtonModule,
    VelocityBoxInputModule,
    VelocityWithdrawalPlaceModule,
    VelocitySmallCardModule,
    VelocityTransactionCostModule,
    ContErrorModule,
    GlobalDirectivesModule,
    GlobalPipesModule,
    StoreModule.forFeature(
      transferWithdrawalFeatureName,
      FEATURE_TRANSFER_WITHDRAWAL_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([TransferWithdrawalEffect]),
    CustomHeaderModule
  ],
  declarations: [
    TransferWithdrawalPage,
    FormTransferWithdrawalComponent,
    ModalInfoComponent
  ],
  providers: [
    TransferWithdrawalFacade,
    TransferWithdrawalService,
    InitTemplateTransferWithdrawalGuard,
    {
      provide: FEATURE_TRANSFER_WITHDRAWAL_REDUCER_TOKEN,
      useValue: featureTransferWithdrawalReducer
    }
  ]
})
export class TransferWithdrawalModule {}
