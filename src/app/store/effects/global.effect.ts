import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  changeStatusAction,
  changeStatusSuccessAction,
  setBeforeUrlAction
} from '@store/actions/global.actions';
import {
  GlobalToastError,
  GlobalToastSuccess
} from '@store/actions/toast.action';
import { DEFAULT_TOAST_PROPERTIES } from '@commons/entities/toast.entities';
import {
  ROUTER_NAVIGATION,
  ROUTER_REQUEST,
  RouterNavigationAction
} from '@ngrx/router-store';
import { trackEvents } from '@commons/helpers/trackEvents.helper';
import { GlobalRateApp } from '@store/actions/rateApp.action';
import { RateAppPlugin } from '@commons/capacitor-web-plugins';

@Injectable()
export class GlobalEffect {
  constructor(private actions$: Actions) {}

  globalEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(changeStatusAction),
      map((action) => changeStatusSuccessAction(action.payload))
    )
  );

  globalToastErrorStatus$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...GlobalToastError),
      map((action) =>
        changeStatusAction({
          ...DEFAULT_TOAST_PROPERTIES,
          message: action.errorMessage
        })
      )
    )
  );

  globalToastSuccessStatus$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...GlobalToastSuccess),
      map((action) =>
        changeStatusAction({
          ...DEFAULT_TOAST_PROPERTIES,
          type: 'success',
          cssClass: 'success-toast',
          message: action.successMessage
        })
      )
    )
  );

  trackView: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        tap((action: RouterNavigationAction) =>
          trackEvents(action?.payload?.event?.url, action?.payload?.event?.url)
        )
      ),
    { dispatch: false }
  );

  beforeUrl: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_REQUEST),
      map((action: RouterNavigationAction) => {
        const {
          payload: {
            routerState: { url }
          }
        } = action;
        return setBeforeUrlAction(decodeURIComponent(url) || '/');
      })
    )
  );

  rateApp: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...GlobalRateApp),
        tap((_) => setTimeout(() => RateAppPlugin.getRate().then(), 1500))
      ),
    { dispatch: false }
  );
}
