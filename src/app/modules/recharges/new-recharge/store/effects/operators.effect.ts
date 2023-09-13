import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { OperatorsNameService } from '@modules/recharges/new-recharge/services/operators-name.service';
import * as actions from '@modules/recharges/new-recharge/store/actions/operators.action';
import { IRespondOperators } from '@modules/recharges/new-recharge/entities/operatators.entities';

@Injectable()
export class OperatorsEffect {
  constructor(
    private actions$: Actions,
    private operatorsService: OperatorsNameService
  ) {}

  LoadOperators: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.operatorsLoadAction),
      switchMap((action) => {
        return this.operatorsService.operators().pipe(
          first(),
          map((resp: IRespondOperators) => {
            if (resp?.success) {
              return actions.operatorsSuccessAction(resp.mobileOperators);
            }
            return actions.operatorsFailAction(resp.errorMessage);
          }),
          catchError((_) => of(actions.operatorsFailAction('')))
        );
      })
    )
  );
}
