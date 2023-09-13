import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { BANKS } from '@commons/constants/banks';
import {
  IAgreementsBody,
  IBillerDetailBody,
  INewPaymentBillerService
} from '@modules/payments/entities/billers.entities';

const imageCdnPipe = new ImageCdnPipe();

export function newPaymentNotRegisteredConfirmationMapper(
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
        template?.toWho?.biller?.amount,
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
        name: this.translateService.instant(
          'PAYMENT.LOANS.CONFIRMATION.DESTINATION'
        ),
        value: `${template?.toWho?.biller?.billerName ||
          ''} - ${this.translateService.instant('PAYMENT.VOUCHER')} ${template
          ?.toWho?.biller?.invoice || ''}`
      },
      {
        name: this.translateService.instant('PAYMENT.LOANS.CONFIRMATION.DATE'),
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

export const searchBillerMapper = (value: string): IAgreementsBody => ({
  companyId: BANKS.BANCO_POPULAR,
  entityName: value
});

export const detailBillerMapper = (
  billerId: string,
  contract: string
): IBillerDetailBody => ({
  billerPayment: {
    billerId,
    contract
  }
});

export const newPaymentBillerNotRegisteredServiceMapper = (
  template: ISaveDataTemplate
): INewPaymentBillerService => {
  return {
    billerPayment: {
      amount: template.toWho?.biller?.amount,
      billerId: template.toWho?.biller?.billerId,
      billerName: template?.toWho?.biller?.billerName,
      billerNickName: template?.toWho?.biller?.billerNickName,
      contract: template?.toWho?.biller?.contract,
      currencyCode: 'COP',
      dueDate: template?.toWho?.biller?.dueDate,
      expirationDate: template?.toWho?.biller?.expirationDate,
      invoice: template?.toWho?.biller?.invoice,
      isDonePayment: template?.toWho?.biller?.isDonePayment,
      isScheduledPayment: template?.toWho?.biller?.isScheduledPayment,
      originAccountId: template?.toWho?.from?.id,
      originAccountType: template?.toWho?.from?.typeAccount,
      primaryBillerAmount: undefined,
      primaryBillerCurrencyCode: undefined,
      scheduledDate: undefined,
      secondaryBillerAmount: undefined,
      secondaryBillerCurrencyCode: undefined,
      reference: template?.toWho?.biller?.contract
    },
    companyId: BANKS.BANCO_POPULAR,
    ipAddress: '192.168.0.1',
    requestId: Math.floor(Date.now() / 1000),
    language: 'es_CO'
  };
};
