import { createAction, props } from '@ngrx/store';

import { type } from '@commons/utils/util';
import { LoadingProperties } from '@commons/entities/loading.entities';

export const enableLoadingAction = createAction(
  type('[Loading] Enable Loading'),
  props<{ payload?: LoadingProperties }>()
);

export const disableLoadingAction = createAction(
  type('[Loading] Disable Loading')
);

export const EnableLoadingObserverActionsTypes = [];

export const DisableLoadingObserverActionsTypes = [];
