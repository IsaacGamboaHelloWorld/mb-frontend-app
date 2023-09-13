import {
  newTransferNotRegisteredSuccessAction,
  newTransferSuccessAction
} from '@modules/transfer/store/actions/transfer.action';
import { paymentBillerSuccessAction } from '@modules/payments/store/actions/billers-payment.action';
import { paymentLoanSuccessAction } from '@modules/payments/store/actions/loans-payment.action';
import { pilaPaymentSuccessAction } from '@modules/payments/store/actions/pila-payment.action';
import { taxesPaymentSuccessAction } from '@modules/payments/store/actions/taxes-payment.action';
import { rechargeSuccessAction } from '@modules/recharges/new-recharge/store/actions/recharge.action';
import { transferWithdrawalSuccessAction } from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.action';

export const GlobalRateApp = [
  newTransferSuccessAction,
  newTransferNotRegisteredSuccessAction,
  paymentBillerSuccessAction,
  paymentLoanSuccessAction,
  pilaPaymentSuccessAction,
  taxesPaymentSuccessAction,
  rechargeSuccessAction,
  transferWithdrawalSuccessAction
];
