import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';

import { IVoucher } from '@commons/entities/voucher.entities';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';

const imageCdnPipe = new ImageCdnPipe();

export function qrAnnulmentConfirmationMapper(
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
        name: this.translateService.instant('RECHARGE.TO_WHO.DESTINATION'),
        value: template?.toWho?.qrInfo?.merchantName
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
      name: this.translateService.instant('CONTINUE'),
      loading: false,
      className: 'btn btn-primary medium'
    }
  };
}
