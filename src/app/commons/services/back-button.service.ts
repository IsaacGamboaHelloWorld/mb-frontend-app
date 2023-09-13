import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { LOGIN } from '@commons/constants/navigatie-global';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  constructor(private platform: Platform, private router: Router) {}

  public listenerBackButton(): void {
    !isNullOrUndefined(this.platform.backButton) &&
      this.platform.backButton.subscribe((data) => {
        const url = this.router.url;
        url === LOGIN && !!navigator['app'] && navigator['app'].exitApp();
      });
  }
}
