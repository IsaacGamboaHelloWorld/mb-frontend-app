import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { ICreatePocketResponse } from '@modules/pockets/entities/pockets.entities';

const imageCdnPipe = new ImageCdnPipe();

export function createPocketsSuccessMapper(
  template: ICreatePocketResponse
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'create-pocket-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant(
      'POCKETS.CREATE.SUCCESS_VOUCHER.TITLE'
    ),
    description: this.translateService.instant(
      'POCKETS.CREATE.SUCCESS_VOUCHER.DESCRIPTION'
    ),
    amount: {
      name: this.translateService.instant(
        'POCKETS.CREATE.SUCCESS_VOUCHER.TITLE_AMOUNT'
      ),
      value: this.currencyFormat.transform(
        template?.request?.savingAmount,
        true
      )
    },
    date: `${dateFormat(template?.dateTime, 'dd/MMM/yyyy', true, true)} - IP ${
      template?.request?.ipAddress
    }`,
    list: [
      {
        name: this.translateService.instant(
          'POCKETS.CREATE.SUCCESS_VOUCHER.ORIGIN'
        ),
        value: `${this.translateService.instant(
          'BANKS.BANCO_POPULAR'
        )} - ${this.translateService.instant(
          'PRODUCT_TYPES.' + template?.request?.parentAccountType
        )} **** ${template?.request?.parentAccountId.slice(-4)}`
      },
      {
        name: this.translateService.instant(
          'POCKETS.CREATE.SUCCESS_VOUCHER.DESTINATION'
        ),
        value: `${template?.request?.pocketName}`
      },
      {
        name: this.translateService.instant(
          'POCKETS.CREATE.SUCCESS_VOUCHER.APPROVAL_ID'
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
        'POCKETS.CREATE.SUCCESS_VOUCHER.FIRST_BTN'
      ),
      className: 'btn btn-primary medium'
    }
  };
}
