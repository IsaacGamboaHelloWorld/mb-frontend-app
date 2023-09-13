import { createAction } from '@ngrx/store';
import { ICertificatePeriodRequest } from '@modules/documents/tax-certificates/entities/tax-certificates.entities';

export const certificateIncomeTaxesLoadAction = createAction(
  '[CERTIFICATE INCOME TAXES / API] Certificate Income Taxes Load',
  (body: ICertificatePeriodRequest) => ({ body })
);
export const certificateIncomeTaxesResetAction = createAction(
  '[CERTIFICATE INCOME TAXES] Certificate Income Taxes Reset'
);
export const certificateIncomeTaxesSuccessAction = createAction(
  '[CERTIFICATE INCOME TAXES / API] Certificate Income Taxes Success',
  (successMessage: string) => ({
    successMessage
  })
);
export const certificateIncomeTaxesFailAction = createAction(
  '[CERTIFICATE INCOME TAXES / API] Certificate Income Taxes Fail',
  (errorMessage: string) => ({ errorMessage })
);
