import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import * as actions from '@modules/tuplus/store/actions/logout-tuplus.action';
import { LogoutTuplusService } from '@modules/tuplus/services/logout-tuplus.service';
import { ILogoutTuplus } from '@modules/tuplus/entities/logout-tuplus.entities';

@Injectable()
export class LogoutTuplusEffects {
  constructor(
    private actions$: Actions,
    private logoutService: LogoutTuplusService
  ) {}

  LogoutTuplus: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.logoutLoadAction),
      switchMap((action) => {
        return this.logoutService.logoutTuplus().pipe(
          take(1),
          map((information: ILogoutTuplus) => {
            if (information?.success) {
              return actions.logoutSuccessAction(information);
            }
            return actions.logoutFailAction(information?.errorMessage);
          }),
          catchError((_) => of(actions.logoutFailAction('')))
        );
      })
    )
  );
}
