import { TranslateService } from '@ngx-translate/core';

import { Product } from '@commons/models/product.model';
import { IProductDetailInformation } from '@modules/detail/product-detail/entities/product-detail.entities';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { currencyFormat, translate } from '@commons/helpers/global.helper';
import { infoProductListDetailMapper } from '@modules/detail/product-detail/mappers/information-list-product-detail.mapper';
import { HideShowIdPipe } from '@commons/pipes/hide-show-id.pipe';

export const infoProductDetailMapper = (
  product: Product,
  loading: boolean,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  pipeNumber: TypeCreditCardPipe,
  imageCdn: ImageCdnPipe,
  hideShowIdPipe: HideShowIdPipe
): IProductDetailInformation => {
  const defaultInfo = {
    id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${product?.id}`,
    name: product?.nameAccount,
    status: {
      text: translate(
        translateService,
        product?.enabled ? 'ACTIVE' : 'INACTIVE'
      ),
      class: product?.enabled ? 'success' : 'error'
    }
  };

  switch (product.typeAccount) {
    case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT: {
      return {
        ...defaultInfo,
        id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${
          product?.hiddenIdStatus
            ? product?.id
            : hideShowIdPipe.transform(product?.id)
        }`,
        amount: {
          title: translate(
            translateService,
            'PRODUCTS.DEPOSIT_ACCOUNT.TOTAL_BALANCE'
          ),
          value: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.saldo_actual?.amount,
            true
          )
        },
        content: {
          list: infoProductListDetailMapper(
            product,
            loading,
            translateService,
            currencyPipe
          )
        }
      };
    }
    case TYPE_ACCOUNTS.CURRENT_ACCOUNT: {
      return {
        ...defaultInfo,
        id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${
          product?.hiddenIdStatus
            ? product?.id
            : hideShowIdPipe.transform(product?.id)
        }`,
        amount: {
          title: translate(
            translateService,
            `PRODUCTS.CURRENT_ACCOUNT.${
              +product?.overDraftDays > 0 ? 'TOTAL_OVERDRAFT' : 'TOTAL_BALANCE'
            }`
          ),
          value: currencyFormat(
            currencyPipe,
            +product?.overDraftDays > 0
              ? product?.productAccountBalances?.saldo_disponible?.amount
              : product?.productAccountBalances?.saldo_actual?.amount,
            true
          )
        },
        content: {
          list: infoProductListDetailMapper(
            product,
            loading,
            translateService,
            currencyPipe
          )
        }
      };
    }
    case TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM: {
      return {
        ...defaultInfo,
        amount: {
          title: translate(translateService, 'PRODUCTS.CDT.TOTAL_BALANCE'),
          value: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.saldo_pendiente_pago?.amount,
            true
          )
        },
        content: {
          list: infoProductListDetailMapper(
            product,
            loading,
            translateService,
            currencyPipe
          )
        }
      };
    }
    case TYPE_ACCOUNTS.CREDIT_CARD: {
      return {
        ...defaultInfo,
        id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${
          pipeNumber.transform(product.id).maskId
        }`,
        img: imageCdn.transform(pipeNumber.transform(product.id).img),
        icon: imageCdn.transform(pipeNumber.transform(product.id).icon),
        amount: {
          title: translate(
            translateService,
            `PRODUCTS.CREDIT_CARD.${
              Product.getMinimumPayment(product) > 0
                ? 'NEXT_PAYMENT_MIN'
                : 'QUOTA_AVAILABLE'
            }`
          ),
          value: currencyFormat(
            currencyPipe,
            Product.getMinimumPayment(product) > 0
              ? product?.productAccountBalances?.valor_pago_minimo?.amount
              : product.productAccountBalances?.cupo_disponible_compras_pesos
                  ?.amount,
            true
          )
        },
        content: {
          list: infoProductListDetailMapper(
            product,
            loading,
            translateService,
            currencyPipe
          )
        }
      };
    }
    default:
      return defaultInfo;
  }
};
