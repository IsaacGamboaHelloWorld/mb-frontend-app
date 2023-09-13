import { IFinance } from '@modules/home/entities/finances.entities';
import { FINANCES_PROPERTIES } from '@modules/home/constants/properties-finances.constant';
import { Product } from '@commons/models/product.model';
import { IProductsPack } from '@commons/entities/products.entities';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

export const financesMapper = (
  products: IProductsPack,
  section: string,
  translateService: TranslateService,
  currencyFormatPipe: CurrencyFormatPipe
): IFinance => {
  let [value, exists, row] = [0, false, null];
  if (!!products) {
    Object.keys(FINANCES_PROPERTIES[section]).forEach((productType) => {
      if (!!products[productType]) {
        products[productType]
          .filter(
            (product: Product) =>
              !!product.productAccountBalances && product.didAthCall
          )
          .forEach((product: Product) => {
            if (
              !!product.productAccountBalances[
                FINANCES_PROPERTIES[section][productType]
              ]
            ) {
              value +=
                product.productAccountBalances[
                  FINANCES_PROPERTIES[section][productType]
                ].amount;
              exists = true;
            }
          });
      }
    });
  }
  if (exists) {
    row = {
      name: translateService.instant('FINANCES.TYPES.' + section),
      type: section,
      icon: translateService.instant('FINANCES.ICONS.' + section),
      amount: currencyFormatPipe.transform(value, true)
    };
  }
  return row;
};
