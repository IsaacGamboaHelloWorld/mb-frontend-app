import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { BillersService } from '@modules/payments/services/billers.service';
import * as actions from '@modules/payments/store/actions/billers-list.action';
import * as payment from '@modules/payments/store/actions/billers-payment.action';
import * as detail from '@modules/payments/store/actions/billers-detail.action';
import * as search from '@modules/payments/store/actions/billers-search.action';
import * as barcode from '@modules/payments/store/actions/billers-barcode.action';

@Injectable()
export class BillersEffect {
  constructor(
    private actions$: Actions,
    private billerService: BillersService
  ) {}

  LoadListBiller: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.listBillerLoadAction),
      switchMap((action) => {
        return this.billerService.listBillers().pipe(
          first(),
          map((resp) =>
            resp?.success
              ? actions.listBillerSuccessAction(resp.billerPayments)
              : actions.listBillerFailAction(resp.errorMessage)
          ),
          catchError((_) => of(actions.listBillerFailAction('')))
        );
      })
    )
  );

  PaymentBiller: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(payment.paymentBillerLoadAction),
      switchMap((action) => {
        return this.billerService.publicBillPayment(action.body).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? payment.paymentBillerSuccessAction(resp)
              : resp?.hiddenToast
              ? payment.paymentBillerFailActionWithoutToast(resp.errorMessage)
              : payment.paymentBillerFailAction(resp.errorMessage)
          ),
          catchError((err) =>
            of(payment.paymentBillerFailAction(err.errorMessage || err.error))
          )
        );
      })
    )
  );

  searchBiller: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(search.searchBillerLoadAction),
      switchMap((action) => {
        return this.billerService.searchBiller(action.body).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? search.searchBillerSuccessAction(resp?.agreements)
              : search.searchBillerFailAction(resp.errorMessage)
          ),
          catchError((_) => of(search.searchBillerFailAction('')))
        );
      })
    )
  );

  detailBiller: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(detail.detailBillerLoadAction),
      switchMap((action) => {
        return this.billerService.billerDetail(action.body).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? detail.detailBillerSuccessAction(resp?.billerPayment)
              : detail.detailBillerFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(detail.detailBillerFailAction(error?.errorMessage || ''))
          )
        );
      })
    )
  );

  barcodeBiller: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(barcode.barcodeBillerLoadAction),
      switchMap((action) => {
        return this.billerService.billerBarcode(action.body).pipe(
          first(),
          map((resp) =>
            resp?.success
              ? barcode.barcodeBillerSuccessAction(resp?.billerPayment)
              : barcode.barcodeBillerFailAction(resp?.errorMessage)
          ),
          catchError((_) => of(barcode.barcodeBillerFailAction('')))
        );
      })
    )
  );
}
