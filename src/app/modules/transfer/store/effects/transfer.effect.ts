import { Injectable } from '@angular/core';

import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { NewTransferService } from '@modules/transfer/services/transfer.service';
import * as actions from '@modules/transfer/store/actions/transfer.action';
import * as actionsCost from '@modules/transfer/store/actions/cost-transfer.action';
import { INewTransferRespond } from '@modules/transfer/entities/transfer.entities';

@Injectable()
export class NewTransferEffect {
  constructor(
    private actions$: Actions,
    private newTransferService: NewTransferService
  ) {}

  LoadNewTransfer: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.newTransferLoadAction),
      switchMap((action) => {
        return this.newTransferService.newTransfer(action.information).pipe(
          first(),
          map((resp: INewTransferRespond) =>
            resp?.success
              ? actions.newTransferSuccessAction(resp)
              : resp?.hiddenToast
              ? actions.newTransferFailActionWithoutToast(resp.errorMessage)
              : actions.newTransferFailAction(resp.errorMessage)
          ),
          catchError((error) => {
            return of(actions.newTransferFailAction(error.errorMessage || ''));
          })
        );
      })
    )
  );

  LoadNewTransferNotRegistered: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.newTransferNotRegisteredLoadAction),
      switchMap((action) => {
        return this.newTransferService
          .newTransferNotRegistered(action.information)
          .pipe(
            first(),
            map((resp: INewTransferRespond) =>
              resp?.success
                ? actions.newTransferNotRegisteredSuccessAction(resp)
                : actions.newTransferNotRegisteredFailAction(resp.errorMessage)
            ),
            catchError((error) => {
              return of(
                actions.newTransferNotRegisteredFailAction(
                  error.errorMessage || ''
                )
              );
            })
          );
      })
    )
  );

  LoadCostTransfer: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCost.costTransferLoadAction),
      switchMap((action) => {
        return this.newTransferService.costTransfer(action.information).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? actionsCost.costTransferSuccessAction(resp)
              : actionsCost.costTransferFailAction(resp.errorMessage)
          ),
          catchError((_) => of(actionsCost.costTransferFailAction('')))
        );
      })
    )
  );
}
