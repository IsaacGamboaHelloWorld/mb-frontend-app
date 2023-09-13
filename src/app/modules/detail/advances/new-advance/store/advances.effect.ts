import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AdvancesService } from '@modules/detail/advances/new-advance/services/advances.service';
import * as actions from '@modules/detail/advances/new-advance/store/advances.action';
import { IAdvanceResponse } from '@modules/detail/advances/new-advance/entities/advances.entities';

@Injectable()
export class AdvancesEffect {
  constructor(
    private actions$: Actions,
    private advancesService: AdvancesService
  ) {}

  LoadAdvance: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.advanceLoadAction),
      switchMap((action) => {
        return this.advancesService.executeAdvance(action.form).pipe(
          first(),
          map((response: IAdvanceResponse) => {
            return response?.success
              ? actions.advanceSuccessAction(response)
              : response?.hiddenToast
              ? actions.advanceFailActionWithoutToast(response.errorMessage)
              : actions.advanceFailAction(response.errorMessage);
          }),
          catchError(() => of(actions.advanceFailAction('')))
        );
      })
    )
  );
}
