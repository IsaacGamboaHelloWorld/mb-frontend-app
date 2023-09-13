import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { ValidateSessionService } from '@commons/security/services/validate-session.service';
import { ValidatePingService } from '@modules/main-container/services/validate-ping.service';
import * as ping from '../actions/auth-validation-session.action';
import * as session from '../actions/security-validate-key.action';
import { logoutUserAction } from '@store/actions/global.actions';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { ModalService } from '@commons/services/modal.service';
import { GenericHomeService } from '@commons/utils/generic-home.service';
import { PageOpenAccountService } from '@commons/velocity/pages/utils/page-open-account.service';
import { ConfigService } from '@commons/services/config.service';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { setDataPage } from '@modules/main-container/set-data-page.mapper';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { hiddenNavBarAction } from '../actions/auth-validation-session.action';
import { HIDDEN_NAV_BAR } from '@commons/constants/menu_items';

@Injectable()
export class ValidateSessionEffects {
  constructor(
    private actions$: Actions,
    private validateSession: ValidateSessionService,
    private validatePing: ValidatePingService,
    private modalService: ModalService,
    private genericHome: GenericHomeService,
    private pageOpenAccountService: PageOpenAccountService,
    private configService: ConfigService,
    private facade: MainContainerFacade
  ) {}

  ValidateSession: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(session.ValidateSession),
      switchMap((action) => {
        return this.validateSession.validateSession().pipe(
          take(1),
          map(() => session.SessionSuccess()),
          catchError(() => from([session.SessionFail(), logoutUserAction()]))
        );
      })
    );
  });

  ValidatePing: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ping.ValidatePing),
      switchMap(() => {
        return this.validatePing.validatePing().pipe(
          take(1),
          map(() => ping.PingSuccess()),
          catchError(() => from([ping.PingFail(), logoutUserAction()]))
        );
      })
    );
  });

  changeUrl$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      switchMap((router: RouterNavigationAction) => {
        return this.facade.complementary$.pipe(
          take(1),
          map((complementary: boolean) => {
            setDataPage.bind(this)(
              router?.payload?.routerState?.url,
              complementary
            );
            !isNullOrUndefined(this.modalService.modal) &&
              this.modalService.close();
            return hiddenNavBarAction(
              HIDDEN_NAV_BAR.some((url) =>
                router?.payload?.routerState?.url.startsWith(url)
              )
            );
          })
        );
      })
    )
  );
}
