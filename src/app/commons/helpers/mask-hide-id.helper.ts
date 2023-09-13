import { NUMBER_OF_CHARACTERS_TO_HIDE } from '../constants/global';

export const maskHideIdHelper = (value: string): string => {
  if (!!value) {
    return (
      value
        .substring(0, value.length - NUMBER_OF_CHARACTERS_TO_HIDE)
        .replace(/[^.]/g, '*') + value.slice(-NUMBER_OF_CHARACTERS_TO_HIDE)
    );
  } else {
    return value;
  }
};
