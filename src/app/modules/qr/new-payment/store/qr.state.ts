import { IQrAnnulmentService } from '@modules/qr/new-payment/entities/qr.entities';

export const qrFeatureName = 'qrModuleState';

export interface IQrPaymentState {
  information: IQrAnnulmentService;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IQrAnnulmentState {
  information: IQrAnnulmentService;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IQrState {
  payment: IQrPaymentState;
  annulment: IQrAnnulmentState;
}
