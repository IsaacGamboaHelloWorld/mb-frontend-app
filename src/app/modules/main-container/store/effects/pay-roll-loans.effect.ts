import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { ProductsService } from '@modules/main-container/services/products.service';
import * as actions from '@modules/main-container/store/actions/pay-roll-loans.action';

@Injectable()
export class PayRollLoansEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductsService,
    private translateService: TranslateService
  ) {}

  LoadPayRollLoans: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.rollLoansLoadAction),
      switchMap(() => {
        return this.productService.fetchRollLoans().pipe(
          take(1),
          map((rollLoans) => {
            const { payrollLoans, errorMessage } = rollLoans;
            return rollLoans?.success
              ? actions.rollLoansSuccessAction(
                  payrollLoans?.map((product) => ({
                    ...product,
                    id: product?.accountId,
                    typeAccount: product?.accountType,
                    nameAccount: this.translateService.instant(
                      'PRODUCT_TYPES.' + product?.accountType
                    )
                  }))
                )
              : actions.rollLoansFailAction(errorMessage);
          }),
          catchError(() => of(actions.rollLoansFailAction('')))
        );
      })
    );
  });
}
