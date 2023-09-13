import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PocketsRoutingModule } from '@modules/pockets/pockets-routing.module';
import {
  IPocketsState,
  pocketsFeatureName
} from '@modules/pockets/store/pockets.state';
import { pocketsRootReducer } from '@modules/pockets/store/reducers';
import { PocketsModuleEffect } from '@modules/pockets/store/effects/pockets.effect';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { PocketsFacade } from '@modules/pockets/pockets.facade';

export const FEATURE_POCKETS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IPocketsState>
>('Pockets Module State');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PocketsRoutingModule,
    StoreModule.forFeature(pocketsFeatureName, FEATURE_POCKETS_REDUCER_TOKEN),
    EffectsModule.forFeature([PocketsModuleEffect])
  ],
  providers: [
    PocketsService,
    PocketsFacade,
    {
      provide: FEATURE_POCKETS_REDUCER_TOKEN,
      useValue: pocketsRootReducer
    }
  ]
})
export class PocketsModule {}
