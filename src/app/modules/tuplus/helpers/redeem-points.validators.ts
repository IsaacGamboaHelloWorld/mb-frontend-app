import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators
} from '@angular/forms';

export function ValidatePointsLimits(
  minPoints: number,
  maxPoints: number
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) return null;
    if (control.value < minPoints || control.value > maxPoints) {
      let result = true;
      return result ? { '': true } : null;
    }
  };
}

export function typeAccountTuplusValidator(
  control: FormControl
): { [key: string]: boolean } {
  if (!!control && !!this.formWhereToRedeem) {
    if (control.value?.value === 'DAC') {
      this.formWhereToRedeem.controls?.['deposit'].setValidators(
        Validators.required
      );
      this.formWhereToRedeem.controls?.['credit'].removeValidators(
        Validators.required
      );
      this.formWhereToRedeem.controls?.['credit'].reset();
    } else if (control.value?.value === 'CC') {
      this.formWhereToRedeem.controls?.['credit'].addValidators(
        Validators.required
      );
      this.formWhereToRedeem.controls?.['deposit'].removeValidators(
        Validators.required
      );
    } else {
      return null;
    }
    this.formWhereToRedeem.controls?.['deposit'].updateValueAndValidity();
    this.formWhereToRedeem.controls?.['credit'].updateValueAndValidity();
  }
  return null;
}
