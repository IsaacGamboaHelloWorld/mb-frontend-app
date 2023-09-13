import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as actions from '@modules/main-container/store/actions/tuplus.action';
import { TuplusService } from '@modules/main-container/services/tuplus.service';
import { ITuplus } from '@modules/main-container/entities/tuplus.entities';

@Injectable()
export class TuplusEffect {
  constructor(
    private actions$: Actions,
    private tuplusService: TuplusService
  ) {}

  LoadTuPlus: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.tuplusLoad),
      switchMap((action) => {
        return this.tuplusService.loadTuplus().pipe(
          first(),
          map((resp: ITuplus) =>
            resp.success ? actions.tuplusSuccess(resp) : actions.tuplusFail('')
          ),
          catchError((_) => of(actions.tuplusFail('')))
        );
      })
    )
  );
}
