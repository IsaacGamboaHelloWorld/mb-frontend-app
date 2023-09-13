import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';

import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { BANKS } from '@commons/constants/banks';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { INewPaymentBillerService } from '@modules/payments/entities/billers.entities';

const imageCdnPipe = new ImageCdnPipe();

export function newPaymentConfirmationMapper(
  template: any
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'new-payment-confirmation',
    img: {
      url: imageCdnPipe.transform('/isologo.png'),
      type: 'small'
    },
    title: this.translateService.instant('RECHARGE.CONFIRMATION.TITLE'),
    amount: {
      name: this.translateService.instant('VALUE'),
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
        value: `${template?.toWho?.to?.billerName} - ${template?.toWho?.to?.billerNickName} - Fact. ${template?.toWho?.to?.contract}`
      },
      {
        name: this.translateService.instant('DATE'),
        value: dateFormat(template?.when?.date)
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
      name: this.translateService.instant('PAYMENT.CONFIRMATION.PAY'),
      loading: false,
      className: 'btn btn-primary medium'
    }
  };
}

export const newPaymentBillerServiceMapper = (
  template: ISaveDataTemplate
): INewPaymentBillerService => {
  return {
    billerPayment: {
      amount: template.howMuch?.amount?.normal,
      biller: !!template?.toWho?.to?.biller,
      billerId: template?.toWho?.to?.billerId,
      billerName: template?.toWho?.to?.billerName,
      billerNickName: template?.toWho?.to?.billerNickName,
      contract: template?.toWho?.to?.contract,
      currencyCode: 'COP',
      dueDate: template?.toWho?.to?.biller
        ? template?.toWho?.to?.dueDate
        : undefined,
      expirationDate: template?.toWho?.to?.biller
        ? template?.toWho?.to?.expirationDate
        : undefined,
      invoice: template?.toWho?.to?.biller
        ? template?.toWho?.to?.invoice
        : undefined,
      isDonePayment: template?.toWho?.to?.isDonePayment,
      isScheduledPayment: template?.toWho?.to?.isScheduledPayment,
      originAccountId: template?.toWho?.from?.id,
      originAccountType: template?.toWho?.from?.typeAccount,
      primaryBillerAmount: template?.toWho?.to?.biller
        ? template?.toWho?.to?.primaryBillerAmount
        : undefined,
      primaryBillerCurrencyCode: template?.toWho?.to?.biller
        ? template?.toWho?.to?.primaryBillerCurrencyCode
        : undefined,
      scheduledDate: undefined,
      secondaryBillerAmount: template?.toWho?.to?.biller
        ? template?.toWho?.to?.secondaryBillerAmount
        : undefined,
      secondaryBillerCurrencyCode: template?.toWho?.to?.biller
        ? template?.toWho?.to?.secondaryBillerCurrencyCode
        : undefined,
      reference: template?.toWho?.to?.biller
        ? template?.howMuch?.reference
        : undefined
    },
    companyId: BANKS.BANCO_POPULAR,
    ipAddress: '192.168.0.1',
    requestId: Math.floor(Date.now() / 1000),
    language: 'es_CO'
  };
};
