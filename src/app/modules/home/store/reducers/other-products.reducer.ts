import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/home/store/actions/other-products.action';
import { IOtherProduct } from '@modules/home/store/home.state';

export const initOtherProducts: IOtherProduct[] = [];

export const featureOtherProduct = createReducer(
  initOtherProducts,
  on(actions.otherProductLoad, (state, { bank }) => {
    if (!findProduct(state, bank.entitySearch)) {
      return [
        ...state,
        {
          key: bank.entitySearch,
          loading: true,
          completed: false,
          error: false,
          errorMessage: ''
        }
      ];
    } else {
      return state.map((data: IOtherProduct) => {
        if (data.key === bank.entitySearch) {
          return {
            ...data,
            loading: true,
            completed: false,
            error: false,
            errorMessage: ''
          };
        } else {
          return data;
        }
      });
    }
  }),
  on(actions.otherProductSuccess, (state, { products, nameBank }) => {
    return state.map((data: IOtherProduct) => {
      if (data.key === nameBank) {
        return {
          ...data,
          products,
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
  on(actions.otherProductFail, (state, { nameBank, errorMessage }) => {
    return state.map((data: IOtherProduct) => {
      if (data.key === nameBank) {
        return {
          ...data,
          loading: false,
          completed: false,
          error: true,
          errorMessage
        };
      } else {
        return data;
      }
    });
  })
);

export const featureOtherProductToggle = createReducer(
  false,
  on(actions.otherProductShow, (state, { show }) => {
    return show;
  })
);

function findProduct(state: any[], bank: string): boolean {
  return state.filter((data: IOtherProduct) => data.key === bank).length > 0;
}
