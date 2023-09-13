import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';
import { ProductDetailPage } from './product-detail.page';
import { ProductDetailFacade } from './product-detail.facade';
import { VelocityDetailInfoModule } from '@commons/velocity/molecules/velocity-detail-info/velocity-detail-info.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityProductServiceModule } from '@commons/velocity/molecules/velocity-product-service/velocity-product-service.module';
import {
  detailProductFeatureName,
  IDetailProductState
} from '@modules/detail/product-detail/store/states/detail-product.state';
import { detailProductRootReducer } from '@modules/detail/product-detail/store/reducers';
import { MovementsEffect } from '@modules/detail/product-detail/store/effects/movements.effect';
import { MovementsService } from '@modules/detail/product-detail/services/movements.service';
import { ContMovementsComponent } from '@modules/detail/product-detail/components/cont-movements/cont-movements.component';
import { MovementComponent } from '@modules/detail/product-detail/components/movement/movement.component';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { MovementsFilterComponent } from './components/movements-filter/movements-filter.component';
import { FilterDateRangePipe } from '@modules/detail/product-detail/pipes/filter-date-range.pipe';
import { DetailHeaderComponent } from '@modules/detail/product-detail/components/detail-header/detail-header.component';
import { VelocityProductDetailCardModule } from '@commons/velocity/molecules/velocity-product-detail-card/velocity-product-detail-card.module';
import { VelocityCardLiteCreditCardModule } from '@app/commons/velocity/organisms/velocity-card-lite-credit-card/velocity-card-lite-credit-card.module';
import { VelocityModalLeaveModule } from '@app/commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { ContModalRedirectComponent } from './components/cont-modal-redirect/cont-modal-redirect.component';
import { ContModalPocketsComponent } from '@modules/detail/product-detail/components/cont-modal-pockets/cont-modal-pockets.component';

export const FEATURE_MAIN_CONTAINER_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IDetailProductState>
>('Detail Product Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule,
    VelocityDetailInfoModule,
    VelocityProductDetailCardModule,
    GlobalPipesModule,
    VelocityProductServiceModule,
    VelocityImageTitleModule,
    VelocityButtonModule,
    StoreModule.forFeature(
      detailProductFeatureName,
      FEATURE_MAIN_CONTAINER_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([MovementsEffect]),
    VelocityCardLiteCreditCardModule,
    VelocityModalLeaveModule
  ],
  declarations: [
    ProductDetailPage,
    ContMovementsComponent,
    ContModalPocketsComponent,
    MovementsFilterComponent,
    MovementComponent,
    DetailHeaderComponent,
    FilterDateRangePipe,
    ContModalRedirectComponent
  ],
  providers: [
    ProductDetailFacade,
    MovementsService,
    {
      provide: FEATURE_MAIN_CONTAINER_REDUCER_TOKEN,
      useValue: detailProductRootReducer
    }
  ]
})
export class ProductDetailPageModule {}
