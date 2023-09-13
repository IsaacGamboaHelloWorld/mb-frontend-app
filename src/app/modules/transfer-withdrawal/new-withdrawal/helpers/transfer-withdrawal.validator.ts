import { FormControl, Validators } from '@angular/forms';

import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { OTHER_AMOUNT } from '@modules/transfer-withdrawal/new-withdrawal/constants/fixed-amount.constant';

const TRANSFER_WITHDRAWAL_AMOUNT_MIN = 10000;
const TRANSFER_WITHDRAWAL_AMOUNT_MAX = 2000000;

export function transferWithdrawalFixedAmountValidator(
  control: FormControl
): { [key: string]: boolean } {
  if (!!control && !!this.formTransferWithdrawal) {
    if (control.value === OTHER_AMOUNT) {
      this.amount.setValidators([
        Validators.required,
        transferWithdrawalAmountValidator.bind(this)
      ]);
    } else {
      this.amount.clearValidators();
      this.amount.reset();
    }
    this.amount.updateValueAndValidity();
    this.from?.updateValueAndValidity();
  }
  return null;
}

export function transferWithdrawalDocumentIdValidator(
  control: FormControl
): { [key: string]: boolean } {
  if (!!control && !!this.formTransferWithdrawal) {
    if (control.value) {
      this.documentId.setValidators([Validators.required]);
    } else {
      this.documentId.clearValidators();
      this.documentId.reset();
    }
    this.documentId.updateValueAndValidity();
  }
  return null;
}

export function transferWithdrawalAmountValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value: number = control.currencyValue();
  if (!!control && !!this.formTransferWithdrawal) {
    if (!isNullOrUndefined(value)) {
      if (value < TRANSFER_WITHDRAWAL_AMOUNT_MIN) {
        return { transferWithdrawalAmountMin: true };
      }
      if (value > TRANSFER_WITHDRAWAL_AMOUNT_MAX) {
        return { transferWithdrawalAmountMax: true };
      }
      if (value % TRANSFER_WITHDRAWAL_AMOUNT_MIN !== 0) {
        return { transferWithdrawalAmountMultiple: true };
      }
      this.from?.updateValueAndValidity();
    }
  }
  return null;
}

export function transferWithdrawalAvailableBalanceValidator(
  control: FormControl
): { [key: string]: boolean } {
  const form = this.formTransferWithdrawal;
  if (!isNullOrUndefined(form) && !isNullOrUndefined(control.value)) {
    const amount =
      form.get('fixedAmount').value === OTHER_AMOUNT
        ? form.get('amount').currencyValue()
        : +form.get('fixedAmount').value?.value;

    if (
      control.value?.productAccountBalances?.saldo_disponible?.amount < amount
    )
      return { transferWithdrawalAvailableBalance: true };
  }
  return null;
}
