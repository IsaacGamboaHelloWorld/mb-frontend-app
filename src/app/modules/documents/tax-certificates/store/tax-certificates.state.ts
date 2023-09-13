export const taxCertificatesFeatureName = 'taxCertificatesModuleState';

export interface ICertificateTCState {
  information: IRespondCertificate;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ICertificateGMFState {
  information: IRespondCertificate;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ICertificateIncomeTaxesState {
  information: IRespondCertificate;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ICertificateRACState {
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
}

export interface ITaxCertificatesState {
  certificateTC: ICertificateTCState;
  certificateGMF: ICertificateGMFState;
  certificateRAC: ICertificateRACState;
  certificateIncomeTaxes: ICertificateIncomeTaxesState;
}
