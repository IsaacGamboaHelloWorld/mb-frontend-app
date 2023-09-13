import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { RegisteredAccountService } from '@modules/transfer/services/registered-account.service';
import * as actions from '@modules/transfer/store/actions/registered-accounts.action';
import { IRegisteredAccountRespond } from '@modules/transfer/entities/registered-account.entities';

@Injectable()
export class RegisteredAccountEffect {
  constructor(
    private actions$: Actions,
    private registeredAccountService: RegisteredAccountService,
    private translateService: TranslateService
  ) {}

  LoadRegisteredAccount: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.registeredAccountLoadAction),
      switchMap((action) => {
        return this.registeredAccountService
          .registeredAccounts(action.accountId, action.accountType)
          .pipe(
            first(),
            map((resp: IRegisteredAccountRespond) => {
              if (resp?.success) {
                return actions.registeredAccountSuccessAction(
                  resp?.productAffiliations.map((product) => ({
                    ...product,
                    nameAccount: this.translateService.instant(
                      'PRODUCT_TYPES.' + product?.destinationAccountType
                    ),
                    smallName: this.translateService.instant(
                      'PRODUCT_TYPES_SMALL.' + product?.destinationAccountType
                    )
                  }))
                );
              }
              return actions.registeredAccountFailAction(resp.errorMessage);
            }),
            catchError((_) => of(actions.registeredAccountFailAction('')))
          );
      })
    )
  );
}
