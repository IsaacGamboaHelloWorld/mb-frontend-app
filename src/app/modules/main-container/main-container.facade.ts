import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Data, Params } from '@angular/router';
import { map } from 'rxjs/operators';

import { AppFacade } from '@app/app.facade';
import { productsLoadAction } from '@modules/main-container/store/actions/products.action';
import {
  detailProductLoadAction,
  productLoadAction,
  toogleHiddenIdProductAction
} from '@modules/main-container/store/actions/product.action';
import { IProductsPack } from '@commons/entities/products.entities';
import {
  activeCreditCardMain,
  complementarySelector,
  dataUser,
  filterPocketsDetailByProduct,
  filterProducts,
  findFreeDestination,
  findPayRollLoans,
  findPocketInPockets,
  findProductInProducts,
  freeDestination,
  freeDestinationDetails,
  lastDateSelector,
  navBarSelector,
  nicknames,
  payRollLoans,
  pockets,
  productsDetail,
  productsList,
  productsSelector,
  qrInfo,
  qrProducts,
  routerDataSelector,
  routerParamsSelector,
  routerUrlSelector,
  selectStocksAll,
  selectStocksPeriod,
  selectStocksType,
  tuplus
} from '@modules/main-container/store/main-container.selector';
import { ValidatePing } from '@modules/main-container/store/actions/auth-validation-session.action';
import { ValidateSession } from '@modules/main-container/store/actions/security-validate-key.action';
import {
  IFreeDestinationState,
  INicknamesState,
  IPayRollLoansState,
  IPocketsState,
  IProductsState
} from '@modules/main-container/store/states/products.state';
import { Product } from '@commons/models/product.model';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { pocketsLoadAction } from '@modules/main-container/store/actions/pockets.action';
import { rollLoansLoadAction } from '@modules/main-container/store/actions/pay-roll-loans.action';
import {
  IPocket,
  IPocketDetailRequest,
  IPocketsByProduct
} from '@commons/entities/pockets.entities';
import { tuplusLoad } from '@modules/main-container/store/actions/tuplus.action';
import {
  IQrInfoState,
  IQrProductsState,
  IStocksAllState,
  IStocksPeriodState,
  IStocksTypeState,
  ITuplusState
} from '@modules/main-container/store/states/main-container.state';
import {
  stocksAllLoad,
  stocksPeriodLoad,
  stocksTypeLoad
} from '@modules/main-container/store/actions/stocks.action';
import { IStocksAllParams } from '@modules/main-container/entities/stocks.interface';
import {
  dataUserLoad,
  resetActiveCreditCard,
  setActiveCreditCard
} from '@modules/main-container/store/actions/data-user';
import { IDataUser } from '@modules/main-container/entities/user.entities';
import {
  qrInfoLoadAction,
  qrInfoResetAction
} from '@modules/main-container/store/actions/qr-info.action';
import {
  qrProductsLoadAction,
  qrProductsResetAction
} from '@modules/main-container/store/actions/qr-products.action';
import { IStorageItem } from '@commons/entities/global.entities';
import {
  pocketDetailLoadAction,
  pocketDetailResetAction
} from '@modules/main-container/store/actions/pocket-detail.action';
import { nicknamesLoadAction } from '@modules/main-container/store/actions/nicknames.action';
import { freeDestinationDetailLoadAction } from '@modules/main-container/store/actions/free-destination-detail.action';
import { freeDestinationLoadAction } from '@modules/main-container/store/actions/free-destination.action';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';
import { IPayrollLoans } from '@commons/entities/pay-rolls-loans.entities';

@Injectable()
export class MainContainerFacade extends AppFacade {
  public combinationProducts$: Observable<IProductsPack> = this.store.pipe(
    select(productsSelector)
  );

  public activeCreditCardMain$: Observable<IStorageItem> = this.store.pipe(
    select(activeCreditCardMain)
  );

  public products$: Observable<Product[]> = this.store.pipe(
    select(productsDetail)
  );

  public pockets$: Observable<IPocketsState> = this.store.pipe(select(pockets));

  public freeDestination$: Observable<IFreeDestinationState> = this.store.pipe(
    select(freeDestination)
  );

  public freeDestinationDetails$: Observable<
    IFreeDestinationDetail[]
  > = this.store.pipe(select(freeDestinationDetails));

  public payRollLoans$: Observable<IPayRollLoansState> = this.store.pipe(
    select(payRollLoans)
  );

  public productList$: Observable<IProductsState> = this.store.pipe(
    select(productsList)
  );

  public nicknames$: Observable<INicknamesState> = this.store.pipe(
    select(nicknames)
  );

  public hasErrorProducts$: Observable<boolean> = this.productList$.pipe(
    map((list) => isNullOrUndefined(list?.products))
  );

  public routerParams$: Observable<Params> = this.store.pipe(
    select(routerParamsSelector)
  );

  public routerData$: Observable<Data> = this.store.pipe(
    select(routerDataSelector)
  );

  public routerUrl$: Observable<string> = this.store.pipe(
    select(routerUrlSelector)
  );

  public hiddenNavBar$: Observable<boolean> = this.store.pipe(
    select(navBarSelector)
  );

  public lastDate$: Observable<Date> = this.store.pipe(
    select(lastDateSelector)
  );

  public complementary$: Observable<boolean> = this.store.pipe(
    select(complementarySelector)
  );

  public tuplusBalance$: Observable<ITuplusState> = this.store.pipe(
    select(tuplus)
  );

  public stocksAll$: Observable<IStocksAllState> = this.store.pipe(
    select(selectStocksAll)
  );

  public stocksPeriod$: Observable<IStocksPeriodState> = this.store.pipe(
    select(selectStocksPeriod)
  );

  public stocksType$: Observable<IStocksTypeState> = this.store.pipe(
    select(selectStocksType)
  );

  public dataUser$: Observable<IDataUser> = this.store.pipe(select(dataUser));

  public qrInfo$: Observable<IQrInfoState> = this.store.pipe(select(qrInfo));

  public qrProducts$: Observable<IQrProductsState> = this.store.pipe(
    select(qrProducts)
  );

  public findProduct$(id: string, type: string): Observable<Product> {
    return this.store.pipe(select(findProductInProducts(), { id, type }));
  }

  public findPayLoan$(id: string, type: string): Observable<IPayrollLoans> {
    return this.store.pipe(select(findPayRollLoans(), { id, type }));
  }

  public findFreeDestination$(
    id: string,
    type: string
  ): Observable<IFreeDestinationDetail> {
    return this.store.pipe(select(findFreeDestination(), { id, type }));
  }

  public findPocket$(id: string, type: string): Observable<IPocketsByProduct> {
    return this.store.pipe(select(findPocketInPockets(), { id, type }));
  }

  public findPocketsByProduct$(
    id: string,
    type: string
  ): Observable<IPocket[]> {
    return this.store.pipe(
      select(filterPocketsDetailByProduct(), { id, type })
    );
  }

  public filterProducts$(types: string[]): Observable<Product[]> {
    return this.store.pipe(select(filterProducts(), types));
  }

  public fetchLoadProducts(): void {
    this.store.dispatch(productsLoadAction());
  }

  public fetchProduct(type: string, id: string): void {
    this.store.dispatch(detailProductLoadAction(type, id));
  }

  public fetchNicknames(): void {
    this.store.dispatch(nicknamesLoadAction());
  }

  public fetchPockets(): void {
    this.store.dispatch(pocketsLoadAction());
  }

  public fetchLoadPocketDetail(basicPocket: IPocketDetailRequest): void {
    this.store.dispatch(pocketDetailLoadAction(basicPocket));
  }

  public fetchRollLoans(): void {
    this.store.dispatch(rollLoansLoadAction());
  }

  public fetchTuplus(): void {
    this.store.dispatch(tuplusLoad());
  }

  public fetchFreeDestination(): void {
    this.store.dispatch(freeDestinationLoadAction());
  }

  public fetchLoadFreeDestinationDetail(accountId: string): void {
    this.store.dispatch(freeDestinationDetailLoadAction(accountId));
  }
  public toogleHiddenId(typeAccount: string, id: string): void {
    this.store.dispatch(toogleHiddenIdProductAction(typeAccount, id));
  }

  public validatePing(): void {
    this.store.dispatch(ValidatePing());
  }

  public validateSession(): void {
    this.store.dispatch(ValidateSession());
  }

  public fetchLoadProduct(
    type: string,
    id: string,
    name: string,
    nameSmall: string,
    product: Product
  ): void {
    this.store.dispatch(productLoadAction(id, type, name, nameSmall, product));
  }

  public fetchStocksPeriod(): void {
    this.store.dispatch(stocksPeriodLoad());
  }

  public fetchStocksType(): void {
    this.store.dispatch(stocksTypeLoad());
  }

  public fetchStocksAll(params: IStocksAllParams): void {
    this.store.dispatch(stocksAllLoad(params));
  }

  public fetchUserData(): void {
    this.store.dispatch(dataUserLoad());
  }

  public fetchQrInfo(qrMetaData: string): void {
    this.store.dispatch(qrInfoLoadAction({ qrMetaData }));
  }

  public qrInfoReset(): void {
    this.store.dispatch(qrInfoResetAction());
  }

  public fetchQrProducts(acctType: string): void {
    this.store.dispatch(qrProductsLoadAction({ acctType }));
  }

  public qrProductsReset(): void {
    this.store.dispatch(qrProductsResetAction());
  }

  public setCreditCard(product: IStorageItem): void {
    this.store.dispatch(setActiveCreditCard(product));
  }

  public resetCreditCard(): void {
    this.store.dispatch(resetActiveCreditCard());
  }

  public resetPocketDetail(): void {
    this.store.dispatch(pocketDetailResetAction());
  }
}
