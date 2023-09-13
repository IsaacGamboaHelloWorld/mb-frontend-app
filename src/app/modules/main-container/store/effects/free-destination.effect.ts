import { catchError, concatMap, map, switchMap, take } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as actions from '@modules/main-container/store/actions/free-destination.action';
import * as actionsDetail from '@modules/main-container/store/actions/free-destination-detail.action';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { FreeDestinationService } from '@modules/main-container/services/free-destination.service';
import {
  IFreeDestinationAllResponse,
  IFreeDestinationCredit,
  IFreeDestinationDetailResponse
} from '@modules/main-container/entities/free-destination.entities';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';

@Injectable()
export class FreeDestinationEffect {
  constructor(
    private actions$: Actions,
    private freeDestinationService: FreeDestinationService,
    private facade: MainContainerFacade,
    private authSessionService: AuthSessionService
  ) {}

  LoadFreeDestinationAll: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.freeDestinationLoadAction),
      switchMap(() => {
        return this.freeDestinationService.allFreeDestination().pipe(
          take(1),
          map((freeDestination: IFreeDestinationAllResponse) => {
            if (freeDestination?.success) {
              this._loadFreeDestinationDetail(
                freeDestination?.freeDestinationCredits
              );
              return actions.freeDestinationSuccessAction(
                freeDestination?.freeDestinationCredits
              );
            }
            return actions.freeDestinationFailAction(
              freeDestination?.errorMessage
            );
          }),
          catchError(() => of(actions.freeDestinationFailAction('')))
        );
      })
    );
  });

  LoadFreeDestinationDetail: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsDetail.freeDestinationDetailLoadAction),
      concatMap((action) => {
        return from(this.authSessionService.getToken()).pipe(
          switchMap((token) =>
            token === ''
              ? of(actions.freeDestinationCancelAction())
              : this._freeDestinationDetailService(action?.accountId)
          )
        );
      })
    )
  );

  private _loadFreeDestinationDetail(
    freeDestinationCredits: IFreeDestinationCredit[]
  ): void {
    let freeDestinationCreditsList = [];
    Object.keys(freeDestinationCredits).forEach(
      (key) =>
        (freeDestinationCreditsList = freeDestinationCreditsList.concat(
          freeDestinationCredits[key]
        ))
    );
    freeDestinationCreditsList.forEach((credit) => {
      this.facade.fetchLoadFreeDestinationDetail(credit?.accountIdentifier);
    });
  }

  private _freeDestinationDetailService(accountId: string): Observable<Action> {
    return this.freeDestinationService.freeDestinationDetail(accountId).pipe(
      take(1),
      map((freeDestinationDetail: IFreeDestinationDetailResponse) => {
        freeDestinationDetail.freeDestinationCredit.productType =
          TYPE_ACCOUNTS.FREE_DESTINATION;
        freeDestinationDetail.freeDestinationCredit.success =
          freeDestinationDetail.success;
        return freeDestinationDetail?.success
          ? actionsDetail.freeDestinationDetailSuccessAction(
              accountId,
              freeDestinationDetail?.freeDestinationCredit
            )
          : actionsDetail.freeDestinationDetailFailAction(
              accountId,
              freeDestinationDetail.errorMessage
            );
      }),
      catchError((err) =>
        of(actionsDetail.freeDestinationDetailFailAction(accountId, ''))
      )
    );
  }
}
