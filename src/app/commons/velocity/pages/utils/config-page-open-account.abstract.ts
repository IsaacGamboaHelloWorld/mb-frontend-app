import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { PageOpenAccountService } from './page-open-account.service';
import { IOpenAccount } from '@app/commons/entities/open-account.entities';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { urlBuilderWithoutBase } from '@commons/utils/url-builder';
import { AppFacade } from '@app/app.facade';

export abstract class ConfigPageOpenAccountAbstract {
  private _router: Router;
  private _navCtrl: NavController;
  private _pageOpenAccountService: PageOpenAccountService;
  private _securityStorageService: AdlSecureStorageService;
  private _facade: AppFacade;

  get params(): IOpenAccount {
    return this._pageOpenAccountService.params;
  }

  protected constructor(protected injector: Injector) {
    this._router = injector.get(Router);
    this._navCtrl = injector.get(NavController);
    this._pageOpenAccountService = injector.get(PageOpenAccountService);
    this._securityStorageService = injector.get(AdlSecureStorageService);
    this._facade = injector.get(AppFacade);
  }

  public back(): void {
    this._facade.beforeUrl$
      .pipe(first())
      .subscribe((url) =>
        this._navCtrl.navigateBack(url, { animationDirection: 'back' }).then()
      );
  }

  public async getUrl(
    defaultUrl: string,
    hasToken: boolean = true
  ): Promise<string> {
    try {
      let url: string;
      if (hasToken) {
        const token = await this._securityStorageService.get(KEYS.AUTH_TOKEN);
        url = urlBuilderWithoutBase.services(defaultUrl, {
          token
        });
      } else {
        url = defaultUrl;
      }
      return url;
    } catch {}
  }

  public openBrowser(url: string, isExternal: boolean = true): void {
    if (isExternal) {
      window.open(url, '_system', 'location=no');
      this._facade.logout();
    } else {
      this._navCtrl.navigateForward([url]);
    }
  }

  public async openBrowserToken(
    defaultUrl: string,
    hasToken: boolean = true,
    logout: boolean = true
  ): Promise<void> {
    try {
      const url = await this.getUrl(defaultUrl, hasToken);
      window.open(url, '_system', 'location=no');
      logout && this._facade.logout();
    } catch {}
  }
}
