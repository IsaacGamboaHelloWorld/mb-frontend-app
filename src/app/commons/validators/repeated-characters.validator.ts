import { AbstractControl, ValidatorFn } from '@angular/forms';

import { NO_REPEATED_MORE_THAN_TWO_TIMES } from '@commons/constants/regex';

export function maxRepeatedCharsPatternValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const input: string = control.value;
    const valid = NO_REPEATED_MORE_THAN_TWO_TIMES.test(
      input
        .split('')
        .sort()
        .join('')
    );
    return !valid ? { repeatedNumbers: true } : null;
  };
}
