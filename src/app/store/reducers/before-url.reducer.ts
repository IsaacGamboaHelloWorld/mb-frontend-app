import { Action, createReducer, on } from '@ngrx/store';

import { setBeforeUrlAction } from '@store/actions/global.actions';

export const initialState = '/';

const featureReducer = createReducer(
  initialState,
  on(setBeforeUrlAction, (state, { url }) => url)
);

export const beforeUrlReducer = (state: string, action: Action): string => {
  return featureReducer(state, action);
};
