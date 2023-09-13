import { TranslateService } from '@ngx-translate/core';

import { IProductDetailInformation } from '@modules/detail/product-detail/entities/product-detail.entities';
import { IPocketsByProduct } from '@commons/entities/pockets.entities';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { currencyFormat, translate } from '@commons/helpers/global.helper';

export const pocketMapper = (
  pocket: IPocketsByProduct,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe
): IProductDetailInformation => {
  return {
    id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${
      pocket?.parent?.accountIdentifier
    }`,
    name: translate(
      translateService,
      'PRODUCT_TYPES.' +
        (!!pocket?.parent?.productType
          ? pocket?.parent?.productType
          : 'DEPOSIT_ACCOUNT')
    ),
    amount: {
      title: translate(
        translateService,
        'PRODUCTS.DEPOSIT_ACCOUNT.MONEY_POCKETS'
      ),
      value: currencyFormat(
        currencyPipe,
        pocket?.totalSavedOnPockets ? pocket?.totalSavedOnPockets : 0,
        true
      )
    },
    content: {
      list: pocket?.pockets?.map((product) => ({
        title: product?.pocketName,
        value: currencyFormat(currencyPipe, product?.amountSaved, true)
      }))
    }
  };
};
