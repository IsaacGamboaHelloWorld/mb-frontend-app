import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as info from '@modules/main-container/store/actions/qr-info.action';
import * as products from '@modules/main-container/store/actions/qr-products.action';
import { QrInfoService } from '@modules/main-container/services/qr-info.service';

@Injectable()
export class QrInfoEffect {
  constructor(
    private actions$: Actions,
    private qrInfoService: QrInfoService
  ) {}

  LoadQrInfo: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(info.qrInfoLoadAction),
      switchMap((action) => {
        return this.qrInfoService.qrInfo(action.body).pipe(
          first(),
          map((resp) =>
            resp.success
              ? info.qrInfoSuccessAction(resp.qrInfo)
              : info.qrInfoFailAction(resp.errorMessage)
          ),
          catchError((err) =>
            of(info.qrInfoFailAction(err.errorMessage || err.error))
          )
        );
      })
    )
  );

  LoadQrProducts: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(products.qrProductsLoadAction),
      switchMap((action) => {
        return this.qrInfoService.qrProducts(action.body).pipe(
          first(),
          map((resp) =>
            resp.success
              ? products.qrProductsSuccessAction(resp.paymentsMethods)
              : products.qrProductsFailAction(resp.errorMessage)
          ),
          catchError((err) =>
            of(products.qrProductsFailAction(err.errorMessage || err.error))
          )
        );
      })
    )
  );
}
