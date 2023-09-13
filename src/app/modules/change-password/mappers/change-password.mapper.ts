import { IChangePasswordService } from '@modules/change-password/entities/change-password.entities';
import { encryptProperties } from '@commons/helpers/encrypt-properties.helper';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { Device } from '@capacitor/device';

const securityStorageService = new AdlSecureStorageService();
const sensitiveFields: string[] = [
  'currentPassword',
  'newPassword',
  'confirmedPassword'
];

export const mapChangePasswordService = async (
  form: any,
  publicKey: string
): Promise<IChangePasswordService> => {
  const device = await Device.getInfo();
  const key = await securityStorageService.get(KEYS.DEVICE_ID);
  return {
    ...(encryptProperties(form, publicKey, sensitiveFields) as any),
    deviceSerial: key,
    deviceName: device.manufacturer
  };
};
