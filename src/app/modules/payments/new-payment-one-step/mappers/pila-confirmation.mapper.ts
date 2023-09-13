import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { dateFormat } from '@commons/helpers/global.helper';

const imageCdnPipe = new ImageCdnPipe();

export function pilaPaymentConfirmationMapper(
  template: any
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'pila-payment-confirmation',
    img: {
      url: imageCdnPipe.transform('/isologo.png'),
      type: 'small'
    },
    title: this.translateService.instant('PAYMENT.PILA.CONFIRMATION.TITLE'),
    amount: {
      name: this.translateService.instant('VALUE_OF_PAYMENT'),
      value: this.currencyFormat.transform(
        template?.toWho?.paymentInfo?.amount,
        true
      )
    },
    list: [
      {
        name: this.translateService.instant('PAYMENT.PILA.TO_WHO.FROM'),
        value: `${this.translateService.instant('NAME_BANK')} - ${
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
        name: this.translateService.instant('PAYMENT.PILA.TO_WHO.TO'),
        value: `${
          template?.toWho?.to?.entityName
        } - ${this.translateService.instant(
          'PAYMENT.PILA.CONFIRMATION.PAYROLL_NUMBER'
        )} ${
          template?.toWho?.referenceType === 1
            ? template?.toWho?.paymentInfo?.invoice
            : template?.toWho?.paymentInfo?.invoiceNumber
        }`
      },
      {
        name: this.translateService.instant('PAYMENT.PILA.CONFIRMATION.DATE'),
        value: `${this.translateService.instant('TODAY')} - ${dateFormat(
          new Date().toString()
        )}`
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
