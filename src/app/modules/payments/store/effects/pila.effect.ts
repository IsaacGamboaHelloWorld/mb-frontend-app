import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import * as pilaAgreementsActions from '@modules/payments/store/actions/pila-agreements.action';
import * as pilaInformationActions from '@modules/payments/store/actions/pila-information.action';
import * as pilaPaymentActions from '@modules/payments/store/actions/pila-payment.action';
import { PilaPaymentService } from '@modules/payments/services/pila-payment.service';
import {
  IPilaAgreementsAvailableResponse,
  IPilaInformationResponse,
  IPilaPaymentResponse
} from '@modules/payments/entities/pila-payment.entities';

@Injectable()
export class PilaEffect {
  constructor(
    private actions$: Actions,
    private pilaPaymentService: PilaPaymentService
  ) {}

  LoadPilaAgreements: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(pilaAgreementsActions.pilaAgreementsLoadAction),
      switchMap((action) => {
        return this.pilaPaymentService.loadPilaAgreements(action.request).pipe(
          first(),
          map((resp: IPilaAgreementsAvailableResponse) =>
            resp?.success
              ? pilaAgreementsActions.pilaAgreementsSuccessAction(
                  resp.agreements
                )
              : pilaAgreementsActions.pilaAgreementsFailAction(
                  resp.errorMessage
                )
          ),
          catchError((error) =>
            of(
              pilaAgreementsActions.pilaAgreementsFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  LoadPilaInformation: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(pilaInformationActions.pilaInformationLoadAction),
      switchMap((action) => {
        return this.pilaPaymentService.loadPilaInformation(action.request).pipe(
          first(),
          map((resp: IPilaInformationResponse) =>
            resp?.success
              ? pilaInformationActions.pilaInformationSuccessAction(resp)
              : pilaInformationActions.pilaInformationFailAction(
                  resp.errorMessage
                )
          ),
          catchError((error) =>
            of(
              pilaInformationActions.pilaInformationFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  LoadPilaPayment: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(pilaPaymentActions.pilaPaymentLoadAction),
      switchMap((action) => {
        return this.pilaPaymentService.pilaPayment(action.request).pipe(
          first(),
          map((resp: IPilaPaymentResponse) =>
            resp?.success
              ? pilaPaymentActions.pilaPaymentSuccessAction(resp)
              : resp?.hiddenToast
              ? pilaPaymentActions.pilaPaymentFailActionWithoutToast(
                  resp.errorMessage
                )
              : pilaPaymentActions.pilaPaymentFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              pilaPaymentActions.pilaPaymentFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );
}
