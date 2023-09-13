import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Action } from '@ngrx/store';

import { MessagesService } from '@modules/messages/services/messages.service';
import * as messageActions from '@modules/messages/store/actions/messages.action';
import {
  IMessagesResponse,
  IMessagesService
} from '@modules/messages/entities/messages.entities';
import * as deleteActions from '@modules/messages/store/actions/messages-delete.action';
import * as readMessage from '@modules/messages/store/actions/messages-read.action';

@Injectable()
export class MessagesEffect {
  private key: IMessagesService;
  constructor(
    private actions$: Actions,
    private messagesService: MessagesService,
    private translateService: TranslateService
  ) {}

  ListMessages: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(messageActions.messagesLoadAction),
      switchMap((action) => {
        return this.messagesService.listMessages(action.body).pipe(
          first(),
          tap((_) => (this.key = action.body)),
          map((resp: IMessagesResponse) =>
            resp?.success
              ? messageActions.messagesSuccessAction(resp)
              : action.showToast
              ? messageActions.messagesFailToastAction(resp.errorMessage)
              : messageActions.messagesFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              messageActions.messagesFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  DeleteMessages: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteActions.messagesDeleteLoadAction),
      switchMap((action) => {
        return this.messagesService.deleteMessages(action.body).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? deleteActions.messagesDeleteSuccessAction(
                  resp,
                  this.translateService.instant('MESSAGES.DELETE_SUCCESS')
                )
              : deleteActions.messagesDeleteFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              deleteActions.messagesDeleteFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  SuccessDeleteMessages: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteActions.messagesDeleteSuccessAction),
      map((action) => messageActions.messagesLoadAction(this.key, true))
    )
  );

  ReadMessage: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(readMessage.messagesReadLoadAction),
      switchMap((action) => {
        return this.messagesService.readMessages(action.body).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? readMessage.messagesReadSuccessAction()
              : readMessage.messagesReadFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              readMessage.messagesReadFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );
}
