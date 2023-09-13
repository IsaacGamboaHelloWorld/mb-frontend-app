import { ISpecialDate } from '../constants/special-dates';
import { TranslateService } from '@ngx-translate/core';

export const validateHour = (
  hour: number,
  morning: string,
  afternoon: string,
  night: string
): string => {
  if (hour <= 11) {
    return morning;
  } else if (hour > 11 && hour <= 18) {
    return afternoon;
  } else {
    return night;
  }
};

export function createDate(currentYear: number, shortDate: string): Date {
  const inDate = shortDate.split(' ')[0];
  const inTime = shortDate.split(' ')[1];

  return new Date(
    currentYear,
    +inDate.split('/')[1] - 1,
    +inDate.split('/')[0],
    +inTime.split(':')[0],
    +inTime.split(':')[1]
  );
}

export const validateSpecialDate = (
  morning: string,
  afternoon: string,
  night: string,
  specialDates: ISpecialDate[],
  translateService: TranslateService
): string => {
  const date = new Date();
  let specialDate = '';

  specialDates.forEach((sDate: ISpecialDate) => {
    const startDate = createDate(date.getFullYear(), sDate.start);
    let endDate: Date;

    sDate.greeting === 'GREETINGS.NEW_YEAR'
      ? (endDate = createDate(date.getFullYear() + 1, sDate.end))
      : (endDate = createDate(date.getFullYear(), sDate.end));

    if (
      (date >= startDate && date <= endDate) ||
      (date.getMonth() === endDate.getMonth() &&
        date.getDate() === endDate.getDate())
    ) {
      specialDate = translateService.instant(sDate.greeting);
    }
  });

  return specialDate !== ''
    ? specialDate
    : validateHour(date.getHours(), morning, afternoon, night);
};

export const validateBirthday = (
  morning: string,
  afternoon: string,
  night: string,
  birthday: string,
  specialDates: ISpecialDate[],
  translateService: TranslateService
): string => {
  const _birthday = new Date(2020, 9, 10);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime() === _birthday.getTime()
    ? birthday
    : validateSpecialDate(
        morning,
        afternoon,
        night,
        specialDates,
        translateService
      );
};

export const initGreeting = (
  morning: string,
  afternoon: string,
  night: string,
  birthday: string,
  specialDates: ISpecialDate[],
  translateService: TranslateService
): string => {
  return validateBirthday(
    morning,
    afternoon,
    night,
    birthday,
    specialDates,
    translateService
  );
};
