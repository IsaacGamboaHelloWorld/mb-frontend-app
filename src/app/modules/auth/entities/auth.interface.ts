import { IDeviceInfo } from '@commons/entities/auth-data.entities';

export interface IStartAuth {
  content: IContentAuth;
  processId?: string;
  flowName?: string;
}

export interface IContentAuth {
  idType?: string;
  id?: string;
  companyId?: string;
  deviceSerial?: string;
  secureDataSecret?: string;
  otpValue?: string;
  forceOtpGeneration?: string;
  universalPassword?: string;
  startProductValidation?: boolean;
  deviceInfo?: IDeviceInfo;
  deviceName?: string;
  deviceRealSerial?: string;
  ipAddress?: string;
  forgotPassword?: boolean;
  additionalErrorMessage?: string;
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

export interface InitAuth {
  idType: string;
  id: string;
  remember?: boolean;
}

export interface IEnrollmentResponse {
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
  errorMessage?: string;
  secureDataBriefQuestion?: ISecureDataBriefQuestion;
  complementary?: boolean;
  couldHaveComplementary?: boolean;
}

export interface ISecureDataBriefQuestion {
  length: number;
  question: string;
  accountType: string;
  questionType: string;
  productType: string;
}
