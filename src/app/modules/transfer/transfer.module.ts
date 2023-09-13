import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  INewTransfersState,
  newTransferFeatureName
} from '@modules/transfer/store/transfer.state';
import { NewTransferEffect } from '@modules/transfer/store/effects/transfer.effect';
import { RegisteredAccountEffect } from '@modules/transfer/store/effects/registered-account.effect';
import { newTransfersRootReducer } from '@modules/transfer/store/reducers';
import { RegisteredAccountService } from '@modules/transfer/services/registered-account.service';
import { NewTransferService } from '@modules/transfer/services/transfer.service';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { HomeFacade } from '@modules/home/home.facade';

export const FEATURE_NEW_TRANSFER_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<INewTransfersState>
>('New Transfer Module State');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      newTransferFeatureName,
      FEATURE_NEW_TRANSFER_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([RegisteredAccountEffect, NewTransferEffect])
  ],
  providers: [
    RegisteredAccountService,
    NewTransferService,
    NewTransferFacade,
    HomeFacade,
    {
      provide: FEATURE_NEW_TRANSFER_REDUCER_TOKEN,
      useValue: newTransfersRootReducer
    }
  ]
})
export class TransferModule {}
