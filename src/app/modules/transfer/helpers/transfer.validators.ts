import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';

import { Product } from '@commons/models/product.model';
import { MinAmountTransactions } from '@commons/constants/min-amount-transactions';

const NEW_TRANSFER_MAX = 10000000;
const TRANSFER_NOT_REGISTERED_MAX = 1000000;
const ALPHA_NUMERIC = /^[ A-Za-z0-9_@./#&+-]*$/;

export function newTransferAmountValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value: number = control.currencyValue();
  const formGroup = this.formHowMuch;

  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    if (value < MinAmountTransactions.transfer) {
      return { newTransferAmountMinNotAval: true };
    }
    if (value > NEW_TRANSFER_MAX) {
      return { newTransferAmountMax: true };
    }
  }
  return null;
}

export function transferNotRegisteredAmountValidator(
  control: FormControl
): { [key: string]: boolean } {
  const availableBalance = this.formNewTransferToWho?.value?.from
    ?.productAccountBalances?.saldo_disponible?.amount;

  const value: number = control.currencyValue();

  const formGroup = this.formNewTransferToWho;

  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    if (value < MinAmountTransactions.transfer) {
      return { newTransferAmountMinNotAval: true };
    }
    if (value > TRANSFER_NOT_REGISTERED_MAX) {
      return { transferNotRegisteredAmountMax: true };
    }

    if (value > availableBalance) {
      return { insufficientBalance: true };
    }
  }
  return null;
}

export function newTransferAlphanumericValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value = control.value;
  if (!!value) {
    if (!ALPHA_NUMERIC.test(value)) {
      return { newTransferAlphanumeric: true };
    }
  }
  return null;
}

export function newTransferFromValidator(
  control: FormControl
): { [key: string]: boolean } {
  const formGroup = this.formNewTransferToWho;
  if (!isNullOrUndefined(formGroup)) {
    const account: Product = formGroup.get('from').value;
    if (
      !!account &&
      (account?.productAccountBalances?.saldo_disponible?.amount || 0) <
        MinAmountTransactions.transfer
    ) {
      return { insufficientFunds: true };
    }
  }
  return null;
}

export function newTransferNumberAccountValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value = control.value;
  if (!!value) {
    if (value?.toString().length < 12) {
      return { newTransferNumberAccount: true };
    }
  }
  return null;
}
