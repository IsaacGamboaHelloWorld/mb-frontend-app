export interface IAuthData {
  processId: string;
  lastAuthDate: Date;
  currentDate: Date;
  lastIPAddress: string;
  complementary?: boolean;
  couldHaveComplementary?: boolean;
}

export interface InfoUser {
  id: string;
  idType: string;
  password: string;
}

export interface IDeviceInfo {
  appBuild: string;
  appId: string;
  appName: string;
  appVersion: string;
  diskFree?: number;
  diskTotal?: number;
  isVirtual: boolean;
  manufacturer: string;
  memUsed: number;
  model: string;
  operatingSystem: string;
  osVersion: string;
  platform: string;
  uuid: string;
}
