import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { MovementsService } from '@modules/detail/product-detail/services/movements.service';
import * as actions from '@modules/detail/product-detail/store/actions/movements.action';
import { IMovement } from '@modules/detail/product-detail/entities/movements.entities';

@Injectable()
export class MovementsEffect {
  constructor(
    private actions$: Actions,
    private movementsService: MovementsService
  ) {}

  LoadMovement: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.movementsLoadAction),
      switchMap((action) => {
        return this.movementsService
          .fetchMovements(action.typeAccount, action.id, action.from, action.to)
          .pipe(
            take(1),
            map((information: IMovement) => {
              if (information?.success) {
                return actions.movementsSuccessAction(information);
              }
              return actions.movementsFailAction(information.errorMessage);
            }),
            catchError((_) => of(actions.movementsFailAction('')))
          );
      })
    )
  );
}
