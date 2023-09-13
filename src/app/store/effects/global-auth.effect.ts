import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  delay,
  first,
  map,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { AuthService } from '@commons/services/auth/auth.service';
import * as actions from '@store/actions/global.actions';
import { LOGIN } from '@commons/constants/navigatie-global';
import { SecurityService } from '@commons/security/services/security.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { KEYS_SECURITY } from '@commons/security/constants/auth';

@Injectable()
export class GlobalAuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private security: SecurityService,
    private secureStorage: AdlSecureStorageService
  ) {}

  logoutUserEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.logoutUserAction),
      switchMap(() => {
        return this.authService.logOut().pipe(
          delay(250),
          tap(() =>
            this.security
              .deleteKey()
              .pipe(first())
              .subscribe()
          ),
          take(1),
          catchError(() => of(actions.logoutUserErrorAction())),
          tap(() => {
            this.secureStorage.remove(KEYS.AUTH_TOKEN);
            this.navCtrl.navigateRoot([LOGIN]);
            Capacitor.getPlatform() === 'web' &&
              this.secureStorage.remove(KEYS_SECURITY.SECURITY);
            Capacitor.getPlatform() === 'web' &&
              this.secureStorage.remove(KEYS_SECURITY.EXPIRY_TIME);
            this.secureStorage.clearDB();
          }),
          map(() => actions.logoutUserSuccessAction())
        );
      })
    )
  );
}
