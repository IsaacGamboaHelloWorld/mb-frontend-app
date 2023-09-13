export interface IRegisterPushBody {
  serial: string;
  type: string;
  brand: string;
  deviId?: string;
  osDevice: string;
  osVersion: string;
  spName?: string;
  token: string;
  additionalData?: [
    {
      name: string;
      value: string;
    }
  ];
}

export interface IRegisterPushService {
  errorStatusCode: string;
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
  error: boolean;
}
