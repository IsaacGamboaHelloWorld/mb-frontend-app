import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  InjectionToken,
  LOCALE_ID,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-US';
import { Capacitor } from '@capacitor/core';

import { AppContainer } from '@app/app.container';
import { AppRoutingModule } from '@app/app-routing.module';
import { translateConfig } from '@app/app.translate';
import { LoadingEffect } from '@store/effects/loading.effect';
import { ToastEffect } from '@store/effects/toast.effect';
import { GlobalEffect } from '@store/effects/global.effect';
import { environment } from '@environment/environment';
import { clearState, globalReducers } from '@store/reducers';
import { SecurityModule } from '@commons/security/security.module';
import { initMethods } from '@app/app.helpers';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AppFacade } from '@app/app.facade';
import { GlobalAuthEffect } from '@store/effects/global-auth.effect';
import { URLS_EXCLUDED } from '@app/commons/constants/urls_excluded';
import { NgrxRouterStoreModule } from '@commons/router/ngrx-router.module';
import { MainInterceptor } from '@commons/interceptor/main.interceptor';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import './commons/helpers/extend-prototype.helpers';
import { CustomInterceptorModule } from '@commons/custom-interceptor/custom-interceptor.module';
import { DisabledModuleGuard } from '@commons/guards/disabled-module.guard';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { ModalProductBlockModule } from '@commons/components/modal-product-block/modal-product-block.module';
import { TealiumUtagService } from '@commons/services/tealium/utag.service';

registerLocaleData(localeEs, 'es-US');
export const REDUCER_TOKEN = new InjectionToken('Registered Reducers');

Capacitor.getPlatform() === 'web' && import('@commons/capacitor-web-plugins');

@NgModule({
  declarations: [AppContainer],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: '',
      swipeBackEnabled: false
    }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(translateConfig),
    StoreModule.forRoot(REDUCER_TOKEN, { metaReducers: [clearState] }),
    NgrxRouterStoreModule,
    CustomInterceptorModule,
    ModalProductBlockModule,
    EffectsModule.forRoot([
      LoadingEffect,
      ToastEffect,
      GlobalEffect,
      GlobalAuthEffect,
      VelocityButtonModule,
      VelocityImageTitleModule
    ]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({ maxAge: 35 }),
    SecurityModule.forRoot(URLS_EXCLUDED)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthTokenService,
    AuthTokenService,
    AppFacade,
    DisabledModuleGuard,
    TealiumUtagService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true
    },
    {
      provide: REDUCER_TOKEN,
      useValue: globalReducers
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initMethods,
      multi: true,
      deps: [AuthTokenService, AdlSecureStorageService]
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-US'
    }
  ],
  bootstrap: [AppContainer]
})
export class AppModule {}
