import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TuplusPageRoutingModule } from './tuplus-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { TuplusPage } from './tuplus.page';
import { TuplusFacade } from './tuplus.facade';
import { VelocityButtonModule } from '@app/commons/velocity/atoms/velocity-button/velocity-button.module';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { CustomHeaderModule } from '@app/commons/components/custom-header/custom-header.module';
import { ContErrorModule } from '../forms/cont-error/cont-error.module';
import { ContainerMovementsComponent } from './components/container-movements-tuplus/cont-movements.component';
import { MovementComponent } from './components/movement/movement.component';
import { MovementsFilterComponentTuplus } from './components/movements-filter-tuplus/movements-filter.component';
import { WhereToRedeemComponent } from '@modules/tuplus/components/container-where-to-redeem-tuplus/where-to-redeem.component';
import { VelocityWithdrawalPlaceModule } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.module';
import { FormRedeemComponent } from './components/form-redeem/form-redeem.component';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { VelocitySmallCardModule } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.module';
import { VelocityCardLiteCreditCardModule } from '@commons/velocity/organisms/velocity-card-lite-credit-card/velocity-card-lite-credit-card.module';
import {
  detailTuplusFeatureName,
  IDetailTuplusState
} from '@modules/tuplus/store/states/index-tuplus.state';
import { tuplusRootReducer } from '@modules/tuplus/store/reducers';
import { MovementsTuplusService } from '@modules/tuplus/services/movements-tuplus.service';
import { MovementsTuPlusEffect } from '@modules/tuplus/store/effects/movement-tuplus.effect';
import { HomePageModule } from '@modules/home/home.module';
import { OptionRedemptionComponent } from './components/option-redemption/option-redemption.component';
import { ConfigurationService } from '@modules/tuplus/services/configuration.service';
import { ConversionFactorEffect } from '@modules/tuplus/store/effects/conversion-factor.effect';
import { FilterMovementsTuplusPipe } from './pipes/filter-movements-tuplus.pipe';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { RedemptionTuplusService } from '@modules/tuplus/services/redemption-tuplus.service';
import { RedeemEffect } from '@modules/tuplus/store/effects/redeem-tuplus.effect';
import { VelocityOtpInputModule } from '@commons/velocity/molecules/velocity-otp-input/velocity-otp-input.module';
import { LogoutTuplusService } from '@modules/tuplus/services/logout-tuplus.service';
import { ContainerDetailComponentTuplus } from '@modules/tuplus/components/container-detail-tuplus/container-tuplus-detail.component';
import { OtpRedeemTuplusComponent } from './components/otp-redeem-tuplus/otp-redeem-tuplus.component';
import { OtpGenerationTuplusService } from '@modules/tuplus/services/otp-generation-tuplus.service';
import { GenerateOtpEffect } from '@modules/tuplus/store/effects/generate-otp-tuplus.effect';
import { LogoutTuplusEffects } from '@modules/tuplus/store/effects/logout-tuplus.effect';
import { VelocityCustomMessageModule } from '@commons/velocity/molecules/velocity-custom-message/velocity-custom-message.module';
import { VelocityDetailPointsBankModule } from '@commons/velocity/molecules/velocity-detail-points-bank/velocity-detail-points-bank.module';
import { OrderBanksTuplusPipe } from './pipes/order-banks-tuplus.pipe';
import { VelocityMovementByBankModule } from '@commons/velocity/molecules/velocity-movement-by-bank/velocity-movement-by-bank.module';

export const FEATURE_TUPLUS_TOKEN = new InjectionToken<
  ActionReducerMap<IDetailTuplusState>
>('Tuplus Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TuplusPageRoutingModule,
    VelocityButtonModule,
    VelocityCardLiteCreditCardModule,
    VelocitySmallCardModule,
    VelocityMovementByBankModule,
    VelocityImageTitleModule,
    VelocityWithdrawalPlaceModule,
    VelocityCustomMessageModule,
    VelocityDetailPointsBankModule,
    VelocityOtpInputModule,
    GlobalPipesModule,
    CustomHeaderModule,
    ContErrorModule,
    StoreModule.forFeature(detailTuplusFeatureName, FEATURE_TUPLUS_TOKEN),
    EffectsModule.forFeature([
      MovementsTuPlusEffect,
      ConversionFactorEffect,
      RedeemEffect,
      GenerateOtpEffect,
      LogoutTuplusEffects
    ]),
    HomePageModule,
    GlobalDirectivesModule,
    RouterModule
  ],
  declarations: [
    TuplusPage,
    ContainerMovementsComponent,
    MovementComponent,
    WhereToRedeemComponent,
    FormRedeemComponent,
    OptionRedemptionComponent,
    FilterMovementsTuplusPipe,
    MovementsFilterComponentTuplus,
    ContainerDetailComponentTuplus,
    OtpRedeemTuplusComponent,
    OrderBanksTuplusPipe
  ],
  exports: [ContainerMovementsComponent],
  providers: [
    TuplusFacade,
    MovementsTuplusService,
    ConfigurationService,
    RedemptionTuplusService,
    LogoutTuplusService,
    OtpGenerationTuplusService,
    {
      provide: FEATURE_TUPLUS_TOKEN,
      useValue: tuplusRootReducer
    }
  ]
})
export class TuplusPageModule {}
