import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  IMainContainerState,
  mainContainerFeatureName
} from '@modules/main-container/store/states/main-container.state';
import { IRouteState } from '@commons/router/merged-route';
import { Product } from '@commons/models/product.model';
import { IProductsPack } from '@commons/entities/products.entities';
import { IAuthData } from '@commons/entities/auth-data.entities';
import { IPocket, IPocketsByProduct } from '@commons/entities/pockets.entities';
import { IPayrollLoans } from '@commons/entities/pay-rolls-loans.entities';
import { IProductNickname } from '@modules/main-container/entities/main-products.entities';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';

export const _findProduct = (
  _products: Product[],
  productFind: { id: string; type: string }
): Product => {
  if (!_products) {
    return null;
  }
  return _products.find(
    (product: Product) =>
      product.id === productFind?.id &&
      product.typeAccount === productFind?.type.toUpperCase()
  );
};

export const _findPocket = (
  _pockets: IPocketsByProduct[],
  productFind: { id: string; type: string }
): IPocketsByProduct => {
  if (!_pockets) {
    return null;
  }
  return _pockets.find(
    (pocket: IPocketsByProduct) =>
      pocket.parent?.accountIdentifier === productFind?.id &&
      pocket.parent?.productType === productFind?.type.toUpperCase()
  );
};

export const _findPocketsByProduct = (
  _pockets: IPocket[],
  productFind: { id: string; type: string }
): IPocket[] => {
  if (!_pockets) {
    return null;
  }
  return _pockets.filter(
    (pocket: IPocket) =>
      pocket.parentAccountId === productFind?.id &&
      pocket.parentAccountType === productFind?.type.toUpperCase()
  );
};

export const _findProductNickname = (
  _nicknames: IProductNickname[],
  productFind: { id: string; type: string }
): IProductNickname[] => {
  if (!_nicknames) {
    return null;
  }
  return _nicknames.filter(
    (productNickname: IProductNickname) =>
      productNickname.accountId === productFind?.id &&
      productNickname.accountType === productFind?.type.toUpperCase()
  );
};

export const _findPayRollLoans = (
  _payRollLoans: IPayrollLoans[],
  productFind: { id: string; type: string }
): IPayrollLoans => {
  if (!_payRollLoans) {
    return null;
  }
  return _payRollLoans.find(
    (product: IPayrollLoans) =>
      product?.accountId === productFind?.id &&
      product?.accountType === productFind?.type.toUpperCase()
  );
};

export const _findFreeDestination = (
  _freeDestinationDetails: IFreeDestinationDetail[],
  productFind: { id: string; type: string }
): IFreeDestinationDetail => {
  if (!_freeDestinationDetails) {
    return null;
  }
  return _freeDestinationDetails.find(
    (product: IFreeDestinationDetail) =>
      product?.accountIdentifier === productFind?.id &&
      product?.productType === productFind?.type.toUpperCase()
  );
};

export const _filterProducts = (
  _products: Product[],
  _types: string[]
): Product[] => {
  if (!_products) {
    return [];
  }

  return _products.filter((product) => _types.includes(product.typeAccount));
};

const _mapProducts = (
  _products: IProductsPack,
  _productsDetail: Product[]
): IProductsPack => {
  if (!_products) {
    return _products;
  }

  const productsMapped = {};

  Object.keys(_products).forEach((key) => {
    productsMapped[key] = _productsDetail.filter(
      (_item) => _item.typeAccount === key
    );
  });

  return productsMapped;
};

const MainContainerState = createFeatureSelector<IMainContainerState>(
  mainContainerFeatureName
);

const RouterState = createFeatureSelector<IRouteState>('router');
const AuthDataState = createFeatureSelector<IAuthData>('authData');

export const productsList = createSelector(
  MainContainerState,
  (state: IMainContainerState) => state.listProducts
);

export const navBarSelector = createSelector(
  MainContainerState,
  (state: IMainContainerState) => state?.hiddenNavBar
);

export const routerParamsSelector = createSelector(
  RouterState,
  (router: IRouteState) => router?.state?.params
);

export const routerDataSelector = createSelector(
  RouterState,
  (router: IRouteState) => router?.state?.data
);

export const routerUrlSelector = createSelector(
  RouterState,
  (router: IRouteState) => router?.state?.url
);

export const lastDateSelector = createSelector(
  AuthDataState,
  (state: IAuthData) => state?.lastAuthDate
);

export const complementarySelector = createSelector(
  AuthDataState,
  (state: IAuthData) => state?.complementary
);

const products = createSelector(
  MainContainerState,
  (state: IMainContainerState) => state.listProducts.products
);

export const productsDetail = createSelector(
  MainContainerState,
  (state: IMainContainerState) =>
    !!state?.productsDetail ? state.productsDetail : []
);

export const nicknames = createSelector(
  MainContainerState,
  (state: IMainContainerState) => state?.nicknames
);

export const nicknamesList = createSelector(
  MainContainerState,
  (state: IMainContainerState) =>
    !!state?.nicknames?.nicknames ? state.nicknames?.nicknames : []
);

export const payRollLoan = createSelector(
  MainContainerState,
  (state: IMainContainerState) =>
    !!state?.payRollLoans?.rollLoans ? state.payRollLoans?.rollLoans : []
);

export const pockets = createSelector(
  MainContainerState,
  (state: IMainContainerState) => state?.pockets
);

export const pocketsDetail = createSelector(
  MainContainerState,
  (state: IMainContainerState) => state?.pocketsDetail
);

export const pocketsData = createSelector(
  MainContainerState,
  (state: IMainContainerState) =>
    !!state?.pockets?.data ? state.pockets?.data : []
);

export const freeDestination = createSelector(
  MainContainerState,
  (state: IMainContainerState) => state?.freeDestination
);

export const freeDestinationDetails = createSelector(
  MainContainerState,
  (state: IMainContainerState) => state?.freeDestinationDetail
);

export const payRollLoans = createSelector(
  MainContainerState,
  (state) => state?.payRollLoans
);

export const productsSelector = createSelector(
  products,
  productsDetail,
  _mapProducts
);

export const tuplus = createSelector(
  MainContainerState,
  (state) => state?.tuplus
);

export const dataUser = createSelector(
  MainContainerState,
  (state) => state?.dataUser?.information
);

export const selectStocksAll = createSelector(
  MainContainerState,
  (state) => state.stocks?.all
);

export const selectStocksPeriod = createSelector(
  MainContainerState,
  (state) => state.stocks.period
);

export const selectStocksType = createSelector(
  MainContainerState,
  (state) => state.stocks?.type
);

export const qrProducts = createSelector(
  MainContainerState,
  (state) => state.qrProducts
);

export const qrInfo = createSelector(
  MainContainerState,
  (state) => state.qrInfo
);

export const activeCreditCardMain = createSelector(
  MainContainerState,
  (state) => state?.activeCreditCard
);

export const findProductInProducts = () =>
  createSelector(productsDetail, _findProduct);

export const findProductNicknames = () =>
  createSelector(nicknamesList, _findProductNickname);

export const findPayRollLoans = () =>
  createSelector(payRollLoan, _findPayRollLoans);

export const findFreeDestination = () =>
  createSelector(freeDestinationDetails, _findFreeDestination);

export const findPocketInPockets = () =>
  createSelector(pocketsData, _findPocket);

export const filterProducts = () =>
  createSelector(productsDetail, _filterProducts);

export const filterPocketsDetailByProduct = () =>
  createSelector(pocketsDetail, _findPocketsByProduct);
