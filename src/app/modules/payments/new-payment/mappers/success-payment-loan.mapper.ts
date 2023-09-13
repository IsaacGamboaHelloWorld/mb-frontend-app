import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';

import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { ILoanPayment } from '@modules/payments/entities/loans.entities';

const imageCdnPipe = new ImageCdnPipe();

export function newPaymentLoanSuccessMapper(
  template: ILoanPayment,
  property: string = ''
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'new-payment-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant('PAYMENT.SUCCESS.TITLE'),
    description: this.translateService.instant('PAYMENT.SUCCESS.DESCRIPTION'),
    amount: {
      name: this.translateService.instant('VALUE'),
      value: this.currencyFormat.transform(template?.amount, true)
    },
    date: `${dateFormat(
      new Date().toISOString(),
      'dd/MMM/yyyy',
      true,
      true
    )} - IP ${template?.request?.ipAddress}`,
    list: [
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.ORIGIN'),
        value: `${this.translateService.instant(
          'PRODUCT_TYPES.' + template?.originAccountType
        )} **** ${template?.originAccount?.slice(-4)}`
      },
      {
        name: this.translateService.instant(
          'PAYMENT.LOANS.CONFIRMATION.DESTINATION'
        ),
        value: `${
          template?.destinationClientName
        } **** ${template?.destinationAccount?.slice(-4)}`
      },
      {
        name: this.translateService.instant('PAYMENT.LOANS.CONFIRMATION.DATE'),
        value: dateFormat(template?.date)
      },
      {
        name: this.translateService.instant('PAYMENT.LOANS.SUCCESS.APPROVAL'),
        value: template?.approvalId
      },
      {
        name: this.translateService.instant('COST_TRANSACTION.TITLE'),
        value: !!template?.transactionCost
          ? this.currencyFormat.transform(template?.transactionCost, true)
          : this.translateService.instant('COST_TRANSACTION.VALUE')
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
      name: this.translateService.instant('PAYMENT.SUCCESS.BUTTON_SECOND'),
      className: 'btn btn-secondary medium'
    }
  };
}
