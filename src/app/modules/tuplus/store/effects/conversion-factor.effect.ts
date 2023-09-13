import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { ConfigurationService } from '@modules/tuplus/services/configuration.service';
import * as actions from '@modules/tuplus/store/actions/conversion-factor.action';
import { IConversionFactor } from '@modules/tuplus/entities/conversion-factor.entities';

@Injectable()
export class ConversionFactorEffect {
  constructor(
    private actions$: Actions,
    private conversionService: ConfigurationService
  ) {}

  ConversionFactor: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.conversionLoadAction),
      switchMap((action) => {
        return this.conversionService.configuration().pipe(
          take(1),
          map((information: IConversionFactor) => {
            if (information?.success) {
              return actions.conversionSuccessAction(information);
            }
            return actions.conversionFailAction(information?.errorMessage);
          }),
          catchError((_) => of(actions.conversionFailAction('')))
        );
      })
    )
  );
}
