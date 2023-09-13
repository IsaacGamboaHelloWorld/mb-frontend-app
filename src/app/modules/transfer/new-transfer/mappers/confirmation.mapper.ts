import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';

import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { INewTransferService } from '@modules/transfer/entities/transfer.entities';
import { BANKS } from '@commons/constants/banks';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';

const imageCdnPipe = new ImageCdnPipe();

export function newTransferConfirmationMapper(
  template: any
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
        value: `${this.translateService.instant('BANKS.BANCO_POPULAR')} - ${
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
        name: this.translateService.instant('RECHARGE.TO_WHO.DESTINATION'),
        value: `${template?.toWho?.to?.bankName} - ${
          template?.toWho?.to?.customerName
        } - ${this.translateService.instant(
          'PRODUCT_TYPES.' + template.toWho?.to?.destinationAccountType
        )} ${template.toWho?.to?.destinationAccountId?.slice(-4)} `
      },
      {
        name: this.translateService.instant('MOVEMENTS.DEPOSIT.DESCRIPTION'),
        value: `${template?.howMuch?.description} ${
          !!template?.howMuch?.voucherId
            ? '- ' + template?.howMuch?.voucherId
            : ''
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
        value: template?.toWho?.constTransaction
      }
    ]
  };
  return {
    voucher,
    buttonFirst: {
      name: this.translateService.instant('NEW_TRANSFER.CONFIRMATION.BTN'),
      loading: false,
      className: 'btn btn-primary medium'
    }
  };
}

export const newTransferServiceMapper = (
  template: ISaveDataTemplate
): INewTransferService => {
  return {
    requestId: Math.floor(Date.now() / 1000),
    companyId: BANKS.BANCO_POPULAR,
    notes: template?.howMuch?.description || '',
    invoiceNumber: template?.howMuch?.voucherId,
    accountFromInformation: {
      accountIdentifier: template?.toWho?.from?.id,
      productType: template?.toWho?.from?.typeAccount
    },
    transactionCost: template?.toWho?.constTransaction,
    accountToInformation: {
      accountIdentifier: template?.toWho?.to?.destinationAccountId,
      productType: template?.toWho?.to?.destinationAccountType,
      bank: template?.toWho?.to?.bankId,
      bankName: template?.toWho?.to?.bankName,
      identificationType: template?.toWho?.to?.customerIdType,
      identificationNumber: template?.toWho?.to?.customerId,
      isNewAccount: false,
      name: template?.toWho?.to?.customerName,
      isFavorite: template?.when?.favorite
    },
    transferInformation: {
      amount: template?.howMuch?.amount?.normal
    },
    scheduledTransfer: false,
    dueDate: template?.when?.date?.toISOString()
  };
};
