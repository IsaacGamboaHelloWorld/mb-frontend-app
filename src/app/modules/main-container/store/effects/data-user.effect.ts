import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as actions from '@modules/main-container/store/actions/data-user';
import { DataUserService } from '@modules/main-container/services/data-user.service';

@Injectable()
export class DataUserEffect {
  constructor(
    private actions$: Actions,
    private dataUserService: DataUserService
  ) {}

  LoadDataUser: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.dataUserLoad),
      switchMap((action) => {
        return this.dataUserService.userData().pipe(
          first(),
          map((resp) =>
            resp.success
              ? actions.dataUserSuccess(resp)
              : actions.dataUserFail()
          ),
          catchError((_) => of(actions.dataUserFail()))
        );
      })
    )
  );
}
