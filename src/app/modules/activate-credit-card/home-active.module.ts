import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { IonicModule } from '@ionic/angular';

import { HomeActivePageRoutingModule } from './home-active-routing.module';

import { HomeActivePage } from './home-active.page';
import { ChangeStatusCreditCardService } from '@modules/activate-credit-card/services/change-status-credit-card.service';
import {
  activeCreditCardFeatureName,
  IActiveBlockCreditCardState
} from '@modules/activate-credit-card/store/active-credit-card.state';
import { activeBlockCreditCardRootReducer } from '@modules/activate-credit-card/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ActiveCreditCardEffect } from '@modules/activate-credit-card/store/active-credit-card.effect';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HomeActiveFacade } from '@modules/activate-credit-card/home-active.facade';
import { VelocityCardCreditCardModule } from '@commons/velocity/organisms/velocity-card-credit-card/velocity-card-credit-card.module';
import { ActiveCardComponent } from '@modules/activate-credit-card/components/active-card/active-card.component';
import { VelocityToggleLabelModule } from '@commons/velocity/molecules/velocity-toggle-label/velocity-toggle-label.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { InitTemplateCreditCardGuard } from '@modules/activate-credit-card/guard/init-template-credit-card.guard';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

const FEATURE_ACTIVE_BLOCK_CREDIT_CARD_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IActiveBlockCreditCardState>
>('Active Block Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomeActivePageRoutingModule,
    ContErrorModule,
    GlobalDirectivesModule,
    GlobalPipesModule,
    VelocityCardCreditCardModule,
    VelocityToggleLabelModule,
    VelocityButtonModule,
    VelocityModalLeaveModule,
    TranslateModule,
    VelocityImageTitleModule,
    StoreModule.forFeature(
      activeCreditCardFeatureName,
      FEATURE_ACTIVE_BLOCK_CREDIT_CARD_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([ActiveCreditCardEffect]),
    CustomHeaderModule
  ],
  declarations: [HomeActivePage, ActiveCardComponent],
  providers: [
    ChangeStatusCreditCardService,
    HomeActiveFacade,
    InitTemplateCreditCardGuard,
    {
      provide: FEATURE_ACTIVE_BLOCK_CREDIT_CARD_REDUCER_TOKEN,
      useValue: activeBlockCreditCardRootReducer
    }
  ]
})
export class HomeActivePageModule {}
