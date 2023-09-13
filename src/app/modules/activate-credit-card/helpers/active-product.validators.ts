import { FormControl } from '@angular/forms';

import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';

const INITIAL_NUMBER = /^(3|4|5|6)/;

export function lengthCreditCardValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value: string = control?.currencyValue()?.toString();
  if (!isNullOrUndefined(value)) {
    if (!INITIAL_NUMBER.test(value)) {
      return { initialCardNumber: true };
    }
    if (value.length < 16) {
      return { errorLengthCreditCard: true };
    }
  }
  return null;
}
