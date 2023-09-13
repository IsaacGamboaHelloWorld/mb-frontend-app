import { IRedeem } from '@modules/tuplus/entities/redeem-tuplus.entities';

export interface IRedeemPointsState {
  information: IRedeem;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorRetry: boolean;
  errorMessage: string;
  errorCode: number;
}
