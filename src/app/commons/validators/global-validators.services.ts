import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import {
  PHONE_FIRST_CHARACTER,
  PHONE_LENGTH
} from '@commons/constants/global-validators';

export const NUMERIC_REGEX = /^[0-9 ]*$/;

@Injectable({
  providedIn: 'root'
})
export class GlobalValidatorsServices {
  static validatePhone(control: FormControl): { [key: string]: boolean } {
    const value: string = control.normalize();
    if (!isNullOrUndefined(value)) {
      if (value.length > 0 && value[0] !== PHONE_FIRST_CHARACTER) {
        return { phoneNumberValid: true };
      }
      if (value.length > 0 && value.length !== PHONE_LENGTH) {
        return { phoneInvalid: true };
      }
    }
    return null;
  }

  static validateNumber(control: FormControl): { [key: string]: boolean } {
    const value: string = control.value;
    if (!isNullOrUndefined(value)) {
      if (!NUMERIC_REGEX.test(value)) {
        return { numeric: true };
      }
    }
    return null;
  }
}
