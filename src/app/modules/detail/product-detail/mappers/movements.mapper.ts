import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import {
  IMovement,
  IMovements,
  ItemMovement
} from '@modules/detail/product-detail/entities/movements.entities';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import {
  currencyFormat,
  dateFormat,
  translate
} from '@commons/helpers/global.helper';
import { IPayrollLoans } from '@commons/entities/pay-rolls-loans.entities';
import { TitleCasePipe } from '@angular/common';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';

const titleCase = new TitleCasePipe();

export const movementsMapper = (
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  movements: IMovement
): ItemMovement[] => {
  switch (movements?.accountInformation?.accountType) {
    case TYPE_ACCOUNTS.CURRENT_ACCOUNT:
    case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT: {
      return movements?.operations.map((movement) => {
        return {
          realDate: movement?.transactionInformation?.transactionDate,
          date: dateFormat(movement?.transactionInformation?.transactionDate),
          title: movement?.transactionInformation?.transactionType,
          value: `${
            +movement?.amountsWithOperationType?.INCOME >
            +movement?.amountsWithOperationType?.OUTCOME
              ? ''
              : '-'
          }${currencyPipe.transform(
            +movement?.amountsWithOperationType?.INCOME >
              +movement?.amountsWithOperationType?.OUTCOME
              ? movement?.amountsWithOperationType?.INCOME
              : movement?.amountsWithOperationType?.OUTCOME,
            true
          )}`,
          positive:
            +movement?.amountsWithOperationType?.INCOME >
            +movement?.amountsWithOperationType?.OUTCOME,
          list: [
            {
              title: translateService.instant('MOVEMENTS.DEPOSIT.OFFICE'),
              value: movement?.officeInformation?.officeName
            },
            {
              title: translateService.instant('MOVEMENTS.DEPOSIT.NID'),
              value: movement?.officeInformation?.officeId
            },
            ...(+movement?.amountsWithOperationType?.CASH > 0
              ? [
                  {
                    title: translateService.instant(
                      'MOVEMENTS.DEPOSIT.VALUE_CASH'
                    ),
                    value: currencyPipe.transform(
                      movement?.amountsWithOperationType?.CASH,
                      true
                    )
                  }
                ]
              : []),
            ...(+movement?.amountsWithOperationType?.TICKET > 0
              ? [
                  {
                    title: translateService.instant(
                      'MOVEMENTS.DEPOSIT.VALUE_BILL'
                    ),
                    value: currencyPipe.transform(
                      movement?.amountsWithOperationType?.TICKET,
                      true
                    )
                  }
                ]
              : [])
          ]
        };
      });
    }
    case TYPE_ACCOUNTS.CREDIT_CARD: {
      return movements?.creditCardMovements.map((movement) => {
        return {
          realDate: movement?.transactionDate,
          date: dateFormat(movement?.transactionDate),
          title: movement?.description,
          value: `${
            +movement.credits > +movement.debits ? '' : '-'
          }${currencyPipe.transform(
            +movement.credits > +movement.debits
              ? movement?.credits
              : movement?.debits,
            true
          )}`,
          positive: +movement.credits > +movement.debits,
          list: []
        };
      });
    }
    default:
      return [];
  }
};

export const movementsPayLoans = (
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  product: IPayrollLoans
): IMovements => {
  return {
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    list: [
      {
        value: titleCase.transform(
          product?.company?.name?.split('-')[0]?.toLowerCase() || ''
        ),
        title: translateService.instant('PAY_ROLL_LOANS.PAYMENT'),
        list: []
      },
      {
        value: currencyPipe.transform(product?.approvedAmount, true),
        title: translateService.instant('PAY_ROLL_LOANS.VALUE_CREDIT'),
        list: []
      },
      {
        value: dateFormat(product?.disbursementDate),
        title: translateService.instant('PAY_ROLL_LOANS.OPEN_DATE'),
        list: []
      },
      {
        value: `${product?.fees} ${translateService.instant('MONTHS')}`,
        title: translateService.instant('PAY_ROLL_LOANS.TERM'),
        list: []
      },
      {
        value: `${product?.payedFees} de ${product?.fees}`,
        title: translateService.instant('PAY_ROLL_LOANS.PAID_FEES'),
        list: []
      },
      {
        value: `${product?.approvalRate} ${translateService.instant(
          'PAY_ROLL_LOANS.PERCENTAGE'
        )}`,
        title: translateService.instant('PAY_ROLL_LOANS.INTEREST_RATE'),
        list: []
      }
    ]
  };
};

export const movementsFreeDestination = (
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  product: IFreeDestinationDetail
): IMovements => {
  return {
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    list: [
      {
        title: translateService.instant('FREE_DESTINATION.DETAILS_LIST.AMOUNT'),
        value: currencyFormat(currencyPipe, product?.approvalAmount, true),
        list: []
      },
      {
        title: translateService.instant(
          'FREE_DESTINATION.DETAILS_LIST.DISBURSEMENT_DATE'
        ),
        value: dateFormat(product?.startDate),
        list: []
      },
      {
        title: translateService.instant('FREE_DESTINATION.DETAILS_LIST.TERM'),
        value: `${product?.term} ${translate(
          translateService,
          'MONTHS'
        ).toLowerCase()}`,
        list: []
      },
      {
        title: translateService.instant('FREE_DESTINATION.DETAILS_LIST.RATE'),
        value: `${product?.currentRate}${translateService.instant(
          'FREE_DESTINATION.DETAILS_LIST.PERCENTAGE'
        )}`,
        list: []
      }
    ]
  };
};
