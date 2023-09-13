import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { QrService } from '@modules/qr/new-payment/services/qr.service';
import * as payment from '@modules/qr/new-payment/store/actions/qr-payment.action';
import * as annulment from '@modules/qr/new-payment/store/actions/qr-annulment.action';

@Injectable()
export class QrEffect {
  constructor(private actions$: Actions, private qrService: QrService) {}

  LoadQrPayment: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(payment.qrPaymentLoadAction),
      switchMap((action) => {
        return this.qrService.qrPayment(action.body).pipe(
          first(),
          map((resp) =>
            resp.success
              ? payment.qrPaymentSuccessAction(resp)
              : payment.qrPaymentFailAction(resp.errorMessage)
          ),
          catchError((err) =>
            of(payment.qrPaymentFailAction(err.errorMessage || err.error))
          )
        );
      })
    )
  );

  LoadQrAnnulment: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(annulment.qrAnnulmentLoadAction),
      switchMap((action) => {
        return this.qrService.qrAnnulment(action.body).pipe(
          first(),
          map((resp) =>
            resp.success
              ? annulment.qrAnnulmentSuccessAction(resp)
              : annulment.qrAnnulmentFailAction(resp.errorMessage)
          ),
          catchError((err) =>
            of(annulment.qrAnnulmentFailAction(err.errorMessage || err.error))
          )
        );
      })
    )
  );
}
