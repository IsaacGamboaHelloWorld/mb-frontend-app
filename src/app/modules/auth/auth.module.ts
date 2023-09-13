import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import {
  authFeatureName,
  IEnrollmentState
} from '@modules/auth/store/auth.state';
import { authReducer } from '@modules/auth/store/auth.reducer';
import { AuthEffect } from '@modules/auth/store/auth.effect';
import { AuthFacade } from '@modules/auth/auth.facade';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { VelocityLoaderModule } from '@commons/velocity/molecules/velocity-loader/velocity-loader.module';

export const FEATURE_AUTH_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IEnrollmentState>
>('Auth Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VelocityButtonModule,
    GlobalPipesModule,
    GlobalDirectivesModule,
    StoreModule.forFeature(authFeatureName, FEATURE_AUTH_REDUCER_TOKEN),
    EffectsModule.forFeature([AuthEffect]),
    VelocityLoaderModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    VelocityButtonModule,
    CommonModule,
    GlobalPipesModule
  ],
  providers: [
    AuthFacade,
    FingerprintAIO,
    {
      provide: FEATURE_AUTH_REDUCER_TOKEN,
      useValue: authReducer
    }
  ]
})
export class AuthModule {}
