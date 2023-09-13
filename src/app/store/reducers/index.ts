import { Action, ActionReducer } from '@ngrx/store';

import { isLoggedInReducer as isLoggedIn } from './is-logged-in.reducer';
import { initialState, State } from '@store/state/state';
import { logoutUserAction } from '@store/actions/global.actions';
import { authDataReducer as authData } from '@store/reducers/auth-data.reducer';
import { beforeUrlReducer as beforeUrl } from '@store/reducers/before-url.reducer';

export const globalReducers = {
  isLoggedIn,
  authData,
  beforeUrl
};

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: State, action: Action): ActionReducer<any> =>
    reducer(
      action.type === logoutUserAction.type ? initialState : state,
      action
    );
}
