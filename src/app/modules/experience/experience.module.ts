import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ExperiencePageRoutingModule } from './experience-routing.module';
import { ExperiencePage } from './experience.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { RetriesLimitExceedComponent } from './components/retries-limit-exceed/retries-limit-exceed.component';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { ExperienceCompletedComponent } from './components/experience-completed/experience-completed.component';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { LottieModule } from '@commons/components/lottie/lottie.module';
import { VelocityCardServiceModule } from '@commons/velocity/molecules/velocity-card-service/velocity-card-service.module';
import { HavePinDebitCardEnable } from './components/have-pin-debit-card-enable/have-pin-debit-card-enable.component';
import { DoesntHavePinCardEnableComponent } from './components/doesnt-have-pin-enable/doesnt-have-pin-card-enable.component';
import { VelocityCardRequestProductModule } from '@commons/velocity/molecules/velocity-card-request-product/velocity-card-request-product.module';
import { VelocityServiceItemModule } from '@commons/velocity/molecules/velocity-service-item/velocity-service-item.module';
import { ActivateCardComponent } from './components/activate-card/activate-card.component';
import {
  experienceFeatureName,
  IExperienceState
} from '@modules/experience/store/experience.state';
import { ExperienceEffect } from '@modules/experience/store/experience.effects';
import { experienceReducer } from '@modules/experience/store/experience.reducer';
import { FillSecurityQuestionComponent } from './components/fill-security-question-experience/fill-security-question-experience.component';
import { ServiceErrorExperienceComponent } from './components/service-error-experience/service-error-experience.component';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { NgOtpInputModule } from '@commons/components/ng-otp-input/ng-otp-input.module';
import { ExperienceFacade } from '@modules/experience/experience.facade';
import { VelocityOtpInputModule } from '@commons/velocity/molecules/velocity-otp-input/velocity-otp-input.module';
import { ModalOtpIosExperienceComponent } from './components/modal-otp-ios-experience/modal-otp-ios-experience.component';
import { FillOtpDataExperienceComponent } from './components/fill-otp-data-experience/fill-otp-data-experience.component';
import { VelocityToastModule } from '@commons/velocity/molecules/velocity-toast/velocity-toast.module';

export const FEATURE_EXPERIENCE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IExperienceState>
>('Experience Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExperiencePageRoutingModule,
    GlobalPipesModule,
    VelocityImageTitleModule,
    VelocityButtonModule,
    GlobalPipesModule,
    CustomHeaderModule,
    LottieModule,
    VelocityCardServiceModule,
    VelocityCardRequestProductModule,
    VelocityServiceItemModule,
    VelocityOtpInputModule,
    ContErrorModule,
    NgOtpInputModule,
    VelocityToastModule,
    StoreModule.forFeature(
      experienceFeatureName,
      FEATURE_EXPERIENCE_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([ExperienceEffect]),
    VelocityOtpInputModule,
    ContErrorModule,
    NgOtpInputModule,
    VelocityToastModule
  ],
  declarations: [
    ExperiencePage,
    RetriesLimitExceedComponent,
    ExperienceCompletedComponent,
    HavePinDebitCardEnable,
    DoesntHavePinCardEnableComponent,
    ActivateCardComponent,
    FillSecurityQuestionComponent,
    FillOtpDataExperienceComponent,
    ModalOtpIosExperienceComponent,
    ServiceErrorExperienceComponent
  ],
  providers: [
    ExperienceFacade,
    FingerprintAIO,
    {
      provide: FEATURE_EXPERIENCE_REDUCER_TOKEN,
      useValue: experienceReducer
    }
  ]
})
export class ExperiencePageModule {}
