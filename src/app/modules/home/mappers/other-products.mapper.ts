import { TranslateService } from '@ngx-translate/core';

import { IOtherProductsBodyService } from '@modules/home/entities/otherProducts.entities';
import { BANKS } from '@commons/constants/banks';
import { Product } from '@commons/models/product.model';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { ICard } from '@commons/entities/card.entities';
import { currencyFormat, translate } from '@commons/helpers/global.helper';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';

export const bankServiceMapper = (
  nameBank: string
): IOtherProductsBodyService => ({
  requestId: Math.floor(Date.now() / 1000),
  companyId: BANKS.BANCO_POPULAR,
  currentSystemDate: '',
  entitySearch: nameBank
});

export const mapperOtherProduct = (
  product: Product,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  pipeNumber: TypeCreditCardPipe,
  imageCdn: ImageCdnPipe
): ICard => {
  const { loading, completed, errorMessage, error, success } = product;

  const defaultInfo = {
    name: translate(
      translateService,
      'PRODUCT_TYPES.' + product?.accountInformation?.productType
    ),
    id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${
      product?.accountInformation?.accountIdentifier
    }`,
    loading,
    completed,
    errorMessage,
    error,
    success,
    sectionError: {
      title: translate(translateService, 'PRODUCTS.ERROR.PRODUCT_TITLE'),
      description: translate(
        translateService,
        'PRODUCTS.ERROR.PRODUCT_DESCRIPTION'
      ),
      textButton: translate(translateService, 'PRODUCTS.ERROR.BTN'),
      typeButton: 'btn-primary'
    }
  };

  switch (product?.accountInformation?.productType) {
    case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT: {
      return {
        ...defaultInfo,
        content: {
          title: translate(
            translateService,
            'PRODUCTS.DEPOSIT_ACCOUNT.BALANCE_AVAILABLE'
          ),
          amount: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.saldo_disponible?.amount,
            true
          ),
          showFooter: false
        }
      };
    }
    case TYPE_ACCOUNTS.CURRENT_ACCOUNT: {
      return {
        ...defaultInfo,
        content: {
          title: translate(
            translateService,
            'PRODUCTS.DEPOSIT_ACCOUNT.BALANCE_AVAILABLE'
          ),
          amount: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.saldo_disponible?.amount,
            true
          ),
          showFooter: false
        }
      };
    }
    case TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM: {
      return {
        ...defaultInfo,
        content: {
          title: translate(translateService, 'PRODUCTS.CDT.INVEST_VALUE'),
          amount: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.valor_constitucion?.amount,
            true
          ),
          showFooter: false
        }
      };
    }
    case TYPE_ACCOUNTS.CREDIT_CARD: {
      return {
        ...defaultInfo,
        id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${
          pipeNumber.transform(product?.accountInformation?.accountIdentifier)
            .maskId
        }`,
        img: imageCdn.transform(
          pipeNumber.transform(product?.accountInformation?.accountIdentifier)
            .img
        ),
        content: {
          title: translate(
            translateService,
            'PRODUCTS.CREDIT_CARD.FULL_PAYMENT'
          ),
          amount: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.cupo_disponible_compras?.amount,
            true
          ),
          showFooter: false
        }
      };
    }
    default:
      return {
        ...defaultInfo,
        content: {
          title: translate(
            translateService,
            'PRODUCTS.DEPOSIT_ACCOUNT.TOTAL_BALANCE'
          ),
          amount: currencyFormat(
            currencyPipe,
            product?.productAccountBalances
              ? product?.productAccountBalances[
                  Object?.keys(product?.productAccountBalances)[0]
                ]?.amount
              : null,
            true
          ),
          showFooter: false
        }
      };
  }
};
