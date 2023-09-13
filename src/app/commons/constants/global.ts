import { ConfigOtpInput } from '@commons/components/ng-otp-input/models/config';

export const KEYS = {
  AUTH_TOKEN: 'token',
  REMEMBER: 'remember',
  DATA_BASE: 'main-storage',
  ACTIVE_PRODUCT: 'product',
  DETAIL_PRODUCT: 'detailProduct',
  TEMPORAL_DATA: 'temporal',
  BIOMETRIC: 'biometric',
  MODAL_BIOMETRIC: 'modalBiometric',
  SHOW_ONBOARDING_POCKETS: 'showOnboardingPockets',
  SHOW_MODAL_POCKETS: 'showModalPockets',
  ACTIVE_POCKET: 'activePocket',
  DEVICE_ID: 'deviceId',
  TO_PERSIST: 'toPersist',
  PUSH: 'push',
  MODAL_TRANSFER_WITHDRAWAL: 'modalTransferWithdrawal'
};

export const PERSIST_WEB = [KEYS.TO_PERSIST, KEYS.DEVICE_ID, KEYS.REMEMBER];
export const INTERVAL_TIME_SESSION = 300000;
export const INTERVAL_TIME_IDLE_SESSION = 180;

export const PERSIST_LIST = [
  KEYS.REMEMBER,
  KEYS.BIOMETRIC,
  KEYS.PUSH,
  KEYS.SHOW_ONBOARDING_POCKETS,
  KEYS.SHOW_MODAL_POCKETS,
  KEYS.MODAL_TRANSFER_WITHDRAWAL,
  KEYS.MODAL_BIOMETRIC
];

export const FINGERPRINTSALT =
  'mszZNhTjg4QGqehw4P9THVBFVXpiCPxP7o2t6aeZxTdPYQAHRVyKRU6jy5JomfWQ';

export const ADVANCE_LIMITS = {
  MIN: 1000,
  MAX: 3000000
};

export const MIN_BALANCE = {
  PAYMENTS: 1000
};

export const TUPLUS = {
  MIN_POINTS: 2000
};
export const ACCOUNTS_ALLOW_POCKETS = ['280', '500'];

export const DEVICE_MOCK = '123456789mock';

export const APP_INFO_MOCK = {
  build: '1',
  id: 'com.myionictest.mobile',
  name: 'Banco Popular',
  version: '1.0'
};

export const SECONDS_RESEND_OTP = 60;

export const MAXIMUM_NUMBER_OF_POCKETS = 5;

export const TRACE_ID = 'x-b3-traceid';

export interface IMonthItem {
  name: string;
  id: string;
}

export const OTP_INPUT_CONFIG: ConfigOtpInput = {
  length: 4,
  allowNumbersOnly: true,
  placeholder: '-'
};

export const MONTHS: IMonthItem[] = [
  {
    name: 'MONTHS_NAME.JANUARY',
    id: '01'
  },
  {
    name: 'MONTHS_NAME.FEBRUARY',
    id: '02'
  },
  {
    name: 'MONTHS_NAME.MARCH',
    id: '03'
  },
  {
    name: 'MONTHS_NAME.APRIL',
    id: '04'
  },
  {
    name: 'MONTHS_NAME.MAY',
    id: '05'
  },
  {
    name: 'MONTHS_NAME.JUNE',
    id: '06'
  },
  {
    name: 'MONTHS_NAME.JULY',
    id: '07'
  },
  {
    name: 'MONTHS_NAME.AUGUST',
    id: '08'
  },
  {
    name: 'MONTHS_NAME.SEPTEMBER',
    id: '09'
  },
  {
    name: 'MONTHS_NAME.OCTOBER',
    id: '10'
  },
  {
    name: 'MONTHS_NAME.NOVEMBER',
    id: '11'
  },
  {
    name: 'MONTHS_NAME.DECEMBER',
    id: '12'
  }
];

export const NUMBER_OF_CHARACTERS_TO_HIDE: number = 4;
