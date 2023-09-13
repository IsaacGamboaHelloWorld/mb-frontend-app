import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';

export function pocketGoalValidator(savingAmount: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) return null;
    const periodicAmount: number = control.currencyValue();
    return periodicAmount >= savingAmount ? { pocketGoal: true } : null;
  };
}

export function pocketSetPeriodicAmountValidator(
  control: FormControl
): { [key: string]: boolean } {
  if (!!control && !!this.formPocket) {
    if (control.value) {
      this.periodicAmount.setValidators([
        Validators.required,
        pocketGoalValidator(control.currencyValue())
      ]);
    } else {
      this.periodicAmount.clearValidators();
    }
    this.periodicAmount.updateValueAndValidity();
  }
  return null;
}

export function movePocketsAmountValidator(
  control: FormControl
): { [key: string]: boolean } {
  const amount: number = control.currencyValue();
  if (
    !isNullOrUndefined(this.formMovePocket) &&
    !isNullOrUndefined(amount) &&
    !isNullOrUndefined(this.where.value)
  ) {
    if (amount <= 0) {
      return { required: true };
    } else {
      if (this.where?.value === 1) {
        return amount >
          this._product?.productAccountBalances?.saldo_disponible?.amount
          ? { movePocketMaxAmountAccountAvailable: true }
          : null;
      } else {
        return amount > this._pocket?.amountSaved
          ? { movePocketMaxAmountPocketAvailable: true }
          : null;
      }
    }
  }
  return null;
}
