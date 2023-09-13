import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { BlockProductPageRoutingModule } from './block-product-routing.module';
import { BlockProductPage } from './block-product.page';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { BlockProductsFacade } from '@modules/block-product/block-products.facade';
import { VelocityToggleLabelModule } from '@commons/velocity/molecules/velocity-toggle-label/velocity-toggle-label.module';
import { VelocityCardCreditCardModule } from '@commons/velocity/organisms/velocity-card-credit-card/velocity-card-credit-card.module';
import { BlockProductService } from '@modules/block-product/services/block-product.service';
import {
  blockProductFeatureName,
  IFeatureBlockProductState
} from '@modules/block-product/store/block-product.state';
import { blockProductsRootReducer } from '@modules/block-product/store/reducers';
import { BlockProductEffect } from '@modules/block-product/store/effects/block-product.effect';
import { DebitCardListEffect } from '@modules/block-product/store/effects/debit-card-list.effect';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { ModalBlockComponent } from '@modules/block-product/components/modal-block/modal-block.component';
import { ModalGenericModule } from '@commons/components/modal-generic/modal-generic.module';
import { VelocityWithdrawalPlaceModule } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.module';
import { VelocityInfoWithLinesModule } from '@commons/velocity/atoms/velocity-info-with-lines/velocity-info-with-lines.module';
import { DebitCardListService } from '@modules/block-product/services/debit-card-list.service';
import { VelocityCardAccountModule } from '@commons/velocity/organisms/velocity-card-account/velocity-card-account.module';
import { ModalBlockAccountComponent } from '@modules/block-product/components/modal-block-account/modal-block-account.component';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

const FEATURE_BLOCK_PRODUCT_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IFeatureBlockProductState>
>('Block Product Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockProductPageRoutingModule,
    GlobalPipesModule,
    VelocityButtonModule,
    VelocityToggleLabelModule,
    VelocityCardCreditCardModule,
    VelocityCardAccountModule,
    VelocityImageTitleModule,
    ModalGenericModule,
    VelocityWithdrawalPlaceModule,
    VelocityInfoWithLinesModule,
    StoreModule.forFeature(
      blockProductFeatureName,
      FEATURE_BLOCK_PRODUCT_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([BlockProductEffect, DebitCardListEffect]),
    ReactiveFormsModule,
    CustomHeaderModule
  ],
  declarations: [
    BlockProductPage,
    ModalBlockComponent,
    ModalBlockAccountComponent
  ],
  providers: [
    BlockProductsFacade,
    BlockProductService,
    DebitCardListService,
    InAppBrowser,
    {
      provide: FEATURE_BLOCK_PRODUCT_REDUCER_TOKEN,
      useValue: blockProductsRootReducer
    }
  ]
})
export class BlockProductPageModule {}
