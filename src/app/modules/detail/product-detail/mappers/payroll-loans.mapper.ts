import { IPayrollLoans } from '@commons/entities/pay-rolls-loans.entities';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IProductDetail } from '@modules/detail/product-detail/entities/product-detail.entities';
import {
  currencyFormat,
  dateFormat,
  translate
} from '@commons/helpers/global.helper';

export const payRollLoansMapper = (
  product: IPayrollLoans,
  loadingItem: boolean,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe
): IProductDetail => {
  const { loading, completed, errorMessage, error, success } = product;
  const defaultInfo = {
    loading,
    completed,
    errorMessage,
    error,
    success
  };
  return {
    ...defaultInfo,
    information: {
      id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${product?.id}`,
      name: product?.nameAccount,
      status: {
        text: translateService.instant(
          !!product?.daysArrears
            ? 'PAY_ROLL_LOANS.STATUS.ERROR'
            : 'PAY_ROLL_LOANS.STATUS.SUCCESS'
        ),
        class: !!product?.daysArrears ? 'error' : 'success'
      },
      amount: {
        title: translateService.instant('PAY_ROLL_LOANS.DESCRIPTION'),
        value: currencyFormat(currencyPipe, product?.feeAmount, true)
      },
      content: {
        list: [
          {
            title: translateService.instant('PAY_ROLL_LOANS.NEXT_PAYMENT'),
            value: dateFormat(product?.nextPaymentDate)
          }
        ],
        description: translateService.instant(
          'PAY_ROLL_LOANS.DESCRIPTION_DETAIL'
        )
      }
    },
    services: []
  };
};
