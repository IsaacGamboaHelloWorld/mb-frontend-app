import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { MovementsTuplusService } from '@modules/tuplus/services/movements-tuplus.service';
import * as actions from '@modules/tuplus/store/actions/movement-tuplus.action';
import { IMovementTuplus } from '@modules/tuplus/entities/movement-tuplus.entities';

@Injectable()
export class MovementsTuPlusEffect {
  constructor(
    private actions$: Actions,
    private movementsService: MovementsTuplusService
  ) {}

  MovementsTuPlusEffect: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.movementsTuplusLoadAction),
      switchMap((action) => {
        return this.movementsService.movementsTuplus(action.requestBody).pipe(
          take(1),
          map((information: IMovementTuplus) => {
            if (information?.success) {
              return actions.movementsTuplusSuccessAction(information);
            }
            return actions.movementsTuplusFailAction(information?.errorMessage);
          }),
          catchError((_) => of(actions.movementsTuplusFailAction('')))
        );
      })
    )
  );
}
