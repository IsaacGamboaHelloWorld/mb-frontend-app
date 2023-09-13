import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as actions from '@modules/activate-credit-card/store/actions/active-credit-card.action';
import { ChangeStatusCreditCardService } from '@modules/activate-credit-card/services/change-status-credit-card.service';
import { IActiveCreditCardService } from '@modules/activate-credit-card/entities/active-block-credit-card.entities';

@Injectable()
export class ActiveCreditCardEffect {
  constructor(
    private actions$: Actions,
    private changeStatusCreditCardService: ChangeStatusCreditCardService,
    private translateService: TranslateService
  ) {}

  ActiveCreditCard: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.activeCreditCardLoadAction),
      switchMap((action) => {
        return this.changeStatusCreditCardService
          .fetchActiveCreditCard(action.product)
          .pipe(
            first(),
            map((resp: IActiveCreditCardService) => {
              let message: string = this.translateService.instant(
                'ACTIVE_CREDIT_CARD.ERRORS.ERROR_TWO'
              );
              if (resp?.success) {
                return actions.activeCreditCardSuccessAction(resp);
              }
              if (
                resp?.specificErrorMessage &&
                resp.specificErrorMessage.indexOf('ACTIVATED') > 0
              ) {
                message = this.translateService.instant(
                  'ACTIVE_CREDIT_CARD.ERRORS.INFO'
                );
              } else if (
                resp?.specificErrorMessage &&
                resp?.specificErrorMessage.indexOf('NOT FOUND') > 0
              ) {
                message = this.translateService.instant(
                  'ACTIVE_CREDIT_CARD.ERRORS.ERROR_ONE'
                );
              }
              return actions.activeCreditCardFailAction(message);
            }),
            catchError((_) => of(actions.activeCreditCardFailAction('')))
          );
      })
    )
  );
}
