export interface ISpecialDate {
  greeting: string;
  start: string;
  end: string;
}

export interface IShortDate {
  month: number;
  day: number;
  hours: number;
  minutes: number;
}

export const SPECIAL_DATES: ISpecialDate[] = [
  {
    greeting: 'GREETINGS.CHRISTMAS',
    start: '24/12 00:00',
    end: '25/12 23:59'
  },
  {
    greeting: 'GREETINGS.NEW_YEAR',
    start: '31/12 00:00',
    end: '01/01 23:59'
  },
  {
    greeting: 'GREETINGS.STAY_AT_HOME',
    start: '25/03 00:00',
    end: '03/05 23:59'
  }
];
