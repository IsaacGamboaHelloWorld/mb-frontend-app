import {
  IContentAuth,
  IEnrollmentResponse,
  IStartAuth
} from '@modules/auth/entities/auth.interface';
import { AuthFacade } from '@modules/auth/auth.facade';
import { StepEnrollmentType } from '@modules/auth/constants/step';
import { encryptProperties } from '@commons/helpers/encrypt-properties.helper';
import { AuthService } from '@commons/services/auth/auth.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { APP_INFO_MOCK, KEYS } from '@commons/constants/global';
import {
  GROUP_MEMO_GLOBAL,
  memoClosureGlobal
} from '@commons/memorize/global.memorize';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

const securityStorageService = new AdlSecureStorageService();

const sensitiveFields: string[] = [
  'currentPassword',
  'secureDataSecret',
  'universalPassword',
  'universalPasswordConfirmation'
];

export async function mapAuthEnrollment(
  enrollment: IEnrollmentResponse,
  content: IContentAuth,
  publicKey: string,
  facade: AuthFacade,
  authService: AuthService
): Promise<void> {
  switch (enrollment.step) {
    case StepEnrollmentType.FILL_UNIVERSAL_PASSWORD:
    case StepEnrollmentType.FILL_LOGIN_CREDENTIALS:
      const loginData: IContentAuth = content.isBiometric
        ? content
        : encryptProperties(content, publicKey, sensitiveFields);
      delete loginData.isBiometric;
      const UNIVERSAL: IStartAuth = {
        content: {
          ...loginData
        },
        processId: enrollment.processId
      };
      authService.setData = UNIVERSAL.content?.universalPassword;
      !!memoClosureGlobal(GROUP_MEMO_GLOBAL.HAS_BIOMETRIC, true) &&
        (authService.setData = UNIVERSAL.content?.universalPassword);
      facade.fetchStartAuth(UNIVERSAL);
      break;
    case StepEnrollmentType.FILL_CURRENT_CHANNEL_PASSWORD:
    case StepEnrollmentType.FILL_CURRENT_CHANNEL_CREDENTIALS:
      const CHANNEL_PASSWORD: IStartAuth = {
        content: {
          ...encryptProperties(content, publicKey, sensitiveFields),
          forgotPassword: false
        },
        processId: enrollment.processId
      };
      facade.fetchStartAuth(CHANNEL_PASSWORD);
      break;
    case StepEnrollmentType.FILL_NEW_UNIVERSAL_PASSWORD:
    case StepEnrollmentType.FILL_NEW_CREDENTIALS:
      const NEW_UNIVERSAL: IStartAuth = {
        content: {
          ...encryptProperties(content, publicKey, sensitiveFields),
          forgotPassword: false
        },
        processId: enrollment.processId
      };
      facade.fetchStartAuth(NEW_UNIVERSAL);
      break;
    case StepEnrollmentType.ACCEPT_CHANNEL_POLICIES:
    case StepEnrollmentType.V2_ACCEPT_CHANNEL_POLICIES:
      const TERMS_CONDITIONS: IStartAuth = {
        content: {
          ...encryptProperties(content, publicKey, sensitiveFields),
          forgotPassword: false
        },
        processId: enrollment.processId
      };
      facade.fetchStartAuth(TERMS_CONDITIONS);
      break;
    case StepEnrollmentType.FILL_SECURE_DATA:
    case StepEnrollmentType.FILL_SECURITY_QUESTION:
      const FILL_SECURE_DATA: IStartAuth = {
        content: {
          ...encryptProperties(content, publicKey, sensitiveFields),
          forgotPassword: false
        },
        processId: enrollment.processId
      };
      facade.fetchStartAuth(FILL_SECURE_DATA);
      break;
    case StepEnrollmentType.FILL_OTP_DATA:
    case StepEnrollmentType.V2_FILL_OTP_DATA:
      const data = encryptProperties(content, publicKey, sensitiveFields);
      const FILL_OTP_DATA: IStartAuth = {
        content: {
          ...data,
          otpValue: content.forceOtpGeneration ? 'anyData' : data['otpValue'],
          isOtpGeneratedByOtherChannel: false,
          forgotPassword: false
        },
        processId: enrollment.processId
      };
      facade.fetchStartAuth(FILL_OTP_DATA);
      break;
    default:
      const device = await Device.getInfo();
      const appInfo =
        Capacitor.getPlatform() !== 'web' ? await App.getInfo() : APP_INFO_MOCK;
      const deviceId = await Device.getId();
      const key = await securityStorageService.get(KEYS.DEVICE_ID);
      let konyFingerprint = '';
      let complementaryData = '';
      try {
        const { value: SecDevFP } = await Storage.get({ key: '_cap_SecDevFP' });
        const { value: ServComp } = await Storage.get({ key: '_cap_ServComp' });
        konyFingerprint = SecDevFP;
        complementaryData = ServComp;
      } catch {}
      const payload: IStartAuth = {
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
          ipAddress: '192.168.0.1',
          serial: key
        }
      };
      if (konyFingerprint) {
        payload.content.migrationSilent = true;
        payload.content.konyFingerPrint = konyFingerprint;
        payload.content.complementaryServices = complementaryData;
        authService.temporalFingerprint = true;
      }
      facade.fetchStartAuth(payload);
      break;
  }
}
