import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/main-container/store/actions/pocket-detail.action';
import {
  IPocket,
  IPocketDetailRequest
} from '@commons/entities/pockets.entities';

export const featurePocketsDetail = createReducer(
  [],
  on(actions.pocketDetailLoadAction, (state, { basicPocket }) => {
    if (!findPocket(state, basicPocket)) {
      return [
        ...state,
        {
          ...basicPocket,
          loading: true,
          completed: false,
          error: false,
          errorMessage: ''
        }
      ];
    }
    return [...state];
  }),
  on(actions.pocketDetailSuccessAction, (state, { basicPocket, pocket }) => {
    return state.map((data: IPocket) => {
      if (
        data.parentAccountId === basicPocket?.parentAccountId &&
        data.parentAccountType === basicPocket?.parentAccountType &&
        data.pocketId === basicPocket?.pocketId
      ) {
        return {
          ...pocket,
          ...basicPocket,
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
  on(actions.pocketDetailFailAction, (state, { basicPocket, errorMessage }) => {
    return state.map((pocket: IPocket) => {
      if (
        pocket.parentAccountId === basicPocket?.parentAccountId &&
        pocket.parentAccountType === basicPocket?.parentAccountType &&
        pocket.pocketId === basicPocket?.pocketId
      ) {
        return {
          ...pocket,
          loading: false,
          completed: false,
          error: true,
          errorMessage
        };
      } else {
        return pocket;
      }
    });
  }),
  on(actions.pocketDetailResetAction, () => [])
);

function findPocket(
  state: IPocket[],
  basicPocket: IPocketDetailRequest
): boolean {
  return (
    state.filter(
      (data: IPocket) =>
        data.parentAccountId === basicPocket.parentAccountId &&
        data.parentAccountType === basicPocket.parentAccountType &&
        data.pocketId === basicPocket.pocketId &&
        data.pocketType === basicPocket.pocketType
    ).length > 0
  );
}
