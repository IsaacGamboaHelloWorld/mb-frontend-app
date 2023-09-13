export interface ITotpService {
  algorithm: string;
  devices: IDevice[];
  length: number;
  period: number;
  success: boolean;
}

export interface IDevice {
  active: boolean;
  id: string;
  name: string;
  secret: string;
  valid: string;
}
