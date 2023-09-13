import { IDebitCardListService } from '@modules/block-product/entities/block.entities';

export const blockProductFeatureName = 'blockProductModuleState';

export interface IBlockProductState {
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IDebitCardListState {
  data: IDebitCardListService;
  error: boolean;
  loading: boolean;
  loaded: boolean;
}

export interface IFeatureBlockProductState {
  blockProduct: IBlockProductState;
  debitCard: IDebitCardListState;
}
