import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/main-container/store/actions/product.action';
import { Product } from '@commons/models/product.model';
import {
  INITIAL_STATE_HIDDEN_ID,
  PRODUCTS_WITH_HIDDEN_ID
} from '@app/commons/constants/group-products';

export const featureProductsDetail = createReducer(
  [],
  on(
    actions.productLoadAction,
    (state, { typeAccount, id, product, nameAccount, nameSmall }) => {
      if (!findProduct(state, id, typeAccount)) {
        return [
          ...state,
          {
            ...product,
            id,
            nameAccount,
            typeAccount,
            nameSmall,
            loading: true,
            completed: false,
            error: false,
            errorMessage: '',
            ...(PRODUCTS_WITH_HIDDEN_ID.includes(typeAccount) && {
              showHiddenId: true
            }),
            ...(PRODUCTS_WITH_HIDDEN_ID.includes(typeAccount) && {
              hiddenIdStatus: INITIAL_STATE_HIDDEN_ID
            })
          }
        ];
      }
      return [...state];
    }
  ),
  on(actions.productSuccessAction, (state, { typeAccount, id, product }) => {
    return state.map((data: Product) => {
      if (data.id === id && data.typeAccount === typeAccount) {
        return {
          ...data,
          ...product,
          loading: false,
          completed: true,
          error: false,
          errorMessage: ''
        };
      } else {
        return data;
      }
    });
  }),
  on(actions.productFailAction, (state, { typeAccount, id, errorMessage }) => {
    return state.map((product: Product) => {
      if (product.id === id && product.typeAccount === typeAccount) {
        return {
          ...product,
          loading: false,
          completed: false,
          error: true,
          errorMessage
        };
      } else {
        return product;
      }
    });
  }),
  on(actions.detailProductLoadAction, (state, { typeAccount, id }) => {
    return state.map((product: Product) => {
      if (product.id === id && product.typeAccount === typeAccount) {
        return {
          ...product,
          loading: true,
          completed: false,
          error: false,
          errorMessage: ''
        };
      } else {
        return product;
      }
    });
  }),
  on(actions.toogleHiddenIdProductAction, (state, { typeAccount, id }) => {
    return state.map((product: Product) => {
      if (product.id === id && product.typeAccount === typeAccount) {
        return {
          ...product,
          hiddenIdStatus: !product.hiddenIdStatus
        };
      } else {
        return product;
      }
    });
  })
);
function findProduct(
  state: Product[],
  id: string,
  typeAccount: string
): boolean {
  return (
    state.filter(
      (data: Product) => data.id === id && data.typeAccount === typeAccount
    ).length > 0
  );
}
