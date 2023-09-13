import { createAction } from '@ngrx/store';

import { IGenerationOtp } from '@modules/tuplus/entities/otp-generation-tuplus';

export const generateOtpLoadAction = createAction(
  '[GENERATEOTP / API] GENERATEOTP Load'
);
export const generateOtpResetAction = createAction(
  '[GENERATEOTP / API] GENERATEOTP Reset'
);
export const generateOtpSuccessAction = createAction(
  '[GENERATEOTP / API] GENERATEOTP Success',
  (information: IGenerationOtp) => ({ information })
);
export const generateOtpFailAction = createAction(
  '[GENERATEOTP / API] GENERATEOTP Fail',
  (errorMessage: string) => ({ errorMessage })
);
