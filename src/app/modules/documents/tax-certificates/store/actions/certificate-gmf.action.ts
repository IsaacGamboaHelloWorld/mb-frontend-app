import { createAction } from '@ngrx/store';
import { ICertificatePeriodRequest } from '@modules/documents/tax-certificates/entities/tax-certificates.entities';

export const certificateGMFLoadAction = createAction(
  '[CERTIFICATE GMF / API] Certificate GMF Load',
  (body: ICertificatePeriodRequest) => ({ body })
);
export const certificateGMFResetAction = createAction(
  '[CERTIFICATE GMF] Certificate GMF Reset'
);
export const certificateGMFSuccessAction = createAction(
  '[CERTIFICATE GMF / API] Certificate GMF Success',
  (successMessage: string) => ({
    successMessage
  })
);
export const certificateGMFFailAction = createAction(
  '[CERTIFICATE GMF / API] Certificate GMF Fail',
  (errorMessage: string) => ({ errorMessage })
);
