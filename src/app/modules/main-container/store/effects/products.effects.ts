import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  catchError,
  concatMap,
  first,
  map,
  switchMap,
  take
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import * as productsActions from '@modules/main-container/store/actions/products.action';
import { productsCancelAction } from '@modules/main-container/store/actions/products.action';
import * as nicknamesActions from '@modules/main-container/store/actions/nicknames.action';
import { ProductsService } from '@modules/main-container/services/products.service';
import {
  INicknamesResponse,
  IRespondServiceProducts
} from '@modules/main-container/entities/main-products.entities';
import { IProductsPack } from '@commons/entities/products.entities';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  detailProductLoadAction,
  productFailAction,
  productLoadAction,
  productSuccessAction
} from '@modules/main-container/store/actions/product.action';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { Product } from '@commons/models/product.model';
import { eventProducts } from '@commons/helpers/global.helper';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private facade: MainContainerFacade,
    private authSessionService: AuthSessionService,
    private translateService: TranslateService
  ) {}

  LoadProducts: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.productsLoadAction),
      switchMap(() => {
        return this.productsService.allProducts().pipe(
          take(1),
          map((products: IRespondServiceProducts) => {
            if (products?.success) {
              this.sendProducts(Object.keys(products.products || {}));
              this._loadProductDetail(products.products);
              return productsActions.productsSuccessAction(products.products);
            }
            return productsActions.productsFailAction(products.errorMessage);
          }),
          catchError((err) => of(productsActions.productsFailAction('')))
        );
      })
    )
  );

  LoadProduct: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(productLoadAction),
      concatMap((action) => {
        return from(this.authSessionService.getToken()).pipe(
          switchMap((token) =>
            token === ''
              ? of(productsCancelAction())
              : this._detailService(action.typeAccount, action.id)
          )
        );
      })
    )
  );

  LoadProductDetail: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(detailProductLoadAction),
      switchMap((action) => this._detailService(action.typeAccount, action.id))
    )
  );

  LoadNicknames: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(nicknamesActions.nicknamesLoadAction),
      switchMap((action) => {
        return this.productsService.fetchNicknames().pipe(
          first(),
          map((resp: INicknamesResponse) =>
            resp?.success
              ? nicknamesActions.nicknamesSuccessAction(resp.nicknames)
              : nicknamesActions.nicknamesFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              nicknamesActions.nicknamesFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  private _loadProductDetail(products: IProductsPack): void {
    let productsList = [];
    Object.keys(products).forEach(
      (key) => (productsList = productsList.concat(products[key]))
    );
    productsList.forEach((product: Product) => {
      this.facade.fetchLoadProduct(
        product.accountInformation.accountIdentifier,
        product.accountInformation.productType,
        this.translateService.instant(
          'PRODUCT_TYPES.' + product.accountInformation.productType
        ),
        this.translateService.instant(
          'PRODUCT_TYPES_SMALL.' + product.accountInformation.productType
        ),
        product
      );
    });
  }

  private _detailService(type: string, id: string): Observable<Action> {
    return this.productsService.detailProduct(type, id).pipe(
      take(1),
      map((product: Product) =>
        product?.success
          ? productSuccessAction(type, id, product)
          : productFailAction(type, id, product.errorMessage)
      ),
      catchError((err) => of(productFailAction(type, id, '')))
    );
  }

  private sendProducts(products: object): void {
    this.authSessionService.getToken().then((token) => {
      eventProducts({
        eventId: token,
        products
      });
    });
  }
}
