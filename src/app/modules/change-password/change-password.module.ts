import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';
import { ChangePasswordPage } from './change-password.page';
import { VelocityOtpInputModule } from '@commons/velocity/molecules/velocity-otp-input/velocity-otp-input.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { ChangePasswordComponent } from '@modules/change-password/components/change-password/change-password.component';
import { SuccessfulChangeComponent } from '@modules/change-password/components/successful-change/successful-change.component';
import {
  changePasswordFeatureName,
  IChangePasswordState
} from '@modules/change-password/store/change-password.state';
import { ChangePasswordEffect } from '@modules/change-password/store/change-password.effect';
import { ChangePasswordService } from '@modules/change-password/services/change-password.service';
import { featureChangePassword } from '@modules/change-password/store/change-password.reducer';
import { ChangePasswordFacade } from '@modules/change-password/change-password.facade';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { NgOtpInputModule } from '@commons/components/ng-otp-input/ng-otp-input.module';
import { VelocityCustomValidatorMessageModule } from '@commons/velocity/atoms/velocity-custom-validator-message/velocity-custom-validator-message.module';

export const FEATURE_CHANGE_PASSWORD_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IChangePasswordState>
>('Change Password Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule,
    CustomHeaderModule,
    VelocityOtpInputModule,
    VelocityImageTitleModule,
    VelocityButtonModule,
    GlobalPipesModule,
    ContErrorModule,
    StoreModule.forFeature(
      changePasswordFeatureName,
      FEATURE_CHANGE_PASSWORD_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([ChangePasswordEffect]),
    CustomHeaderModule,
    NgOtpInputModule,
    VelocityCustomValidatorMessageModule
  ],
  declarations: [
    ChangePasswordPage,
    ChangePasswordComponent,
    SuccessfulChangeComponent
  ],
  providers: [
    ChangePasswordService,
    {
      provide: FEATURE_CHANGE_PASSWORD_REDUCER_TOKEN,
      useValue: featureChangePassword
    },
    ChangePasswordFacade
  ]
})
export class ChangePasswordPageModule {}
