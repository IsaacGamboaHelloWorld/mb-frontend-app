import { FormControl } from '@angular/forms';

import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { Product } from '@commons/models/product.model';

const RECHARGE_PHONE_LENGTH = 10;
const RECHARGE_AMOUNT_MIN = 1000;
const RECHARGE_AMOUNT_MAX = 100000;
const RECHARGE_PHONE_FIRST_CHARACTER = '3';

export function rechargeAmountValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value: number = control.currencyValue();
  const formGroup = this.formRecharge;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const account: Product = formGroup.get('from').value;

    if (
      !isNullOrUndefined(account) &&
      value > account?.productAccountBalances?.saldo_disponible?.amount
    ) {
      return { rechargeAmountMaxAvailable: true };
    }
    if (value < RECHARGE_AMOUNT_MIN) {
      return { rechargeAmountMin: true };
    }
    if (value % RECHARGE_AMOUNT_MIN !== 0) {
      return { rechargeAmountMultiple: true };
    }
    if (value > RECHARGE_AMOUNT_MAX) {
      return { rechargeAmountMax: true };
    }
  }
  return null;
}

export function rechargeFromValidator(
  control: FormControl
): { [key: string]: boolean } {
  const formGroup = this.formRecharge;
  if (!isNullOrUndefined(formGroup)) {
    const account: Product = formGroup.get('from').value;
    if (
      !!account &&
      (account?.productAccountBalances?.saldo_disponible?.amount || 0) <
        RECHARGE_AMOUNT_MIN
    ) {
      return { rechargeFromAmount: true };
    }
    this.amount.updateValueAndValidity();
  }
  return null;
}

export function rechargesPhoneValidators(
  control: FormControl
): { [key: string]: boolean } {
  const value: string = control.normalize();
  if (!isNullOrUndefined(value)) {
    if (value.length > 0 && value[0] !== RECHARGE_PHONE_FIRST_CHARACTER) {
      return { rechargePhoneNumberValid: true };
    }
    if (value.length > 0 && value.length !== RECHARGE_PHONE_LENGTH) {
      return { rechargePhoneInvalid: true };
    }
  }
  return null;
}
