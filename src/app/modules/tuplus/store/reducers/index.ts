import { combineReducers } from '@ngrx/store';

import { featureMovements as movements } from '@modules/tuplus/store/reducers/movement-tuplus.reducer';
import { configurationFactor } from '@modules/tuplus/store/reducers/configuration.reducer';
import { redemptionPoints } from '@modules/tuplus/store/reducers/redeem.tuplus.reducer';
import { generateOtpRedeem } from '@modules/tuplus/store/reducers/generate-otp-tuplus.reducer';
import { logoutTuplus } from '@modules/tuplus/store/reducers/logout-tuplus.reducer';
import { sourcePathReducer } from '@modules/tuplus/store/reducers/source-path.reducer';

export const tuplusRootReducer = combineReducers({
  movements,
  configurationFactor,
  redemptionPoints,
  generateOtpRedeem,
  logoutTuplus,
  sourcePathReducer
});
