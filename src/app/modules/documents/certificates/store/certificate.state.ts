export const certificateFeatureName = 'certificateModuleState';

export interface ICertificateState {
  information: IRespondCertificate;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IRespondCertificate {
  base64: string;
  name: string;
  success: boolean;
  errorMessage: string;
}
