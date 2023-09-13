import { createAction, props } from '@ngrx/store';

import { type } from '@app/commons/utils/util';
import {
  IEnrollmentResponse,
  IStartAuth
} from '@modules/auth/entities/auth.interface';

export const setLoadingAuthAction = createAction(
  type('[AUTH] Set Loading auth')
);

export const startAuthAction = createAction(
  type('[AUTH/API] Fetch auth'),
  props<{ authData: IStartAuth }>()
);

export const enrollmentStepSuccessAction = createAction(
  type('[ENROLLMENT / API] Fetch Enrollment success'),
  props<{ content: IEnrollmentResponse }>()
);

export const enrollmentStepErrorAction = createAction(
  type('[ENROLLMENT / API] Fetch Enrollment error')
);

export const enrollmentResetAction = createAction(
  type('[ENROLLMENT / API] Reset Enrollment')
);
