import {
  HOME_DOCUMENTS,
  HOME_PAYMENT,
  HOME_TRANSFER,
  NOT_COMPLEMENTARY,
  OPEN_ACCOUNT_CUSTOM
} from '@commons/constants/navigatie-global';
import {
  GENERIC_HOME_DOCUMENTS,
  GENERIC_HOME_PAYMENTS,
  GENERIC_HOME_TRANSFERS
} from '@commons/constants/generic-home';
import {
  NOT_COMPLEMENTARY_PAGE,
  REQUEST_CREDIT_CARD,
  REQUEST_PAYMENT,
  REQUEST_QR,
  REQUEST_RECHARGE,
  REQUEST_TRANSFER,
  REQUEST_WITHDRAWAL,
  URLS_OPEN_NEW_PRODUCT
} from '@commons/constants/open-new-products';
import { ValidateEnableItems } from '@commons/constants/menu_items';
import { IGenericHomeItem } from '@commons/entities/generic-home-product-entities';

export function setDataPage(url: string, complementary: boolean = false): void {
  switch (url) {
    case HOME_PAYMENT:
      this.genericHome.items = {
        ...GENERIC_HOME_PAYMENTS,
        items: ValidateEnableItems(
          GENERIC_HOME_PAYMENTS.items as IGenericHomeItem[],
          this.configService.config,
          complementary
        )
      };
      break;
    case HOME_TRANSFER:
      this.genericHome.items = {
        ...GENERIC_HOME_TRANSFERS,
        items: ValidateEnableItems(
          GENERIC_HOME_TRANSFERS.items as IGenericHomeItem[],
          this.configService.config,
          complementary
        )
      };
      break;
    case HOME_DOCUMENTS:
      this.genericHome.items = {
        ...GENERIC_HOME_DOCUMENTS,
        items: ValidateEnableItems(
          GENERIC_HOME_DOCUMENTS.items as IGenericHomeItem[],
          this.configService.config,
          complementary
        )
      };
      break;
    case OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.WITHDRAWAL:
      this.pageOpenAccountService.params = REQUEST_WITHDRAWAL;
      break;
    case OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.RECHARGE:
      this.pageOpenAccountService.params = REQUEST_RECHARGE;
      break;
    case OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.PAYMENT:
      this.pageOpenAccountService.params = REQUEST_PAYMENT;
      break;
    case OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.TRANSFER:
      this.pageOpenAccountService.params = REQUEST_TRANSFER;
      break;
    case OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.ADVANCE:
      this.pageOpenAccountService.params = REQUEST_CREDIT_CARD;
      break;
    case OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.QR:
      this.pageOpenAccountService.params = REQUEST_QR;
      break;
    case NOT_COMPLEMENTARY:
      this.pageOpenAccountService.params = NOT_COMPLEMENTARY_PAGE;
      break;
  }
}
