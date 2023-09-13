import { FormControl } from '@angular/forms';

const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9 ]*$/;

export function alphanumericValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value = control.value;
  if (!!value) {
    if (!ALPHANUMERIC_REGEX.test(value)) {
      return { alphanumeric: true };
    }
  }
  return null;
}
