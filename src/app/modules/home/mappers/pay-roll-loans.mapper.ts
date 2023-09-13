import { IPayRollLoansState } from '@modules/main-container/store/states/products.state';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { ICard } from '@commons/entities/card.entities';
import { currencyFormat, translate } from '@commons/helpers/global.helper';
import { IPayrollLoans } from '@app/commons/entities/pay-rolls-loans.entities';

export const mapperRollLoans = (
  rollLoansState: IPayRollLoansState,
  dataRollLoans: IPayrollLoans,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  imageCdn: ImageCdnPipe
): ICard => {
  const { loading, completed, errorMessage, error } = rollLoansState;
  const defaultInfo = {
    name: dataRollLoans?.nameAccount,
    id: `${translate(translateService, 'PAY_ROLL_LOANS.NRO')} ${
      dataRollLoans.accountId
    }`,
    sectionError: null,
    success: dataRollLoans.success,
    loading,
    completed,
    error,
    errorMessage,
    img: imageCdn.transform('/finances.png')
  };
  return {
    ...defaultInfo,
    content: {
      title: translate(translateService, 'PAY_ROLL_LOANS.DESCRIPTION'),
      amount: currencyFormat(currencyPipe, dataRollLoans?.feeAmount, true),
      amountSmall:
        dataRollLoans.company.name.split('-')[0].charAt(0) +
        dataRollLoans.company.name
          .split('-')[0]
          .slice(1)
          .toLowerCase(),
      showFooter: true,
      link: translate(translateService, 'PRODUCTS.VIEW_DETAIL')
    }
  };
};
