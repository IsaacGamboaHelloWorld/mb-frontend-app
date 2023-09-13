import { IRegisterPushBody } from '@modules/push-notification/entities/push-notification.entities';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { Device } from '@capacitor/device';

const securityStorageService = new AdlSecureStorageService();

export const registerMapper = async (
  token: string = ''
): Promise<IRegisterPushBody> => {
  const key = await securityStorageService.get(KEYS.DEVICE_ID);
  const info = await Device.getInfo();

  return {
    serial: key,
    type: info?.model,
    brand: info?.manufacturer,
    osDevice: info?.operatingSystem,
    osVersion: info?.osVersion,
    spName: 'Google',
    token
  };
};
