import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonicModule } from '@ionic/angular';
import { NgIdleModule } from '@ng-idle/core';

import { MainContainer } from '@modules/main-container/main-container';
import { MainContainerRoutingModule } from '@modules/main-container/main-container-routing.module';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { ProductsService } from '@modules/main-container/services/products.service';
import {
  IMainContainerState,
  mainContainerFeatureName
} from '@modules/main-container/store/states/main-container.state';
import { mainContainerRootReducer } from '@modules/main-container/store/reducers';
import { ProductsEffects } from '@modules/main-container/store/effects/products.effects';
import { ValidateSessionEffects } from '@modules/main-container/store/effects/validate-session.effects';
import { ValidatePingService } from '@modules/main-container/services/validate-ping.service';
import { ValidateSessionService } from '@commons/security/services/validate-session.service';
import { PocketsEffect } from '@modules/main-container/store/effects/pockets.effect';
import { TuplusEffect } from '@modules/main-container/store/effects/tuplus.effect';
import { TuplusService } from '@modules/main-container/services/tuplus.service';
import { PayRollLoansEffect } from '@modules/main-container/store/effects/pay-roll-loans.effect';
import { StocksService } from '@modules/main-container/services/stocks.service';
import { StocksEffects } from '@modules/main-container/store/effects/stocks.effects';
import { DataUserService } from '@modules/main-container/services/data-user.service';
import { DataUserEffect } from '@modules/main-container/store/effects/data-user.effect';
import { SideMenuComponent } from '@modules/main-container/components/side-menu/side-menu.component';
import { VelocityNavbarItemModule } from '@commons/velocity/molecules/velocity-navbar-item/velocity-navbar-item.module';
import { NavBarComponent } from '@modules/main-container/components/nav-bar/nav-bar.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityWithdrawalPlaceModule } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.module';
import { QrInfoService } from '@modules/main-container/services/qr-info.service';
import { QrInfoEffect } from '@modules/main-container/store/effects/qr-info.effect';
import { HomeContainerComponent } from '@modules/main-container/components/home-container/home-container.component';
import { FreeDestinationEffect } from '@modules/main-container/store/effects/free-destination.effect';
import { FreeDestinationService } from '@modules/main-container/services/free-destination.service';

export const FEATURE_MAIN_CONTAINER_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IMainContainerState>
>('Main Container Module State');

@NgModule({
  declarations: [
    MainContainer,
    SideMenuComponent,
    NavBarComponent,
    HomeContainerComponent
  ],
  imports: [
    CommonModule,
    MainContainerRoutingModule,
    IonicModule,
    VelocityNavbarItemModule,
    GlobalPipesModule,
    VelocityWithdrawalPlaceModule,
    StoreModule.forFeature(
      mainContainerFeatureName,
      FEATURE_MAIN_CONTAINER_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([
      ProductsEffects,
      ValidateSessionEffects,
      PocketsEffect,
      TuplusEffect,
      FreeDestinationEffect,
      PayRollLoansEffect,
      StocksEffects,
      DataUserEffect,
      QrInfoEffect
    ]),
    NgIdleModule.forRoot()
  ],
  providers: [
    MainContainerFacade,
    ProductsService,
    ValidatePingService,
    ValidateSessionService,
    TuplusService,
    FreeDestinationService,
    StocksService,
    DataUserService,
    BarcodeScanner,
    FingerprintAIO,
    QrInfoService,
    {
      provide: FEATURE_MAIN_CONTAINER_REDUCER_TOKEN,
      useValue: mainContainerRootReducer
    }
  ]
})
export class MainContainerModule {
  constructor(private facade: MainContainerFacade) {
    this.facade.fetchLoadProducts();
  }
}
