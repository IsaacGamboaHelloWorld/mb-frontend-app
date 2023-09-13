import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import * as actions from '@modules/push-notification/store/push.action';
import { PushNotificationService } from '@modules/push-notification/services/push-notification.service';
import { PushNotificationFacade } from '@modules/push-notification/push-notification.facade';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';

@Injectable()
export class PushEffect {
  constructor(
    private actions$: Actions,
    private pushService: PushNotificationService,
    private facade: PushNotificationFacade,
    private securityStorage: AdlSecureStorageService
  ) {}

  RegisterPush: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.registerPushNotificationLoadAction),
      switchMap((action) => {
        return this.pushService.fetchRegister(action.body).pipe(
          first(),
          switchMap((resp) => {
            resp?.success && this.securityStorage.put(KEYS.PUSH, 'done', true);
            return resp?.success
              ? [
                  actions.togglePushNotificationAction(true),
                  actions.registerPushNotificationSuccessAction()
                ]
              : [
                  actions.registerPushNotificationErrorAction(
                    resp.errorMessage,
                    false
                  )
                ];
          }),
          catchError((error) =>
            of(
              actions.registerPushNotificationErrorAction(
                error?.errorMessage || error.error,
                false
              )
            )
          )
        );
      })
    )
  );

  DeletePush: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deletePushNotificationLoadAction),
      switchMap((action) => {
        return this.pushService.fetchDelete().pipe(
          first(),
          switchMap((resp) => {
            resp?.success && this.securityStorage.remove(KEYS.PUSH, true);
            return resp?.success
              ? [
                  actions.togglePushNotificationAction(false),
                  actions.deletePushNotificationSuccessAction()
                ]
              : [actions.deletePushNotificationErrorAction(resp.errorMessage)];
          }),
          catchError((error) =>
            of(
              actions.deletePushNotificationErrorAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );
}
