import { Product } from '@commons/models/product.model';
import { IProductDetail } from '@modules/detail/product-detail/entities/product-detail.entities';
import { infoProductDetailMapper } from '@modules/detail/product-detail/mappers/information-product-detail.mapper';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { servicesProductDetailMapper } from '@modules/detail/product-detail/mappers/services-product-detail.mapper';
import { IPayrollLoans } from '@commons/entities/pay-rolls-loans.entities';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';
import { HideShowIdPipe } from '@commons/pipes/hide-show-id.pipe';

export const globalProductMapper = (
  product: Product,
  loadingItem: boolean,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  pipeNumber: TypeCreditCardPipe,
  imageCdn: ImageCdnPipe,
  isComplementary: boolean,
  products: Product[],
  hideShowIdPipe: HideShowIdPipe
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
    information: infoProductDetailMapper(
      product,
      loadingItem,
      translateService,
      currencyPipe,
      pipeNumber,
      imageCdn,
      hideShowIdPipe
    ),
    services: servicesProductDetailMapper(
      product,
      translateService,
      imageCdn,
      isComplementary,
      products
    )
  };
};
