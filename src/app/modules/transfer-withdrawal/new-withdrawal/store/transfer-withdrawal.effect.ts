import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';

import { TransferWithdrawalService } from '@modules/transfer-withdrawal/new-withdrawal/services/transfer-withdrawal.service';
import * as actions from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.action';
import { IOtpWithdrawalResponse } from '@modules/transfer-withdrawal/new-withdrawal/entities/otp-transfer-withdrawal.entities';

@Injectable()
export class TransferWithdrawalEffect {
  constructor(
    private actions$: Actions,
    private transferWithdrawalService: TransferWithdrawalService
  ) {}

  LoadTransferWithdrawal: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.transferWithdrawalLoadAction),
      switchMap((action) => {
        return this.transferWithdrawalService.generate(action.form).pipe(
          first(),
          map((response: IOtpWithdrawalResponse) =>
            response?.success
              ? actions.transferWithdrawalSuccessAction(response)
              : actions.transferWithdrawalFailAction('Error en la transacción')
          ),
          catchError(() => of(actions.transferWithdrawalFailAction('')))
        );
      })
    )
  );
}
