import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import { TaxPaymentService } from '@modules/payments/services/tax-payment.service';
import * as CitiesActions from '@modules/payments/store/actions/taxes-cities.action';
import * as AgreementsActions from '@modules/payments/store/actions/taxes-agreements.action';
import * as AmountReferenceActions from '@modules/payments/store/actions/taxes-amount-reference.action';
import * as PaymentActions from '@modules/payments/store/actions/taxes-payment.action';
import {
  ITaxesAgreementsResponse,
  ITaxesAmountReferenceResponse,
  ITaxesCitiesResponse,
  ITaxesPaymentResponse
} from '@modules/payments/entities/tax-payment.entities';

@Injectable()
export class TaxesEffect {
  constructor(
    private actions$: Actions,
    private taxPaymentService: TaxPaymentService
  ) {}

  LoadTaxesCities: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CitiesActions.taxesCitiesLoadAction),
      switchMap((action) => {
        return this.taxPaymentService.loadTaxesCities(action.request).pipe(
          first(),
          map((resp: ITaxesCitiesResponse) =>
            resp?.success
              ? CitiesActions.taxesCitiesSuccessAction(resp.cities)
              : CitiesActions.taxesCitiesFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              CitiesActions.taxesCitiesFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  LoadTaxesAgreements: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementsActions.taxesAgreementsLoadAction),
      switchMap((action) => {
        return this.taxPaymentService.loadTaxesAgreements(action.request).pipe(
          first(),
          map((resp: ITaxesAgreementsResponse) =>
            resp?.success
              ? AgreementsActions.taxesAgreementsSuccessAction(resp.agreements)
              : AgreementsActions.taxesAgreementsFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              AgreementsActions.taxesAgreementsFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  LoadTaxesAmountReference: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AmountReferenceActions.taxesAmountReferenceLoadAction),
      switchMap((action) => {
        return this.taxPaymentService
          .loadTaxesAmountReference(action.request)
          .pipe(
            first(),
            map((resp: ITaxesAmountReferenceResponse) =>
              resp?.success
                ? AmountReferenceActions.taxesAmountReferenceSuccessAction(resp)
                : AmountReferenceActions.taxesAmountReferenceFailAction(
                    resp.errorMessage
                  )
            ),
            catchError((error) =>
              of(
                AmountReferenceActions.taxesAmountReferenceFailAction(
                  error?.errorMessage || error.error
                )
              )
            )
          );
      })
    )
  );

  PaymentTaxes: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.taxesPaymentLoadAction),
      switchMap((action) => {
        return this.taxPaymentService.taxesPayment(action.request).pipe(
          first(),
          map((resp: ITaxesPaymentResponse) =>
            resp?.success
              ? PaymentActions.taxesPaymentSuccessAction(resp)
              : resp?.hiddenToast
              ? PaymentActions.taxesPaymentFailActionWithoutToast(
                  resp.errorMessage
                )
              : PaymentActions.taxesPaymentFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              PaymentActions.taxesPaymentFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );
}
