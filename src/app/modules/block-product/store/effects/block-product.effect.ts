import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as actions from '@modules/block-product/store/actions/block-product.action';
import { BlockProductService } from '@modules/block-product/services/block-product.service';

@Injectable()
export class BlockProductEffect {
  constructor(
    private actions$: Actions,
    private blockProductService: BlockProductService
  ) {}

  LoadBlockProduct: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.blockProductLoadAction),
      switchMap((action) => {
        return this.blockProductService.fetchBlockProduct(action.body).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? actions.blockProductSuccessAction()
              : resp?.hiddenToast
              ? actions.blockProductFailActionWithoutToast(resp.errorMessage)
              : actions.blockProductFailAction(resp.errorMessage)
          ),
          catchError((err) =>
            of(actions.blockProductFailAction(err.errorMessage || err.error))
          )
        );
      })
    )
  );
}
