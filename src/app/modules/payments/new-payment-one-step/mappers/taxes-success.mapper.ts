import { TitleCasePipe } from '@angular/common';

import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { ITaxesPaymentResponse } from '@modules/payments/entities/tax-payment.entities';

const imageCdnPipe = new ImageCdnPipe();
const titleCasePipe = new TitleCasePipe();

export function taxesPaymentSuccessMapper(
  paymentResponse: ITaxesPaymentResponse
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
        paymentResponse?.request.amount,
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
        name: this.translateService.instant('PAYMENT.TAXES.TO_WHO.FROM'),
        value: `${this.translateService.instant(
          'PRODUCT_TYPES.' + paymentResponse?.request?.accountType
        )} **** ${paymentResponse?.request?.accountId.slice(-4)}`
      },
      {
        name: this.translateService.instant('PAYMENT.TAXES.TO_WHO.TO'),
        value: `${titleCasePipe.transform(
          paymentResponse?.request?.serviceCompanyName
        )}`
      },
      {
        name: this.translateService.instant('PAYMENT.TAXES.CONFIRMATION.DATE'),
        value: `${dateFormat(new Date().toString())}`
      },
      {
        name: this.translateService.instant('PAYMENT.TAXES.SUCCESS.APPROVAL'),
        value: paymentResponse?.approvalId
      },
      {
        name: this.translateService.instant(
          'PAYMENT.TAXES.CONFIRMATION.REFERENCE'
        ),
        value: paymentResponse?.request?.invoiceNumber
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
      name: this.translateService.instant(
        'PAYMENT.TAXES.SUCCESS.BUTTON_SECOND'
      ),
      className: 'btn btn-secondary medium'
    }
  };
}
