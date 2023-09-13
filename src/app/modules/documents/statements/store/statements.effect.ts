import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { StatementsService } from '@modules/documents/statements/services/statements.service';
import * as actions from '@modules/documents/statements/store/actions/periods.action';
import * as actionsState from '@modules/documents/statements/store/actions/statements.action';
import { sharedFile } from '@commons/helpers/global.helper';

@Injectable()
export class StatementsEffect {
  constructor(
    private actions$: Actions,
    private statementsService: StatementsService,
    private translateService: TranslateService
  ) {}

  LoadPeriods: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.periodLoadAction),
      switchMap((action) => {
        return this.statementsService.fetchPeriods(action.body).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? actions.periodSuccessAction(resp.periods)
              : actions.periodFailAction('')
          ),
          catchError((_) => of(actions.periodFailAction('')))
        );
      })
    )
  );

  LoadStatementsFile: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsState.statementsLoadAction),
      switchMap((action) => {
        return this.statementsService.fetchStatementFile(action?.body).pipe(
          first(),
          map((resp) => {
            if (resp?.success) {
              sharedFile(resp?.base64, resp?.name);
              return actionsState.statementsSuccessAction();
            }
            return actionsState.statementsFailAction(
              this.translateService.instant('CERTIFICATE.ERROR')
            );
          }),
          catchError((_) =>
            of(
              actionsState.statementsFailAction(
                this.translateService.instant('CERTIFICATE.ERROR')
              )
            )
          )
        );
      })
    )
  );
}
