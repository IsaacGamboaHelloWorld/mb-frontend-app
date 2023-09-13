import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';

import { INewTransferRespond } from '@modules/transfer/entities/transfer.entities';
import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';

const imageCdnPipe = new ImageCdnPipe();

export function newTransferSuccessMapper(
  template: INewTransferRespond
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'new-transfer-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant('NEW_TRANSFER.SUCCESS.TITLE'),
    description: this.translateService.instant(
      'NEW_TRANSFER.SUCCESS.DESCRIPTION'
    ),
    amount: {
      name: this.translateService.instant(
        'NEW_TRANSFER.CONFIRMATION.TITLE_AMOUNT'
      ),
      value: this.currencyFormat.transform(
        template?.request?.transferInformation?.amount,
        true
      )
    },
    date: `${dateFormat(
      template?.request?.dueDate,
      'dd/MMM/yyyy',
      true,
      true
    )} - IP ${template?.request?.ipAddress}`,
    list: [
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.ORIGIN'),
        value: `${this.translateService.instant(
          'BANKS.BANCO_POPULAR'
        )} - ${this.translateService.instant(
          'PRODUCT_TYPES.' +
            template?.request?.accountFromInformation?.productType
        )} **** ${template?.request?.accountFromInformation?.accountIdentifier.slice(
          -4
        )}`
      },
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.DESTINATION'),
        value: `${template?.request?.accountToInformation?.bankName} -  ${
          template?.request?.accountToInformation?.name
        }, ${this.translateService.instant(
          'PRODUCT_TYPES.' +
            template?.request?.accountToInformation?.productType
        )} ${template?.request?.accountToInformation?.accountIdentifier.slice(
          -4
        )}`
      },
      {
        name: this.translateService.instant('NEW_TRANSFER.SUCCESS.ID'),
        value: template?.approvalId
      },
      ...(!!template?.request?.transactionCost
        ? [
            {
              name: this.translateService.instant('COST_TRANSACTION.TITLE'),
              value: template?.request?.transactionCost
            }
          ]
        : [])
    ]
  };
  return {
    voucher,
    buttonFirst: {
      name: this.translateService.instant('FINISH'),
      className: 'btn btn-primary medium space-button'
    },
    buttonSecond: {
      name: this.translateService.instant('NEW_TRANSFER.SUCCESS.BTN'),
      className: 'btn btn-secondary medium'
    }
  };
}
