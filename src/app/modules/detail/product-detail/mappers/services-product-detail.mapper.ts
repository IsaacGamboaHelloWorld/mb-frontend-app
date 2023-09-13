import { TranslateService } from '@ngx-translate/core';

import { Product } from '@commons/models/product.model';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IProductDetailService } from '@modules/detail/product-detail/entities/product-detail.entities';
import { PRODUCT_DETAIL_TYPE_SERVICES } from '@modules/detail/product-detail/constants/product-detail-services.constant';
import { ConfigService } from '@commons/services/config.service';
import { environment } from '@environment/environment';
import { NOT_COMPLEMENTARY_ITEMS } from '@commons/constants/menu_items';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';
import { FLEX_CUBE_ACCOUNT } from '@modules/block-product/constants/block-products.constants';

const configService = new ConfigService();

export const servicesProductDetailMapper = (
  product: Product | IFreeDestinationDetail,
  translateService: TranslateService,
  imageCdn: ImageCdnPipe,
  hasComplementary: boolean = false,
  products: Product[]
): IProductDetailService[] => {
  function validateDisabled(
    service: IProductDetailService,
    disable: boolean
  ): boolean {
    let disabled;
    disabled = disable
      ? disable
      : configService.config.some((item): boolean => {
          if (item.id === service?.id) {
            return !item?.enabled;
          }
        });
    return !!disabled;
  }

  function validatePermissions(service: IProductDetailService): boolean {
    if (!environment.validateComplementary) {
      return true;
    }
    return hasComplementary
      ? true
      : !NOT_COMPLEMENTARY_ITEMS.includes(service.id);
  }

  const setService = (
    service: IProductDetailService,
    disable: boolean = false,
    hasPermission: boolean = true
  ) => {
    return {
      ...service,
      name: translateService.instant('PRODUCTS.SERVICES.' + service?.type),
      disabled: validateDisabled(service, disable),
      hasPermissions: hasPermission
        ? validatePermissions(service)
        : hasPermission
    };
  };

  switch (
    (product as Product).typeAccount ||
    (product as IFreeDestinationDetail).productType
  ) {
    case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT: {
      return [
        setService(PRODUCT_DETAIL_TYPE_SERVICES.MOBILE_RECHARGES),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.PAYMENT_OBLIGATION),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.WITHDRAWN_WITHOUT_CARD),
        ...((product as Product)?.couldHavePockets
          ? [setService(PRODUCT_DETAIL_TYPE_SERVICES.POCKETS)]
          : []),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.TRANSFER_ACCOUNTS),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.STATEMENT),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.CERTIFICATE)
      ];
    }
    case TYPE_ACCOUNTS.CURRENT_ACCOUNT: {
      return [
        setService(PRODUCT_DETAIL_TYPE_SERVICES.MOBILE_RECHARGES),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.PAYMENT_OBLIGATION),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.WITHDRAWN_WITHOUT_CARD),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.TRANSFER_ACCOUNTS),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.STATEMENT),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.CERTIFICATE)
      ];
    }
    case TYPE_ACCOUNTS.CREDIT_CARD: {
      const hasPermission =
        products.filter(
          (data) => !FLEX_CUBE_ACCOUNT.includes(data?.id?.slice(0, 3))
        ).length > 0;
      return [
        setService(PRODUCT_DETAIL_TYPE_SERVICES.ADVANCE, true, hasPermission),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.STATEMENT),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.PAYMENT_OBLIGATION_CREDIT_CARD),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.CERTIFICATE_TC, true)
      ];
    }
    case TYPE_ACCOUNTS.FREE_DESTINATION: {
      return [
        setService(PRODUCT_DETAIL_TYPE_SERVICES.PAYMENT_OBLIGATION, true),
        setService(PRODUCT_DETAIL_TYPE_SERVICES.STATEMENT, true)
      ];
    }
    default:
      return [];
  }
};
