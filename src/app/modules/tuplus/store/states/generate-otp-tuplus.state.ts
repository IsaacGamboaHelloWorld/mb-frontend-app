import { IGenerationOtp } from '@modules/tuplus/entities/otp-generation-tuplus';

export interface IGenerateOtpState {
  information: IGenerationOtp;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
