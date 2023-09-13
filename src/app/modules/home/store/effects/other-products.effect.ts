import { catchError, first, map, mergeMap, takeUntil } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as actions from '@modules/home/store/actions/other-products.action';
import { OtherProductsService } from '@modules/home/services/other-products.service';
import { IRespOtherProducts } from '@modules/home/entities/otherProducts.entities';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';

@Injectable()
export class OtherProductsEffect {
  constructor(
    private actions$: Actions,
    private otherProductsService: OtherProductsService
  ) {}

  LoadOtherProducts: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.otherProductLoad),
      mergeMap((action) => {
        return this.otherProductsService.otherProducts(action.bank).pipe(
          first(),
          map((resp: IRespOtherProducts) => {
            if (
              !isNullOrUndefined(resp[action?.bank?.entitySearch]) &&
              resp[action.bank.entitySearch].success
            ) {
              return actions.otherProductSuccess(
                resp[action.bank.entitySearch.toUpperCase()].products,
                action.bank.entitySearch
              );
            }
            return actions.otherProductFail(
              action.bank.entitySearch,
              resp[action.bank.entitySearch].errorMessage
            );
          }),
          catchError((_) =>
            of(actions.otherProductFail(action.bank.entitySearch, ''))
          )
        );
      })
    )
  );
}
