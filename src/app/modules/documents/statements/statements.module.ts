import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  IStatementsState,
  statementsFeatureName
} from '@modules/documents/statements/store/statements.state';
import { EffectsModule } from '@ngrx/effects';
import { StatementsEffect } from '@modules/documents/statements/store/statements.effect';
import { StatementsFacade } from '@modules/documents/statements/statements.facade';
import { StatementsService } from '@modules/documents/statements/services/statements.service';
import { statementsRootReducer } from '@modules/documents/statements/store/reducers';
import { StatementsRoutingModule } from '@modules/documents/statements/statements-routing.module';

export const FEATURE_STATEMENTS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IStatementsState>
>('Statements Module State');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatementsRoutingModule,
    StoreModule.forFeature(
      statementsFeatureName,
      FEATURE_STATEMENTS_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([StatementsEffect])
  ],
  providers: [
    StatementsFacade,
    StatementsService,
    {
      provide: FEATURE_STATEMENTS_REDUCER_TOKEN,
      useValue: statementsRootReducer
    }
  ]
})
export class StatementsModule {}
