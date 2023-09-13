export interface IPocketCategory {
  icon: string;
  name: string;
  description: string;
  category: string;
}

export interface IPocketsPeriodicityItem {
  name: string;
  value: string;
}

export const PERIODICITY_MONTHLY: IPocketsPeriodicityItem = {
  name: 'POCKETS.PERIODICITY.MONTHLY',
  value: 'MONTHLY'
};

export const PERIODICITY_BIWEEKLY: IPocketsPeriodicityItem = {
  name: 'POCKETS.PERIODICITY.BIWEEKLY',
  value: 'BIWEEKLY'
};

export const PERIODICITY_WEEKLY: IPocketsPeriodicityItem = {
  name: 'POCKETS.PERIODICITY.WEEKLY',
  value: 'WEEKLY'
};

export const POCKETS_PERIODICITY: IPocketsPeriodicityItem[] = [
  PERIODICITY_MONTHLY,
  PERIODICITY_BIWEEKLY,
  PERIODICITY_WEEKLY
];
