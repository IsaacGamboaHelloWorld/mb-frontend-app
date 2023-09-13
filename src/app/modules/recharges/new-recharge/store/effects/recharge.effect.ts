import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as actions from '@modules/recharges/new-recharge/store/actions/recharge.action';
import { CellPhoneRechargeService } from '@modules/recharges/new-recharge/services/cell-phone-recharge.service';
import { IRespondRecharge } from '@modules/recharges/new-recharge/entities/recharge.entities';

@Injectable()
export class RechargeEffect {
  constructor(
    private actions$: Actions,
    private rechargeService: CellPhoneRechargeService
  ) {}

  LoadRecharge: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.rechargeLoadAction),
      switchMap((action) => {
        return this.rechargeService.recharge(action.form).pipe(
          first(),
          map((resp: IRespondRecharge) =>
            resp?.success
              ? actions.rechargeSuccessAction(resp)
              : resp?.hiddenToast
              ? actions.rechargeFailActionWithoutToast(resp.errorMessage)
              : actions.rechargeFailAction(resp.errorMessage)
          ),
          catchError((err) =>
            of(actions.rechargeFailAction(err?.errorMessage || err?.error))
          )
        );
      })
    )
  );
}
