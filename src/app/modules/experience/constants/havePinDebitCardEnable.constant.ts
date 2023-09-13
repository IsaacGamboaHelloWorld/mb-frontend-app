export interface IExperienceServiceItem {
  title: string;
  subtitle: string;
  icon: string;
  iconType?: 'success' | 'information' | 'warning' | 'error';
}

export const EXPERIENCE_SERVICE_WITHDRAW: IExperienceServiceItem = {
  title: 'EXPERIENCE.SERVICES.WITHDRAW.TITLE',
  subtitle: 'EXPERIENCE.SERVICES.WITHDRAW.SUBTITLE',
  icon: 'icon-vel-money'
};

export const EXPERIENCE_SERVICE_RECHARGUE: IExperienceServiceItem = {
  title: 'EXPERIENCE.SERVICES.RECHARGUE.TITLE',
  subtitle: 'EXPERIENCE.SERVICES.RECHARGUE.SUBTITLE',
  icon: 'icon-vel-essential-cellphone'
};

export const EXPERIENCE_SERVICE_PAY: IExperienceServiceItem = {
  title: 'EXPERIENCE.SERVICES.PAY.TITLE',
  subtitle: 'EXPERIENCE.SERVICES.PAY.SUBTITLE',
  icon: 'icon-vel-money-circle'
};
export const EXPERIENCE_SERVICE_TRANSFER: IExperienceServiceItem = {
  title: 'EXPERIENCE.SERVICES.TRANSFER.TITLE',
  subtitle: 'EXPERIENCE.SERVICES.TRANSFER.SUBTITLE',
  icon: 'icon-vel-arrows-transfer'
};

export const EXPERIENCE_SERVICE_ITEMS_LIST: IExperienceServiceItem[] = [
  EXPERIENCE_SERVICE_WITHDRAW,
  EXPERIENCE_SERVICE_RECHARGUE,
  EXPERIENCE_SERVICE_PAY,
  EXPERIENCE_SERVICE_TRANSFER
];
