import { createAction, props } from '@ngrx/store';

import { type } from '@commons/utils/util';
import { IToastProperties } from '@commons/entities/toast.entities';
import { IAuthData } from '@commons/entities/auth-data.entities';

export const setIsLoggedAction = createAction(
  type('[Global/API] Set logged'),
  props<{ isLogged: boolean }>()
);

export const logoutUserAction = createAction(
  type('[Global/API] Logout user action')
);
export const logoutUserSuccessAction = createAction(
  type('[Global/API] Logout user success action')
);
export const logoutUserErrorAction = createAction(
  type('[Global/API] Logout user error action')
);

export const changeStatusAction = createAction(
  type('[Global/UI] Change status'),
  (payload: IToastProperties) => ({ payload })
);

export const changeStatusSuccessAction = createAction(
  type('[Global/UI] Change status success'),
  (payload?: IToastProperties) => ({ payload })
);

export const setAuthAction = createAction(
  type('[Global/API] Set Auth'),
  (auth: IAuthData) => ({ auth })
);

export const turnOnComplementaryAction = createAction(
  type('[Global/API] Turn on Complementary property')
);
export const setBeforeUrlAction = createAction(
  type('[Global] Set Before Url'),
  (url: string) => ({ url })
);
