import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { IonicModule } from '@ionic/angular';

import { AdvancesRoutingModule } from './advances-routing.module';
import { AdvancesPage } from './advances.page';
import {
  advancesFeatureName,
  IAdvanceState
} from '@modules/detail/advances/new-advance/store/advances.state';
import { featureAdvance } from '@modules/detail/advances/new-advance/store/advances.reducer';
import { AdvancesEffect } from '@modules/detail/advances/new-advance/store/advances.effect';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocityBoxInputModule } from '@commons/velocity/molecules/velocity-box-input/velocity-box-input.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FormAdvanceComponent } from '@modules/detail/advances/new-advance/components/form-advance/form-advance.component';
import { AdvancesService } from '@modules/detail/advances/new-advance/services/advances.service';
import { AdvancesFacade } from '@modules/detail/advances/new-advance/advances.facade';
import { VelocitySmallCardModule } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.module';
import { VelocityTransactionCostModule } from '@commons/velocity/molecules/velocity-transaction-cost/velocity-transaction-cost.module';
import { VelocityCardLiteCreditCardModule } from '@commons/velocity/organisms/velocity-card-lite-credit-card/velocity-card-lite-credit-card.module';
import { InitTemplateAdvanceGuard } from '@modules/detail/advances/new-advance/guard/init-template-advance.guard';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

export const FEATURE_ADVANCES_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IAdvanceState>
>('Advances Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdvancesRoutingModule,
    VelocityButtonModule,
    VelocityBoxInputModule,
    VelocitySmallCardModule,
    VelocityTransactionCostModule,
    VelocityCardLiteCreditCardModule,
    ContErrorModule,
    GlobalDirectivesModule,
    GlobalPipesModule,
    StoreModule.forFeature(advancesFeatureName, FEATURE_ADVANCES_REDUCER_TOKEN),
    EffectsModule.forFeature([AdvancesEffect]),
    CustomHeaderModule
  ],
  declarations: [AdvancesPage, FormAdvanceComponent],
  providers: [
    AdvancesService,
    AdvancesFacade,
    InitTemplateAdvanceGuard,
    {
      provide: FEATURE_ADVANCES_REDUCER_TOKEN,
      useValue: featureAdvance
    }
  ]
})
export class AdvancesModule {}
