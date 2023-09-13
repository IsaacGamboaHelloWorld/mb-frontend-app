import { IMovementsTuplusState } from '@modules/tuplus/store/states/movements-tuplus.state';
import { IConfigurationFactorState } from '@modules/tuplus/store/states/configuration-factor.state';
import { IRedeemPointsState } from '@modules/tuplus/store/states/redeem-tuplus.state';
import { IGenerateOtpState } from '@modules/tuplus/store/states/generate-otp-tuplus.state';
import { ILogoutTuplusState } from '@modules/tuplus/store/states/logout-tuplus.state';

export const detailTuplusFeatureName = 'TuplusState';

export interface IDetailTuplusState {
  movements: IMovementsTuplusState;
  configurationFactor: IConfigurationFactorState;
  redemptionPoints: IRedeemPointsState;
  generateOtpRedeem: IGenerateOtpState;
  logoutTuplusState: ILogoutTuplusState;
  sourcePathReducer: string;
}
