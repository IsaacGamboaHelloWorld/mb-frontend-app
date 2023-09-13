import { createReducer, on } from '@ngrx/store';
import * as actions from '@modules/tuplus/store/actions/source-path.action';
import { setBeforeUrlAction } from '@store/actions/global.actions';

export const initPath: string = '/';

export const sourcePathReducer = createReducer(
  initPath,
  on(actions.setSourcePathAction, (state, { url }) => url),
  on(actions.resetSourcePathAction, () => initPath)
);
