import { createAction, props } from '@ngrx/store';

import { type } from '@commons/utils/util';
import { changeStatusSuccessAction } from '@store/actions/global.actions';
import { rechargeFailAction } from '@modules/recharges/new-recharge/store/actions/recharge.action';
import { IToastProperties } from '@commons/entities/toast.entities';
import {
  newTransferFailAction,
  newTransferNotRegisteredFailAction
} from '@modules/transfer/store/actions/transfer.action';
import { transferWithdrawalFailAction } from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.action';
import { paymentBillerFailAction } from '@modules/payments/store/actions/billers-payment.action';
import { certificateFailAction } from '@modules/documents/certificates/store/certificate.action';
import { statementsFailAction } from '@modules/documents/statements/store/actions/statements.action';
import { paymentLoanFailAction } from '@modules/payments/store/actions/loans-payment.action';
import { activeCreditCardFailAction } from '@modules/activate-credit-card/store/actions/active-credit-card.action';
import { advanceFailAction } from '@modules/detail/advances/new-advance/store/advances.action';
import { changePasswordFailAction } from '@modules/change-password/store/change-password.action';
import { detailBillerFailAction } from '@modules/payments/store/actions/billers-detail.action';
import { barcodeBillerFailAction } from '@modules/payments/store/actions/billers-barcode.action';
import {
  editPocketFailAction,
  editPocketSuccessAction
} from '@modules/pockets/store/actions/edit-pockets.action';
import {
  deletePocketFailAction,
  deletePocketSuccessAction
} from '@modules/pockets/store/actions/delete-pockets.action';
import { qrPaymentFailAction } from '@modules/qr/new-payment/store/actions/qr-payment.action';
import { qrAnnulmentFailAction } from '@modules/qr/new-payment/store/actions/qr-annulment.action';
import { messagesFailToastAction } from '@modules/messages/store/actions/messages.action';
import { blockProductFailAction } from '@modules/block-product/store/actions/block-product.action';
import { createPocketFailAction } from '@modules/pockets/store/actions/create-pockets.action';
import {
  deletePushNotificationErrorAction,
  registerPushNotificationErrorAction
} from '@modules/push-notification/store/push.action';
import { movePocketFailAction } from '@modules/pockets/store/actions/move-pockets.action';
import {
  messagesDeleteFailAction,
  messagesDeleteSuccessAction
} from '@modules/messages/store/actions/messages-delete.action';
import { taxesPaymentFailAction } from '@modules/payments/store/actions/taxes-payment.action';
import { taxesAmountReferenceFailAction } from '@modules/payments/store/actions/taxes-amount-reference.action';
import { taxesCitiesFailAction } from '@modules/payments/store/actions/taxes-cities.action';
import { taxesAgreementsFailAction } from '@modules/payments/store/actions/taxes-agreements.action';
import { pilaAgreementsFailAction } from '@modules/payments/store/actions/pila-agreements.action';
import { pilaInformationFailAction } from '@modules/payments/store/actions/pila-information.action';
import { pilaPaymentFailAction } from '@modules/payments/store/actions/pila-payment.action';
import {
  certificateTCFailAction,
  certificateTCSuccessAction
} from '@modules/documents/tax-certificates/store/actions/certificate-tc.action';
import {
  certificateGMFFailAction,
  certificateGMFSuccessAction
} from '@modules/documents/tax-certificates/store/actions/certificate-gmf.action';
import {
  certificateIncomeTaxesFailAction,
  certificateIncomeTaxesSuccessAction
} from '@modules/documents/tax-certificates/store/actions/certificate-income-taxes.action';
import {
  certificateRACFailAction,
  certificateRACSuccessAction
} from '@modules/documents/tax-certificates/store/actions/certificate-rac.action';
import { generateOtpFailAction } from '@modules/tuplus/store/actions/generation-otp-tuplus.action';
import { redeemFailAction } from '@modules/tuplus/store/actions/redemption-tuplus.action';

export const toastAction = createAction(
  type('[Global/UI] Set Toast'),
  props<{ payload?: IToastProperties }>()
);

export const ToastObserverActionsTypes = [changeStatusSuccessAction];

export const GlobalToastError = [
  rechargeFailAction,
  newTransferFailAction,
  transferWithdrawalFailAction,
  paymentBillerFailAction,
  certificateFailAction,
  statementsFailAction,
  paymentLoanFailAction,
  taxesPaymentFailAction,
  taxesAmountReferenceFailAction,
  taxesCitiesFailAction,
  taxesAgreementsFailAction,
  pilaAgreementsFailAction,
  pilaInformationFailAction,
  pilaPaymentFailAction,
  activeCreditCardFailAction,
  advanceFailAction,
  changePasswordFailAction,
  newTransferNotRegisteredFailAction,
  detailBillerFailAction,
  barcodeBillerFailAction,
  blockProductFailAction,
  editPocketFailAction,
  createPocketFailAction,
  deletePocketFailAction,
  movePocketFailAction,
  qrAnnulmentFailAction,
  qrPaymentFailAction,
  messagesFailToastAction,
  registerPushNotificationErrorAction,
  deletePushNotificationErrorAction,
  messagesDeleteFailAction,
  certificateTCFailAction,
  certificateGMFFailAction,
  certificateIncomeTaxesFailAction,
  certificateRACFailAction,
  generateOtpFailAction,
  redeemFailAction
];

export const GlobalToastSuccess = [
  editPocketSuccessAction,
  messagesDeleteSuccessAction,
  certificateTCSuccessAction,
  certificateGMFSuccessAction,
  certificateIncomeTaxesSuccessAction,
  certificateRACSuccessAction
];
