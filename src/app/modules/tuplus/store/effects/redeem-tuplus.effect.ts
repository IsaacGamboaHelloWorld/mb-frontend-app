import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import * as actions from '@modules/tuplus/store/actions/redemption-tuplus.action';
import { RedemptionTuplusService } from '@modules/tuplus/services/redemption-tuplus.service';
import { IRedeem } from '@modules/tuplus/entities/redeem-tuplus.entities';

@Injectable()
export class RedeemEffect {
  constructor(
    private actions$: Actions,
    private redemptionService: RedemptionTuplusService
  ) {}

  RedeemEffect: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.redeemLoadAction),
      switchMap((action) => {
        return this.redemptionService.redemption(action.form).pipe(
          take(1),
          map((information: IRedeem) => {
            if (information?.success) {
              return actions.redeemSuccessAction(information);
            } else if (information?.errorMessageCode == 8) {
              return actions.retryAction(information?.errorMessageCode);
            } else {
              return actions.redeemFailAction(information?.errorMessage);
            }
          }),
          catchError((_) => of(actions.redeemFailAction('')))
        );
      })
    )
  );
}
