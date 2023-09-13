import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { HomeFacade } from '@modules/home/home.facade';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { KeysPipe } from '@modules/home/pipes/keys.pipe';
import { GroupProductsComponent } from '@modules/home/components/group-products/group-products.component';
import { OrderProductsPipe } from '@modules/home/pipes/order-products.pipe';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityCardModule } from '@commons/velocity/organisms/velocity-card/velocity-card.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { VelocityCardFinanceModule } from '@commons/velocity/molecules/velocity-card-finance/velocity-card-finance.module';
import { FinancesComponent } from '@modules/home/components/finances/finances.component';
import { homeFeatureName, IHomeState } from '@modules/home/store/home.state';
import { homeRootReducer } from '@modules/home/store/reducers';
import { OtherProductsEffect } from '@modules/home/store/effects/other-products.effect';
import { OtherProductsService } from '@modules/home/services/other-products.service';
import { ModalOtherProductsComponent } from '@modules/home/components/modal-other-products/modal-other-products.component';
import { GroupOtherProductsComponent } from '@modules/home/components/group-other-products/group-other-products.component';
import { OtherCreditsComponent } from '@modules/home/components/other-credits/other-credits.component';
import { VelocityCardCustomModule } from '@commons/velocity/molecules/velocity-card-custom/velocity-card-custom.module';
import { GroupActionsComponent } from '@modules/home/components/group-actions/group-actions.component';
import { ContActionsComponent } from '@modules/home/components/cont-actions/cont-actions.component';
import { ContModalActionComponent } from '@modules/home/components/cont-modal-action/cont-modal-action.component';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { VelocitySectionOtherProductsModule } from '@commons/velocity/molecules/velocity-section-other-products/velocity-section-other-products.module';
import { VelocitySkeletonCardModule } from '@commons/velocity/molecules/velocity-skeleton-card/velocity-skeleton-card.module';
import { VelocityErrorAndEmptyModule } from '@commons/velocity/molecules/velocity-error-and-empty/velocity-error-and-empty.module';
import { VelocityCardOpenNewProductModule } from '@commons/velocity/molecules/velocity-card-open-new-product/velocity-card-open-new-product.module';
import { ComplementaryCardComponent } from './components/complementary-card/complementary-card.component';
import { LottieModule } from '@commons/components/lottie/lottie.module';

export const FEATURE_HOME_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IHomeState>
>('Home Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    VelocityButtonModule,
    GlobalPipesModule,
    VelocityCardModule,
    CustomHeaderModule,
    VelocityImageTitleModule,
    VelocityCardFinanceModule,
    VelocityCardCustomModule,
    VelocityModalLeaveModule,
    VelocitySectionOtherProductsModule,
    VelocitySkeletonCardModule,
    VelocityErrorAndEmptyModule,
    VelocityCardOpenNewProductModule,
    VelocityButtonModule,
    LottieModule,
    StoreModule.forFeature(homeFeatureName, FEATURE_HOME_REDUCER_TOKEN),
    EffectsModule.forFeature([OtherProductsEffect]),
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    KeysPipe,
    GroupProductsComponent,
    OrderProductsPipe,
    FinancesComponent,
    ModalOtherProductsComponent,
    GroupOtherProductsComponent,
    OtherCreditsComponent,
    GroupActionsComponent,
    ContActionsComponent,
    ContModalActionComponent,
    ComplementaryCardComponent
  ],
  providers: [
    HomeFacade,
    OtherProductsService,
    InAppBrowser,
    {
      provide: FEATURE_HOME_REDUCER_TOKEN,
      useValue: homeRootReducer
    }
  ]
})
export class HomePageModule {}
