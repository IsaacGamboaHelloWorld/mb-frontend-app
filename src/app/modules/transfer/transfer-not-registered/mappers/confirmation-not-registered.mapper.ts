import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { INewTransferService } from '@modules/transfer/entities/transfer.entities';
import { BANKS } from '@commons/constants/banks';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';

const imageCdnPipe = new ImageCdnPipe();

export function newTransferConfirmationNotRegisteredMapper(
  template: any,
  retry?: boolean
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'new-transfer-confirmation',
    img: {
      url: imageCdnPipe.transform('/isologo.png'),
      type: 'small'
    },
    title: this.translateService.instant('RECHARGE.CONFIRMATION.TITLE'),
    amount: {
      name: this.translateService.instant(
        'NEW_TRANSFER.CONFIRMATION.TITLE_AMOUNT'
      ),
      value: this.currencyFormat.transform(
        template?.howMuch?.amount?.normal,
        true
      )
    },
    list: [
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.ORIGIN'),
        value: `${
          template?.toWho?.from?.nameAccount
        } ${template?.toWho?.from?.id.slice(-4)}`
      },
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.DESTINATION'),
        value: `${this.translateService.instant(
          'PRODUCT_TYPES.' + template.toWho?.typeAccount
        )} ${template.toWho?.numberAccount?.slice(-4)}`
      },
      {
        name: !!template?.howMuch?.description
          ? this.translateService.instant('MOVEMENTS.DEPOSIT.DESCRIPTION')
          : '',
        value: `${
          !!template?.howMuch?.description ? template?.howMuch?.description : ''
        } ${!!template?.howMuch?.voucherId ? ' -' : ''} ${
          !!template?.howMuch?.voucherId ? template?.howMuch?.voucherId : ''
        }`
      },
      {
        name: this.translateService.instant('DATE'),
        value: `${this.translateService.instant('TODAY')} - ${dateFormat(
          template?.when?.date
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
      name: !retry
        ? this.translateService.instant('NEW_TRANSFER.CONFIRMATION.BTN')
        : this.translateService.instant('NEW_TRANSFER.CONFIRMATION.BTN_RETRY'),
      loading: false,
      className: 'btn btn-primary medium'
    }
  };
}

export const newTransferNotRegisteredServiceMapper = (
  template: ISaveDataTemplate
): INewTransferService => {
  return {
    requestId: Math.floor(Date.now() / 1000),
    companyId: BANKS.BANCO_POPULAR,
    notes: template?.howMuch?.description || '',
    invoiceNumber: template?.howMuch?.voucherId,
    accountFromInformation: {
      bank: '0002',
      accountIdentifier: template?.toWho?.from?.id,
      productType: template?.toWho?.from?.typeAccount
    },
    transactionCost: '$0',
    accountToInformation: {
      accountIdentifier: template?.toWho?.numberAccount,
      productType: template?.toWho?.typeAccount,
      bank: template?.toWho?.bank?.id,
      bankName: template?.toWho?.bank?.name,
      identificationType: '',
      identificationNumber: '',
      isNewAccount: false,
      name: '',
      isFavorite: template?.when?.favorite
    },
    transferInformation: {
      amount: template?.howMuch?.amount?.normal
    },
    scheduledTransfer: false,
    dueDate: template?.when?.date?.toISOString()
  };
};
