import { IDeviceInfo } from '@commons/entities/auth-data.entities';
import { ISecureDataBriefQuestion } from '@modules/auth/entities/auth.interface';

export interface InitExperience {
  idType: string;
  id: string;
  remember?: boolean;
}

export interface IExperienceResponse {
  processId?: string;
  step: string;
  token?: string;
  lastAuthDate?: string;
  currentDate?: string;
  userFirstName?: string;
  lastIPAddress?: string;
  errorCode?: string;
  challenged?: boolean;
  success: boolean;
  additionalErrorMessage?: string;
  additionalErrorCode?: string;
  errorMessage?: string;
  secureDataBriefQuestion?: ISecureDataBriefQuestion;
  complementary?: boolean;
}

export interface IStartExperience {
  content: IContentExperience;
  processId?: string;
  flowName?: string;
}

export interface IContentExperience {
  idType?: string;
  id?: string;
  companyId?: string;
  deviceSerial?: string;
  secureDataSecret?: string;
  otpValue?: string;
  forceOtpGeneration?: string;
  startProductValidation?: boolean;
  deviceInfo?: IDeviceInfo;
  deviceName?: string;
  deviceRealSerial?: string;
  ipAddress?: string;
  idFake?: string;
  forgotPassword?: boolean;
  additionalErrorMessage?: string;
  additionalErrorCode?: string;
  errorMessage?: string;
  remember?: boolean;
  isOtpGeneratedByOtherChannel?: boolean;
  channel?: string;
  serial?: string;
  isBiometric?: boolean;
  migrationSilent?: boolean;
  konyFingerPrint?: string;
  complementaryServices?: string;
}
