import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  blockProductFeatureName,
  IFeatureBlockProductState
} from '@modules/block-product/store/block-product.state';

const BlockProductState = createFeatureSelector<IFeatureBlockProductState>(
  blockProductFeatureName
);

export const blockProduct = createSelector(
  BlockProductState,
  (state: IFeatureBlockProductState) => state.blockProduct
);

export const debitCard = createSelector(
  BlockProductState,
  (state: IFeatureBlockProductState) => state.debitCard
);
