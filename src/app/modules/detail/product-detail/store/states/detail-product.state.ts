import { IMovementsState } from '@modules/detail/product-detail/store/states/movements.state';

export const detailProductFeatureName = 'detailProductModuleState';

export interface IDetailProductState {
  movements: IMovementsState;
}
