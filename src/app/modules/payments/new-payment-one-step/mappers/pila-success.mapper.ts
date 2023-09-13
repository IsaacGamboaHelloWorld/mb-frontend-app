import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IPilaPaymentResponse } from '@modules/payments/entities/pila-payment.entities';

const imageCdnPipe = new ImageCdnPipe();

export function pilaPaymentSuccessMapper(
  paymentResponse: IPilaPaymentResponse
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'new-payment-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant('PAYMENT.SUCCESS.TITLE'),
    description: this.translateService.instant('PAYMENT.SUCCESS.DESCRIPTION'),
    amount: {
      name: this.translateService.instant('VALUE_OF_PAYMENT'),
      value: this.currencyFormat.transform(
        paymentResponse?.request?.payment?.amount,
        true
      )
    },
    date: `${dateFormat(
      new Date().toDateString(),
      'dd/MMM/yyyy',
      true,
      true
    )} - IP ${paymentResponse?.request?.ipAddress}`,
    list: [
      {
        name: this.translateService.instant('PAYMENT.PILA.TO_WHO.FROM'),
        value: `${this.translateService.instant(
          'NAME_BANK'
        )} - ${this.translateService.instant(
          'PRODUCT_TYPES.' +
            paymentResponse?.request?.originAccount?.accountType
        )} ${paymentResponse?.request?.originAccount?.accountId.slice(-4)}`
      },
      {
        name: this.translateService.instant('PAYMENT.PILA.TO_WHO.TO'),
        value: `${
          paymentResponse?.request?.payment?.billerName
        } - ${this.translateService.instant(
          'PAYMENT.PILA.CONFIRMATION.PAYROLL_NUMBER'
        )} ${paymentResponse?.request?.payment?.invoice}`
      },
      {
        name: this.translateService.instant('PAYMENT.PILA.SUCCESS.APPROVAL'),
        value: paymentResponse?.approvalId
      },
      {
        name: this.translateService.instant('COST_TRANSACTION.TITLE'),
        value: this.translateService.instant('COST_TRANSACTION.VALUE')
      }
    ]
  };
  return {
    voucher,
    buttonFirst: {
      name: this.translateService.instant('FINISH'),
      loading: false,
      className: 'btn btn-primary medium space-button'
    },
    buttonSecond: {
      name: this.translateService.instant('PAYMENT.PILA.SUCCESS.BUTTON_SECOND'),
      className: 'btn btn-secondary medium'
    }
  };
}
