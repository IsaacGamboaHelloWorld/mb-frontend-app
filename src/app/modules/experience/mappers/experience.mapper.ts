import { encryptProperties } from '@commons/helpers/encrypt-properties.helper';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { APP_INFO_MOCK, KEYS } from '@commons/constants/global';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import {
  IContentExperience,
  IExperienceResponse,
  IStartExperience
} from '@modules/experience/entities/experience.entities';
import { ExperienceFacade } from '@modules/experience/experience.facade';
import { StepExperienceType } from '@modules/experience/constants/steps';

const securityStorageService = new AdlSecureStorageService();

const sensitiveFields: string[] = [
  'currentPassword',
  'secureDataSecret',
  'universalPassword',
  'universalPasswordConfirmation'
];

export async function mapExperience(
  experience: IExperienceResponse,
  content: IContentExperience,
  publicKey: string,
  facade: ExperienceFacade
): Promise<void> {
  switch (experience.step) {
    case StepExperienceType.HAVE_PIN_DEBIT_CARD_ENABLE:
      const HAVE_PIN_DEBIT_CARD_ENABLE: IStartExperience = {
        content: {
          ...content
        },
        processId: experience.processId
      };
      facade.fetchStartExperience(HAVE_PIN_DEBIT_CARD_ENABLE);
      break;
    case StepExperienceType.FILL_SECURITY_QUESTION:
      const FILL_SECURITY_QUESTION: IStartExperience = {
        content: {
          ...encryptProperties(content, publicKey, sensitiveFields)
        },
        processId: experience.processId
      };
      facade.fetchStartExperience(FILL_SECURITY_QUESTION);
      break;
    case StepExperienceType.FILL_OTP_DATA:
      const data = encryptProperties(content, publicKey, sensitiveFields);
      const FILL_OTP_DATA: IStartExperience = {
        content: {
          ...data,
          otpValue: content.forceOtpGeneration ? 'anyData' : data['otpValue'],
          isOtpGeneratedByOtherChannel: false,
          forgotPassword: false
        },
        processId: experience.processId
      };
      facade.fetchStartExperience(FILL_OTP_DATA);
      break;
    default:
      const device = await Device.getInfo();
      const appInfo =
        Capacitor.getPlatform() !== 'web' ? await App.getInfo() : APP_INFO_MOCK;
      const deviceId = await Device.getId();
      const key = await securityStorageService.get(KEYS.DEVICE_ID);
      const payload: IStartExperience = {
        content: {
          ...encryptProperties(content, publicKey, sensitiveFields),
          deviceInfo: {
            appBuild: appInfo.build,
            appId: appInfo.id,
            appName: appInfo.name,
            appVersion: appInfo.version,
            diskFree: device.diskFree || null,
            diskTotal: device.diskTotal || null,
            isVirtual: device.isVirtual,
            manufacturer: device.manufacturer,
            memUsed: device.memUsed,
            model: device.model,
            operatingSystem: device.operatingSystem,
            osVersion: device.osVersion,
            platform: device.platform,
            uuid: deviceId.uuid
          },
          deviceSerial: key,
          deviceName: device.manufacturer,
          companyId: '0002',
          channel: 'MB',
          serial: key
        }
      };
      facade.fetchStartExperience(payload);
      break;
  }
}
