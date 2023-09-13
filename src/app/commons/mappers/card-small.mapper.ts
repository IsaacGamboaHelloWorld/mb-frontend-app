import { TranslateService } from '@ngx-translate/core';

import { Product } from '@commons/models/product.model';
import { ICardSmallEntities } from '@commons/entities/card-small.entities';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

export const cardSmallMapper = (
  product: Product,
  translateService: TranslateService,
  currencyFormat: CurrencyFormatPipe
): ICardSmallEntities => {
  return {
    typeAccount: product?.nameAccount,
    id: product?.id?.slice(-4),
    title: translateService.instant(
      'PRODUCTS.DEPOSIT_ACCOUNT.BALANCE_AVAILABLE'
    ),
    amount: currencyFormat.transform(
      product?.productAccountBalances?.saldo_disponible?.amount,
      true
    ),
    button: {
      text: translateService.instant('CHANGE'),
      className: 'btn btn-secondary tiny'
    }
  };
};
