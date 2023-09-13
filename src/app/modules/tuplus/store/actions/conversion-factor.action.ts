import { createAction } from '@ngrx/store';

import { IConversionFactor } from '@modules/tuplus/entities/conversion-factor.entities';

export const conversionLoadAction = createAction(
  '[CONVERSIONFACTOR / API] Conversion Load'
);
export const conversionResetAction = createAction(
  '[CONVERSIONFACTOR] Conversion Reset'
);
export const conversionSuccessAction = createAction(
  '[ CONVERSIONFACTOR / API] Conversion Success',
  (information: IConversionFactor) => ({ information })
);
export const conversionFailAction = createAction(
  '[CONVERSIONFACTOR / API] Conversion Fail',
  (errorMessage: string) => ({ errorMessage })
);
