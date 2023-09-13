import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  detailProductFeatureName,
  IDetailProductState
} from '@modules/detail/product-detail/store/states/detail-product.state';

const DetailProductState = createFeatureSelector<IDetailProductState>(
  detailProductFeatureName
);

export const movements = createSelector(
  DetailProductState,
  (state: IDetailProductState) => state?.movements
);
