import { catchError, concatMap, map, switchMap, take } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { ProductsService } from '@modules/main-container/services/products.service';
import * as actions from '@modules/main-container/store/actions/pockets.action';
import { pocketsCancelAction } from '@modules/main-container/store/actions/pockets.action';
import {
  IPocketDetailRequest,
  IPockets,
  IPocketsByProduct
} from '@commons/entities/pockets.entities';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  pocketDetailFailAction,
  pocketDetailLoadAction,
  pocketDetailSuccessAction
} from '@modules/main-container/store/actions/pocket-detail.action';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';

@Injectable()
export class PocketsEffect {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private facade: MainContainerFacade,
    private authSessionService: AuthSessionService
  ) {}

  LoadPockets: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.pocketsLoadAction),
      switchMap(() => {
        return this.productsService.fetchPockets().pipe(
          take(1),
          map((pockets: IPockets) => {
            if (pockets?.success) {
              this._loadPocketDetail(pockets?.currentPocketsByProduct);
              return actions.pocketsSuccessAction(
                pockets?.currentPocketsByProduct
              );
            }
            return actions.pocketsFailAction(pockets?.errorMessage);
          }),
          catchError(() => of(actions.pocketsFailAction('')))
        );
      })
    );
  });

  LoadPocketDetail: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(pocketDetailLoadAction),
      concatMap((action) => {
        return from(this.authSessionService.getToken()).pipe(
          switchMap((token) =>
            token === ''
              ? of(pocketsCancelAction())
              : this._pocketDetailService(action?.basicPocket)
          )
        );
      })
    )
  );

  private _loadPocketDetail(pocketsByProduct: IPocketsByProduct[]): void {
    let pocketsList = [];
    Object.keys(pocketsByProduct).forEach(
      (key) => (pocketsList = pocketsList.concat(pocketsByProduct[key]))
    );
    pocketsList.forEach((productPockets) => {
      productPockets.pockets.forEach((pocket) => {
        const req: IPocketDetailRequest = {
          parentAccountId: productPockets.parent.accountIdentifier,
          parentAccountType: productPockets.parent.productType,
          pocketId: pocket.pocketId,
          pocketType: pocket.pocketType
        };
        this.facade.fetchLoadPocketDetail(req);
      });
    });
  }

  private _pocketDetailService(
    basicPocket: IPocketDetailRequest
  ): Observable<Action> {
    return this.productsService.pocketDetail(basicPocket).pipe(
      take(1),
      map((pocketDetail) => {
        return pocketDetail?.success
          ? pocketDetailSuccessAction(basicPocket, pocketDetail?.pockets[0])
          : pocketDetailFailAction(basicPocket, pocketDetail.errorMessage);
      }),
      catchError((err) => of(pocketDetailFailAction(basicPocket, '')))
    );
  }
}
