import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { LOAN_TYPES_VALUE } from '@modules/payments/new-payment/constants/loans.contant';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { BANKS } from '@commons/constants/banks';
import { IBodyLoanPayment } from '@modules/payments/entities/loans.entities';
import { CREDIT_CARD } from '@commons/constants/credit-card';

const imageCdnPipe = new ImageCdnPipe();
const creditCard = new TypeCreditCardPipe();

export function newPaymentLoanConfirmationMapper(
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
        template?.howMuch?.type === LOAN_TYPES_VALUE.OTHER
          ? template?.howMuch?.otherAmount?.normal
          : template?.howMuch?.amount?.normal,
        true
      )
    },
    list: [
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.ORIGIN'),
        value: `${
          template?.toWho?.from?.nameAccount
        } **** ${template?.toWho?.from?.id.slice(
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
        value: `${template?.toWho?.to?.bankName || ''} - ${template?.toWho?.to
          ?.loanName || ''} ${this.translateService.instant(
          'PRODUCTS.NUMBER'
        )}. **** ${template?.toWho?.to?.accountId?.slice(-4)}`
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

const getCreditCardBrand = (
  destinationAccountId: string,
  destinationAccountType: string
): string => {
  if (
    'TC' === destinationAccountType ||
    TYPE_ACCOUNTS.CREDIT_CARD === destinationAccountType
  ) {
    const creditCardType: any = creditCard.transform(destinationAccountId).img;
    if (CREDIT_CARD.MASTER_CARD.img === creditCardType) {
      return '01';
    }
    if (CREDIT_CARD.VISA.img === creditCardType) {
      return '02';
    }
  }
  return null;
};

export const newPaymentLoanServiceMapper = (
  template: ISaveDataTemplate
): IBodyLoanPayment => {
  return {
    companyId: BANKS.BANCO_POPULAR,
    ipAddress: '192.168.0.1',
    requestId: Math.floor(Date.now() / 1000),
    language: 'es_CO',
    accountPaymentOrigin: {
      accountId: template?.toWho?.from?.id,
      accountType: template?.toWho?.from?.typeAccount,
      bank: BANKS.BANCO_POPULAR,
      paymentInformation: null
    },
    accountPaymentDestination: {
      accountId: template?.toWho?.to?.accountId,
      accountType: template?.toWho?.to?.accountType,
      bank: template?.toWho?.to?.bank,
      brandId: getCreditCardBrand(
        template?.toWho?.to?.accountId,
        template?.toWho?.to?.accountType?.toUpperCase()
      ),
      loanName: template?.toWho?.to?.loanName,
      newLoan: false
    },
    transactionValue: {
      amount:
        template?.howMuch?.type === LOAN_TYPES_VALUE.OTHER
          ? template?.howMuch?.otherAmount?.normal
          : template?.howMuch?.amount?.normal,
      currencyCode: 'COP'
    },
    clientApp: {
      name: 'MB'
    }
  };
};
