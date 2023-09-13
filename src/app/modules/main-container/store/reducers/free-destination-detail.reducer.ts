import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/main-container/store/actions/free-destination-detail.action';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';

export const featureFreeDestinationDetail = createReducer(
  [],
  on(actions.freeDestinationDetailLoadAction, (state, { accountId }) => {
    if (!findFreeDestProduct(state, accountId)) {
      return [
        ...state,
        {
          accountId,
          loading: true,
          completed: false,
          error: false,
          errorMessage: ''
        }
      ];
    }
    return [...state];
  }),
  on(
    actions.freeDestinationDetailSuccessAction,
    (state, { accountId, freeDestinationDetail }) => {
      return state.map((data) => {
        if (data.accountId === accountId) {
          return {
            ...freeDestinationDetail,
            accountId,
            loading: false,
            completed: true,
            error: false,
            errorMessage: ''
          };
        } else {
          return data;
        }
      });
    }
  ),
  on(
    actions.freeDestinationDetailFailAction,
    (state, { accountId, errorMessage }) => {
      return state.map((data: IFreeDestinationDetail) => {
        if (data.accountIdentifier === accountId) {
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
    }
  ),
  on(actions.freeDestinationDetailResetAction, () => [])
);

function findFreeDestProduct(
  state: IFreeDestinationDetail[],
  accountId: string
): boolean {
  return (
    state.filter(
      (data: IFreeDestinationDetail) => data.accountIdentifier === accountId
    ).length > 0
  );
}
