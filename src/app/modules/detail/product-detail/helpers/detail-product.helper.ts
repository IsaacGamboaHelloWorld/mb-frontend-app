import { TranslateService } from '@ngx-translate/core';

import { Product } from '@commons/models/product.model';
import { IProductDetail } from '@modules/detail/product-detail/entities/product-detail.entities';
import { globalProductMapper } from '@modules/detail/product-detail/mappers/global-product-detail.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { HideShowIdPipe } from '@commons/pipes/hide-show-id.pipe';
import { movementsMapper } from '@modules/detail/product-detail/mappers/movements.mapper';
import { IMovements } from '@modules/detail/product-detail/entities/movements.entities';
import { IPayrollLoans } from '@commons/entities/pay-rolls-loans.entities';
import { payRollLoansMapper } from '@modules/detail/product-detail/mappers/payroll-loans.mapper';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { IMovementsState } from '@modules/detail/product-detail/store/states/movements.state';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';
import { freeDestinationDetailMapper } from '@modules/detail/product-detail/mappers/free-destination.mapper';

export const findInfoProduct = (
  product: Product | IPayrollLoans | IFreeDestinationDetail,
  loading: boolean,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  pipeNumber: TypeCreditCardPipe,
  imageCdn: ImageCdnPipe,
  isComplementary: boolean,
  products: Product[],
  hideShowIdPipe: HideShowIdPipe
): IProductDetail => {
  if (
    (product as IFreeDestinationDetail)?.productType?.toUpperCase() ===
    TYPE_ACCOUNTS.FREE_DESTINATION
  ) {
    return freeDestinationDetailMapper(
      product as IFreeDestinationDetail,
      loading,
      translateService,
      currencyPipe,
      imageCdn
    );
  } else if (
    (product as IPayrollLoans)?.accountType?.toUpperCase() ===
    TYPE_ACCOUNTS.PAYDAY_LOAN
  ) {
    return payRollLoansMapper(
      product as IPayrollLoans,
      loading,
      translateService,
      currencyPipe
    );
  } else {
    return globalProductMapper(
      product as Product,
      loading,
      translateService,
      currencyPipe,
      pipeNumber,
      imageCdn,
      isComplementary,
      products,
      hideShowIdPipe
    );
  }
};

export const findMovements = (
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  movements: IMovementsState
): IMovements => {
  return {
    loading: movements?.loading,
    completed: movements?.completed,
    error: movements?.error,
    errorMessage: movements?.errorMessage,
    list: movementsMapper(
      translateService,
      currencyPipe,
      movements?.information
    )
  };
};
