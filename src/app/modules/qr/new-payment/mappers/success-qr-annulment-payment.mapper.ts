import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';

import { IVoucher } from '@commons/entities/voucher.entities';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { IQrAnnulmentService } from '@modules/qr/new-payment/entities/qr.entities';
import { dateFormat } from '@commons/helpers/global.helper';

const imageCdnPipe = new ImageCdnPipe();

export function qrAnnulmentPaymentSuccessMapper(
  template: IQrAnnulmentService,
  isPayment: boolean = true
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'new-payment-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant(
      isPayment ? 'PAYMENT.SUCCESS.TITLE' : 'QR.ANNULMENT.SUCCESS.TITLE'
    ),
    description: this.translateService.instant('PAYMENT.SUCCESS.DESCRIPTION'),
    amount: {
      name: this.translateService.instant('VALUE'),
      value: this.currencyFormat.transform(
        template?.qrInfo?.transactionAmount,
        true
      )
    },
    date: dateFormat(new Date().toISOString(), 'dd/MMM/yyyy', true, true),
    list: [
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.ORIGIN'),
        value: `${this.translateService.instant(
          'PRODUCT_TYPES.CREDIT_CARD'
        )} - ${template?.paymentMethod.accountId?.slice(-4)}`
      },
      {
        name: this.translateService.instant('QR.TO_WHO.NUMBER_OF_INSTALMENTS'),
        value: template?.numberOfInstalments
      },
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.DESTINATION'),
        value: template?.qrInfo?.merchantName
      },
      {
        name: this.translateService.instant('QR.TO_WHO.BASE'),
        value: this.currencyFormat.transform(
          template?.qrInfo?.ivaBaseValue,
          true
        )
      },
      {
        name: this.translateService.instant('QR.TO_WHO.INC'),
        value: this.currencyFormat.transform(template?.qrInfo?.incValue, true)
      },
      {
        name: this.translateService.instant('QR.TO_WHO.TIP'),
        value: this.currencyFormat.transform(template?.qrInfo?.tipValue, true)
      },
      {
        name: this.translateService.instant('QR.TO_WHO.IVA'),
        value: this.currencyFormat.transform(template?.qrInfo?.ivaValue, true)
      },
      {
        name: this.translateService.instant('QR.TO_WHO.CONSECUTIVE_CODE'),
        value: template?.qrInfo?.trnConsecutiveCode
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
      className: 'btn btn-primary medium'
    }
  };
}
