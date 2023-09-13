import { SlicePipe } from '@angular/common';

import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IRespondRecharge } from '@modules/recharges/new-recharge/entities/recharge.entities';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { dateFormat } from '@commons/helpers/global.helper';

const imageCdnPipe = new ImageCdnPipe();
const slice = new SlicePipe();

export function rechargeSuccessMapper(
  respondRecharge: IRespondRecharge
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'recharge-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant('RECHARGE.SUCCESS.TITLE'),
    amount: {
      name: this.translateService.instant('VALUE'),
      value: this.currencyFormat.transform(
        respondRecharge?.rechargeInfo?.amount
      )
    },
    date: `${dateFormat(
      new Date().toISOString(),
      'dd/MMM/yyyy',
      true,
      true
    )} - IP ${respondRecharge?.request?.ipAddress}`,
    list: [
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.DESTINATION'),
        value: respondRecharge?.rechargeInfo?.operatorName
      },
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.OPERATOR'),
        value: `${slice.transform(
          respondRecharge?.rechargeInfo?.phoneNumber,
          0,
          3
        )} ${slice.transform(
          respondRecharge?.rechargeInfo?.phoneNumber,
          3,
          10
        )}`
      },
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.ORIGIN'),
        value: `${this.translateService.instant(
          'PRODUCT_TYPES.' + respondRecharge?.rechargeInfo.accountType
        )} **** ${respondRecharge?.rechargeInfo?.accountId.slice(-4)}`
      },
      {
        name: this.translateService.instant('RECHARGE.SUCCESS.APPROVAL'),
        value: respondRecharge?.approvalId
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
      name: this.translateService.instant('RECHARGE.SUCCESS.BTN'),
      loading: false,
      className: 'btn btn-primary space-button'
    },
    buttonSecond: {
      name: this.translateService.instant('RECHARGE.NEW'),
      className: 'btn btn-secondary medium'
    }
  };
}
