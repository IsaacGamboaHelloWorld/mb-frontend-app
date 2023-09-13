import { createAction } from '@ngrx/store';
import { ICertificatePeriodRequest } from '@modules/documents/tax-certificates/entities/tax-certificates.entities';

export const certificateRACLoadAction = createAction(
  '[CERTIFICATE RAC / API] Certificate RAC Load',
  (body: ICertificatePeriodRequest) => ({ body })
);
export const certificateRACResetAction = createAction(
  '[CERTIFICATE RAC] Certificate RAC Reset'
);
export const certificateRACSuccessAction = createAction(
  '[CERTIFICATE RAC / API] Certificate RAC Success',
  (successMessage: string) => ({
    successMessage
  })
);
export const certificateRACFailAction = createAction(
  '[CERTIFICATE RAC / API] Certificate RAC Fail',
  (errorMessage: string) => ({ errorMessage })
);
