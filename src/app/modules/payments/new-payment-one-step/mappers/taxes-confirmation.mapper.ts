import { TitleCasePipe } from '@angular/common';

import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { dateFormat } from '@commons/helpers/global.helper';

const imageCdnPipe = new ImageCdnPipe();
const titleCasePipe = new TitleCasePipe();

export function taxesPaymentConfirmationMapper(
  template: any
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'tax-payment-confirmation',
    img: {
      url: imageCdnPipe.transform('/isologo.png'),
      type: 'small'
    },
    title: this.translateService.instant('PAYMENT.TAXES.CONFIRMATION.TITLE'),
    amount: {
      name: this.translateService.instant('VALUE_OF_PAYMENT'),
      value: this.currencyFormat.transform(
        template?.toWho?.biller?.amount,
        true
      )
    },
    list: [
      {
        name: this.translateService.instant('PAYMENT.TAXES.TO_WHO.FROM'),
        value: `${
          template?.toWho?.from?.nameAccount
        } ${template?.toWho?.from?.id.slice(
          -4
        )} - ${this.translateService.instant(
          'PRODUCTS.DEPOSIT_ACCOUNT.BALANCE_AVAILABLE'
        )} ${this.currencyFormat.transform(
          template?.toWho?.from?.productAccountBalances?.saldo_disponible
            ?.amount,
          true
        )}`
      },
      {
        name: this.translateService.instant('PAYMENT.TAXES.TO_WHO.TO'),
        value: template?.toWho?.isBarcode
          ? template?.toWho?.biller?.billerName
          : `${titleCasePipe.transform(
              template?.toWho?.city?.name || ''
            )}, ${titleCasePipe.transform(
              template?.toWho?.tax?.entityName || ''
            )}`
      },
      {
        name: this.translateService.instant('PAYMENT.TAXES.CONFIRMATION.DATE'),
        value: `${this.translateService.instant('TODAY')} - ${dateFormat(
          new Date().toString()
        )}`
      },
      {
        name: this.translateService.instant(
          'PAYMENT.TAXES.CONFIRMATION.REFERENCE'
        ),
        value: template?.toWho?.isBarcode
          ? template?.toWho?.biller?.reference
          : template?.toWho?.biller?.request?.invoiceNumber
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
      name: this.translateService.instant('PAYMENT.CONFIRMATION.PAY'),
      loading: false,
      className: 'btn btn-primary medium'
    }
  };
}
