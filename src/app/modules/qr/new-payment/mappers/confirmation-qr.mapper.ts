import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';

import { IVoucher } from '@commons/entities/voucher.entities';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IQrPaymentBody } from '@modules/qr/new-payment/entities/qr.entities';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';

const imageCdnPipe = new ImageCdnPipe();
const creditCardPipe = new TypeCreditCardPipe();

export function qrPaymentConfirmationMapper(
  template: any
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'qr-confirmation',
    img: {
      url: imageCdnPipe.transform('/isologo.png'),
      type: 'small'
    },
    title: this.translateService.instant('RECHARGE.CONFIRMATION.TITLE'),
    amount: {
      name: this.translateService.instant('QR.CONFIRMATION.TITLE'),
      value: this.currencyFormat.transform(
        template?.toWho?.qrInfo?.transactionAmount,
        true
      )
    },
    list: [
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.ORIGIN'),
        value: `${this.translateService.instant(
          'PRODUCT_TYPES.CREDIT_CARD'
        )} - ${template?.toWho.from?.accountId?.slice(-4)}`
      },
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.DESTINATION'),
        value: template?.toWho?.qrInfo?.merchantName
      },
      {
        name: this.translateService.instant('QR.TO_WHO.BASE'),
        value: this.currencyFormat.transform(
          template?.toWho?.qrInfo?.ivaBaseValue,
          true
        )
      },
      {
        name: this.translateService.instant('QR.TO_WHO.INC'),
        value: this.currencyFormat.transform(
          template?.toWho?.qrInfo?.incValue,
          true
        )
      },
      {
        name: this.translateService.instant('QR.TO_WHO.TIP'),
        value: this.currencyFormat.transform(
          template?.toWho?.qrInfo?.tipValue,
          true
        )
      },
      {
        name: this.translateService.instant('QR.TO_WHO.IVA'),
        value: this.currencyFormat.transform(
          template?.toWho?.qrInfo?.ivaValue,
          true
        )
      },
      {
        name: this.translateService.instant('QR.TO_WHO.DATE'),
        value: `${this.translateService.instant('TODAY')} - ${dateFormat(
          new Date().toDateString()
        )}`
      },
      {
        name: this.translateService.instant('QR.TO_WHO.CONSECUTIVE_CODE'),
        value: template?.toWho?.qrInfo?.trnConsecutiveCode
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
      name: this.translateService.instant('PRODUCTS.CREDIT_CARD.BUTTON_PAY'),
      loading: false,
      className: 'btn btn-primary medium'
    }
  };
}

export const qrServiceMapper = (
  template: ISaveDataTemplate
): IQrPaymentBody => ({
  qrMetadata: template?.toWho?.metadata,
  paymentMethodId: template?.toWho?.from?.id,
  numberOfInstalments: template?.toWho?.numberOfInstalments,
  brand: creditCardPipe
    .transform(template?.toWho?.from?.accountId)
    .name?.replace(' ', '')
});
