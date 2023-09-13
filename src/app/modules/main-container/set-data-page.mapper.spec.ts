import { setDataPage } from '@modules/main-container/set-data-page.mapper';
import {
  HOME_PAYMENT,
  HOME_TRANSFER,
  NOT_COMPLEMENTARY,
  OPEN_ACCOUNT_CUSTOM
} from '@commons/constants/navigatie-global';
import { URLS_OPEN_NEW_PRODUCT } from '@commons/constants/open-new-products';

describe('set data page mapper', () => {
  it('setDataPage', () => {
    const self = {
      genericHome: [],
      configService: {
        config: []
      },
      pageOpenAccountService: {
        params: ''
      }
    };
    setDataPage.bind(self)(HOME_PAYMENT);
    setDataPage.bind(self)(HOME_PAYMENT, true);
    setDataPage.bind(self)(HOME_TRANSFER);
    setDataPage.bind(self)(HOME_TRANSFER, true);
    setDataPage.bind(self)(
      OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.WITHDRAWAL
    );
    setDataPage.bind(self)(
      OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.RECHARGE
    );
    setDataPage.bind(self)(OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.PAYMENT);
    setDataPage.bind(self)(
      OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.TRANSFER
    );
    setDataPage.bind(self)(OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.ADVANCE);
    setDataPage.bind(self)(OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.QR);
    setDataPage.bind(self)(NOT_COMPLEMENTARY);
  });
});
