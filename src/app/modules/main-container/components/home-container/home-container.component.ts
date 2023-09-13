import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { AuthService } from '@commons/services/auth/auth.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { IMenuItem } from '@commons/constants/menu_items';
import { KEYS } from '@commons/constants/global';
import { sideMenu } from '@commons/constants/navigation_items_list';
import { InfoUser } from '@commons/entities/auth-data.entities';
import { ConfigService } from '@commons/services/config.service';
import {
  GROUP_MEMO_GLOBAL,
  memoClosureGlobal
} from '@commons/memorize/global.memorize';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeContainerComponent {
  public sideMenuItems: IMenuItem[];

  constructor(
    private facade: MainContainerFacade,
    private authService: AuthService,
    private securityStorage: AdlSecureStorageService,
    private configService: ConfigService
  ) {
    this.sideMenuItems = sideMenu(
      this.configService.config,
      undefined,
      this.hasComplementary
    );
  }

  get hasErrorProducts$(): Observable<boolean> {
    return this.facade.hasErrorProducts$;
  }

  get hiddenNavBar$(): Observable<boolean> {
    return this.facade.hiddenNavBar$;
  }

  get hasComplementary(): boolean {
    let hasComplementary;
    this.facade.complementary$
      .pipe(first())
      .subscribe((complementary) => (hasComplementary = complementary));
    return hasComplementary;
  }

  ionViewWillEnter(): void {
    this.facade.fetchTuplus();
    this.facade.fetchStocksType();
    this.facade.fetchStocksPeriod();
    this.facade.fetchLoadProducts();
    this.facade.fetchNicknames();
    this._validateBiometric();
  }

  private async _validateBiometric(): Promise<void> {
    if (!!memoClosureGlobal(GROUP_MEMO_GLOBAL.HAS_BIOMETRIC, true)) {
      try {
        const infoBiometric = await this.securityStorage.get(KEYS.BIOMETRIC);
        const info: InfoUser = JSON.parse(infoBiometric) || {};
        if (
          !infoBiometric ||
          (!!info &&
            atob(info?.idType || '').toUpperCase() ===
              this.authService.infoUser?.idType &&
            atob(info?.id || '') === this.authService.infoUser?.id)
        ) {
          this.sideMenuItems = sideMenu(
            this.configService.config,
            true,
            this.hasComplementary
          );
        }
      } catch {}
    }
  }
}
