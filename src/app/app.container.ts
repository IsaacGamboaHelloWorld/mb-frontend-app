import { Component, ViewEncapsulation } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { BackButtonService } from '@commons/services/back-button.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.container.html',
  styleUrls: ['app.container.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppContainer {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private translate: TranslateService,
    private backButtonService: BackButtonService
  ) {
    this.initializeApp();
    this.hasStatusBar && this.setStatusBar();
    translate.setDefaultLang('es');
    translate.use('es');
  }

  get hasStatusBar(): boolean {
    return Capacitor.isPluginAvailable('StatusBar');
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.backButtonService.listenerBackButton();
    });
  }

  public setStatusBar(): void {
    this.hasStatusBar && StatusBar.show();
    this.hasStatusBar && StatusBar.setStyle({ style: Style.Dark });
  }
}
