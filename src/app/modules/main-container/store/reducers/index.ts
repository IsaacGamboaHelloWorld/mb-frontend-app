import { combineReducers } from '@ngrx/store';

import { featureProductsDetail as productsDetail } from '@modules/main-container/store/reducers/product-detail.reducer';
import { featureProducts as listProducts } from '@modules/main-container/store/reducers/products.reducer';
import { featureNicknames as nicknames } from '@modules/main-container/store/reducers/nicknames.reducer';
import { featurePockets as pockets } from '@modules/main-container/store/reducers/pockets.reducer';
import { featurePocketsDetail as pocketsDetail } from '@modules/main-container/store/reducers/pocket-detail.reducer';
import { featureNavBar as hiddenNavBar } from '@modules/main-container/store/reducers/nav-bar.reducer';
import { featureTuplus as tuplus } from '@modules/main-container/store/reducers/tuplus.reducer';
import { featureFreeDestination as freeDestination } from '@modules/main-container/store/reducers/free-destination.reducer';
import { featureFreeDestinationDetail as freeDestinationDetail } from '@modules/main-container/store/reducers/free-destination-detail.reducer';
import { featureRollLoans as payRollLoans } from '@modules/main-container/store/reducers/pay-roll-loans.reducer';
import { stocksAllReducer as all } from '@modules/main-container/store/reducers/stocks-all.reducer';
import { stocksPeriodReducer as period } from '@modules/main-container/store/reducers/stocks-period.reducer';
import { stocksTypeReducer as type } from '@modules/main-container/store/reducers/stocks-type.reducer';
import { featureDataUser as dataUser } from '@modules/main-container/store/reducers/data-user.reducer';
import { featureQrInfo as qrInfo } from '@modules/main-container/store/reducers/qr-info.reducer';
import { featureQrProducts as qrProducts } from '@modules/main-container/store/reducers/qr-products.reducer';
import { activeCreditCardReducer as activeCreditCard } from '@modules/main-container/store/reducers/active-credit-card.reducer';

const stocks = combineReducers({
  all,
  period,
  type
});

export const mainContainerRootReducer = combineReducers({
  productsDetail,
  listProducts,
  nicknames,
  pockets,
  pocketsDetail,
  hiddenNavBar,
  tuplus,
  payRollLoans,
  stocks,
  dataUser,
  qrInfo,
  qrProducts,
  activeCreditCard,
  freeDestination,
  freeDestinationDetail
});
