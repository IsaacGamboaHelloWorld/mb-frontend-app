import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ReplaceValuePipe } from '@commons/pipes/replace-value.pipe';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import {
  GROUP_MEMO_GLOBAL,
  memoClosureGlobal
} from '@commons/memorize/global.memorize';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Device, DeviceInfo } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';

const faio = new FingerprintAIO();

let device: DeviceInfo;

const date = new DatePipe('es-US');
const replaceValue = new ReplaceValuePipe();
const titleCase = new TitleCasePipe();

export const translate = (
  translateService: TranslateService,
  token: string
): string => translateService.instant(token);

export const currencyFormat = (
  currencyPipe: CurrencyFormatPipe,
  amount: number,
  decimal: boolean = false
): string => currencyPipe.transform(amount, decimal);

export const dateFormat = (
  value: string | number,
  format: string = 'dd/MMM/yyyy',
  replace: boolean = true,
  withHour: boolean = false,
  formatHour: string = 'shortTime'
): string => {
  if (!!date) {
    const NEW_DATE = replace
      ? titleCase.transform(
          replaceValue.transform(date.transform(value, format), '.', '')
        )
      : titleCase.transform(date.transform(value, format));
    return withHour
      ? `${NEW_DATE} - ${date.transform(value, formatHour)}`
      : NEW_DATE;
  }
  return '';
};

export const calculateDate = (
  getProperty: 'getDate' | 'getMonth',
  setProperty: 'setDate' | 'setMonth',
  quantity: number = 1
): string => {
  return new Date(
    new Date()[setProperty](new Date()[getProperty]() - quantity)
  ).toISOString();
};

export const sharedFile = async (file: string, name: string): Promise<void> => {
  const { folder } = await validateAndroid();
  if (!!file && !!name) {
    try {
      const { uri: documentsPath } = await Filesystem.getUri({
        directory: folder,
        path: name
      });

      const { uri } = await Filesystem.writeFile({
        path: documentsPath,
        data: file
      });
      await Share.share({
        title: name,
        url: uri
      });
    } catch {}
  }
};

export const sameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const validateAndroid = (): Promise<{
  device: DeviceInfo;
  folder: Directory.Documents | Directory.External;
  isAndroid: boolean;
  version: number;
}> => {
  return Device.getInfo().then((data) => {
    device = data;
    const isAndroid = device.operatingSystem === 'android';
    let folder = Directory.Documents;
    let version = 9;
    !!device.osVersion &&
      device.osVersion.match(/(\d+)/).length &&
      (version = +device.osVersion.match(/(\d+)/)[0]);
    version > 10 && isAndroid && (folder = Directory.External);
    return { device, isAndroid, folder, version };
  });
};

export const removeDataStoragePDF = () => {
  validateAndroid().then(({ folder }) => {
    Filesystem.readdir({
      directory: folder,
      path: ''
    }).then(({ files }) => {
      if (files.length > 0) {
        for (const item of files) {
          Filesystem.deleteFile({ path: item, directory: folder }).then();
        }
      }
    });
  });
};

export const initGlobalCache = () => {
  Capacitor.getPlatform() !== 'web' &&
    faio
      .isAvailable()
      .then(
        (hasBiometric) =>
          !!hasBiometric &&
          memoClosureGlobal(GROUP_MEMO_GLOBAL.HAS_BIOMETRIC, false, true)
      );
};

export const eventProducts = (data: object): void => {
  window['getDataMaxyProducts'] = new Promise((resolve) => {
    resolve(data);
  });
};
