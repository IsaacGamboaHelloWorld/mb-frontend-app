import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { IDeletePocketResponse } from '@modules/pockets/entities/pockets.entities';

const imageCdnPipe = new ImageCdnPipe();

export function deletePocketsSuccessMapper(
  template: IDeletePocketResponse,
  toHow: any
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'move-pockets-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant('POCKETS.EDIT.SUCCESS_VOUCHER.TITLE'),
    description: this.translateService.instant(
      'POCKETS.EDIT.SUCCESS_VOUCHER.DESCRIPTION'
    ),
    amount: {
      name: this.translateService.instant(
        'POCKETS.EDIT.SUCCESS_VOUCHER.TITLE_AMOUNT'
      ),
      value: this.currencyFormat.transform(toHow?.pocketFrom?.amountSaved, true)
    },
    date: `${dateFormat(template?.dateTime, 'dd/MMM/yyyy', true, true)} - IP ${
      template?.request?.ipAddress
    }`,
    list: [
      {
        name: this.translateService.instant(
          'POCKETS.EDIT.SUCCESS_VOUCHER.ORIGIN'
        ),
        value: `${this.translateService.instant('POCKET')} - ${
          toHow?.pocketFrom?.pocketName
        }`
      },
      {
        name: this.translateService.instant(
          'POCKETS.EDIT.SUCCESS_VOUCHER.DESTINATION'
        ),
        value: `${this.translateService.instant(
          'BANKS.BANCO_POPULAR'
        )} - ${this.translateService.instant(
          'PRODUCT_TYPES.' + template?.request?.parentAccountType
        )} **** ${template?.request?.parentAccountId.slice(-4)}`
      },
      {
        name: this.translateService.instant(
          'POCKETS.EDIT.SUCCESS_VOUCHER.APPROVAL_ID'
        ),
        value: template?.rqUid
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
      name: this.translateService.instant(
        'POCKETS.EDIT.SUCCESS_VOUCHER.FIRST_BTN'
      ),
      className: 'btn btn-primary medium'
    }
  };
}
