import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { ADVANCE_LIMITS } from '@commons/constants/global';

const ALPHANUMERIC_REGEX = /^[ A-Za-z0-9]*$/;

export function advancesAmountValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value: number = control.currencyValue();
  const formGroup = this.formAdvances;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    if (value < ADVANCE_LIMITS.MIN || value > this.getMaxAmount) {
      return { advancesAmount: true };
    }
  }
  return null;
}

export function advancesDescriptionValidator(
  control: FormControl
): { [key: string]: boolean } {
  const val = control.value;
  if (!!val) {
    if (!ALPHANUMERIC_REGEX.test(val)) {
      return { advancesAlphanumeric: true };
    }
  }
  return null;
}
