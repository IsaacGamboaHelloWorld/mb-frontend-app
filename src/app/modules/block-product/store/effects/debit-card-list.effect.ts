import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as actions from '@modules/block-product/store/actions/debit-cards.action';
import { DebitCardListService } from '@modules/block-product/services/debit-card-list.service';
import { IDebitCardListService } from '@modules/block-product/entities/block.entities';

@Injectable()
export class DebitCardListEffect {
  constructor(
    private actions$: Actions,
    private debitCardListService: DebitCardListService
  ) {}

  LoadBlockProduct: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.debitCardListLoadAction),
      switchMap((action) => {
        return this.debitCardListService.fetchDebitCardList().pipe(
          first(),
          map((resp: IDebitCardListService) => {
            return resp?.success
              ? actions.debitCardListSuccessAction(resp)
              : actions.debitCardListFailAction(resp.errorMessage);
          }),
          catchError((err) =>
            of(actions.debitCardListFailAction(err.errorMessage || err.error))
          )
        );
      })
    )
  );
}
