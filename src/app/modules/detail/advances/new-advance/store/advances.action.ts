import { createAction } from '@ngrx/store';

import {
  IAdvanceResponse,
  IAdvanceService
} from '@modules/detail/advances/new-advance/entities/advances.entities';

export const advanceLoadAction = createAction(
  '[ADVANCES / API] Advances Load',
  (form: IAdvanceService) => ({ form })
);

export const advanceSuccessAction = createAction(
  '[ADVANCES / API] Advances Success',
  (response: IAdvanceResponse) => ({ response })
);

export const advanceFailAction = createAction(
  '[ADVANCES / API] Advances Fail',
  (errorMessage: string) => ({ errorMessage })
);

export const advanceFailActionWithoutToast = createAction(
  '[ADVANCES / API] Advances Fail',
  (errorMessage: string) => ({ errorMessage })
);

export const advanceResetAction = createAction(
  '[ADVANCES / API] Advances Reset'
);
