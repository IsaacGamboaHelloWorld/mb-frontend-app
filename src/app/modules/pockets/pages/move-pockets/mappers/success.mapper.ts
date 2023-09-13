import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { IMovePocketResponse } from '@modules/pockets/entities/pockets.entities';
import { TranslateService } from '@ngx-translate/core';

const imageCdnPipe = new ImageCdnPipe();

export function movePocketsSuccessMapper(
  template: IMovePocketResponse,
  toHow: any
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'move-pockets-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant('POCKETS.MOVE.SUCCESS_VOUCHER.TITLE'),
    description: this.translateService.instant(
      'POCKETS.MOVE.SUCCESS_VOUCHER.DESCRIPTION'
    ),
    amount: {
      name: this.translateService.instant(
        'POCKETS.MOVE.SUCCESS_VOUCHER.TITLE_AMOUNT'
      ),
      value: this.currencyFormat.transform(template?.request?.amount, true)
    },
    date: `${dateFormat(template?.dateTime, 'dd/MMM/yyyy', true, true)} - IP ${
      template?.request?.ipAddress
    }`,
    list: [
      {
        name: this.translateService.instant(
          'POCKETS.MOVE.SUCCESS_VOUCHER.ORIGIN'
        ),
        value: movePocketsOrigin(toHow, template, this.translateService)
      },
      {
        name: this.translateService.instant(
          'POCKETS.MOVE.SUCCESS_VOUCHER.DESTINATION'
        ),
        value: movePocketsDestination(toHow, template, this.translateService)
      },
      {
        name: this.translateService.instant(
          'POCKETS.MOVE.SUCCESS_VOUCHER.APPROVAL_ID'
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
        'POCKETS.MOVE.SUCCESS_VOUCHER.FIRST_BTN'
      ),
      className: 'btn btn-primary medium'
    }
  };
}

export function movePocketsOrigin(
  toHow: any,
  template: IMovePocketResponse,
  translate: TranslateService
): string {
  switch (toHow?.where) {
    case 1:
      return `${translate.instant('BANKS.BANCO_POPULAR')} - ${translate.instant(
        'PRODUCT_TYPES.' + template?.request?.parentAccountType
      )} **** ${template?.request?.parentAccountId.slice(-4)}`;
    case 2:
      return `${translate.instant('POCKET')} - ${
        toHow?.pocketFrom?.pocketName
      }`;
    case 3:
      return `${translate.instant('POCKET')} - ${
        toHow?.pocketFrom?.pocketName
      }`;
  }
}

export function movePocketsDestination(
  toHow: any,
  template: IMovePocketResponse,
  translate: TranslateService
): string {
  switch (toHow?.where) {
    case 1:
      return `${translate.instant('POCKET')} - ${
        toHow?.pocketFrom?.pocketName
      }`;
    case 2:
      return `${translate.instant('POCKET')} - ${toHow?.pocketTo?.pocketName}`;
    case 3:
      return `${translate.instant('BANKS.BANCO_POPULAR')} - ${translate.instant(
        'PRODUCT_TYPES.' + template?.request?.parentAccountType
      )} **** ${template?.request?.parentAccountId.slice(-4)}`;
  }
}
