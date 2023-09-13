import { FormControl, Validators } from '@angular/forms';

import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { Product } from '@commons/models/product.model';
import { LOAN_TYPES_VALUE } from '@modules/payments/new-payment/constants/loans.contant';
import { MIN_BALANCE } from '@commons/constants/global';

export function newPaymentAmountValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value: number = control.currencyValue();
  const formGroup = this.formHowMuch;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    if (value <= 0) {
      return { required: true };
    }
  }
  return null;
}

export function newPaymentFromValidator(
  control: FormControl
): { [key: string]: boolean } {
  const formGroup = this.formToWhoPayment;
  if (!isNullOrUndefined(formGroup)) {
    const account: Product = formGroup.get('from').value;
    if (
      !!account &&
      (account?.productAccountBalances?.saldo_disponible?.amount || 0) <
        MIN_BALANCE.PAYMENTS
    ) {
      return { insufficientFunds: true };
    }
  }
  return null;
}

export function otherValueValidator(
  control: FormControl
): { [key: string]: boolean } {
  const formGroup = this.formHowMuchLoan;
  if (!isNullOrUndefined(formGroup)) {
    if (control.value === LOAN_TYPES_VALUE.OTHER) {
      this.otherAmount.setValidators([
        Validators.required,
        amountLoanValidator
      ]);
      setTimeout(() => {
        !!this.ionInput && this.ionInput.setFocus();
      }, 100);
    } else {
      this.otherAmount.clearValidators();
    }
    this.otherAmount.updateValueAndValidity();
  }

  return null;
}

export function amountLoanValidator(
  control: FormControl
): { [key: string]: boolean } {
  const value: number = control.currencyValue();
  if (!isNullOrUndefined(value)) {
    if (value <= 0) {
      return { amountMin: true };
    }
  }
  return null;
}
