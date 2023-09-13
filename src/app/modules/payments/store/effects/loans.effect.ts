import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/loans-registered.action';
import * as payment from '@modules/payments/store/actions/loans-payment.action';
import { LoansService } from '@modules/payments/services/loans.service';

@Injectable()
export class LoansEffect {
  constructor(private actions$: Actions, private loansService: LoansService) {}

  LoadRegisteredLoans: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.registeredLoansLoadAction),
      switchMap((action) => {
        return this.loansService.fetchLoansRegistered().pipe(
          first(),
          map((resp) =>
            resp?.success
              ? actions.registeredLoansSuccessAction(resp.registeredLoans)
              : actions.registeredLoansFailAction(resp.errorMessage)
          ),
          catchError((_) => of(actions.registeredLoansFailAction('')))
        );
      })
    )
  );

  PaymentLoan: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(payment.paymentLoanLoadAction),
      switchMap((action) => {
        return this.loansService.fetchLoansPay(action.body).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? payment.paymentLoanSuccessAction(resp)
              : resp?.hiddenToast
              ? payment.paymentLoanFailActionWithoutToast(resp.errorMessage)
              : payment.paymentLoanFailAction(resp.errorMessage)
          ),
          catchError((_) => of(payment.paymentLoanFailAction('')))
        );
      })
    )
  );
}
