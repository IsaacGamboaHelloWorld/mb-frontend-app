import { ICard } from '@commons/entities/card.entities';
import { Product } from '@commons/models/product.model';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TranslateService } from '@ngx-translate/core';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { currencyFormat, translate } from '@commons/helpers/global.helper';
import { IProductNickname } from '@modules/main-container/entities/main-products.entities';
import { HideShowIdPipe } from '@app/commons/pipes/hide-show-id.pipe';

export const mapperProduct = (
  product: Product,
  nicknames: IProductNickname[],
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  pipeNumber: TypeCreditCardPipe,
  imageCdn: ImageCdnPipe,
  hideShowId: HideShowIdPipe
): ICard => {
  const { id, loading, completed, errorMessage, error, success } = product;

  const defaultInfo = {
    name: _findNickname(product, nicknames),
    id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${id}`,
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

  switch (product.typeAccount) {
    case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT: {
      return {
        ...defaultInfo,
        id: `${translate(translateService, 'PRODUCTS.NUMBER')}.${
          !product?.hiddenIdStatus
            ? hideShowId.transform(product?.id)
            : product?.id
        }`,
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
          link: translate(translateService, 'PRODUCTS.VIEW_DETAIL'),
          showFooter: !!product?.productAccountBalances
        }
      };
    }
    case TYPE_ACCOUNTS.CURRENT_ACCOUNT: {
      return {
        ...defaultInfo,
        id: `${translate(translateService, 'PRODUCTS.NUMBER')}.${
          !product?.hiddenIdStatus
            ? hideShowId.transform(product?.id)
            : product?.id
        }`,
        content: {
          title: translate(
            translateService,
            +product?.overDraftDays > 0
              ? 'PRODUCTS.CURRENT_ACCOUNT.OVERDRAFT'
              : 'PRODUCTS.DEPOSIT_ACCOUNT.BALANCE_AVAILABLE'
          ),
          amount: currencyFormat(
            currencyPipe,
            +product?.overDraftDays > 0
              ? product?.productAccountBalances?.saldo_actual?.amount
              : product?.productAccountBalances?.saldo_disponible?.amount,
            true
          ),
          link: translate(translateService, 'PRODUCTS.VIEW_DETAIL'),
          showFooter: +product?.overDraftDays > 0
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
          showFooter: product?.closedDate !== ''
        }
      };
    }
    case TYPE_ACCOUNTS.CREDIT_CARD: {
      return {
        ...defaultInfo,
        id: `${translate(translateService, 'PRODUCTS.NUMBER')}. ${
          pipeNumber.transform(product?.id).maskId
        }`,
        img: imageCdn.transform(pipeNumber.transform(product.id).img),
        content: {
          title:
            Product.getMinimumPayment(product) > 0
              ? translate(
                  translateService,
                  'PRODUCTS.CREDIT_CARD.NEXT_PAYMENT_MIN'
                )
              : translate(
                  translateService,
                  'PRODUCTS.CREDIT_CARD.QUOTA_AVAILABLE'
                ),
          amount: currencyFormat(
            currencyPipe,
            Product.getMinimumPayment(product) > 0
              ? product?.productAccountBalances?.valor_pago_minimo?.amount
              : product?.productAccountBalances?.cupo_disponible_compras_pesos
                  ?.amount,
            true
          ),
          amountSmall:
            Product.getMinimumPayment(product) > 0
              ? translate(
                  translateService,
                  'PRODUCTS.CREDIT_CARD.FULL_PAYMENT'
                ) +
                ': ' +
                currencyFormat(
                  currencyPipe,
                  product?.productAccountBalances?.pago_total_pesos?.amount
                )
              : null,
          link: translate(translateService, 'PRODUCTS.VIEW_DETAIL'),
          showFooter:
            product?.success &&
            !!product?.productAccountBalances?.pago_total_pesos
        }
      };
    }
    default:
      return defaultInfo;
  }
};

export const _findNickname = (
  product: Product,
  nicknames: IProductNickname[]
): string => {
  if (nicknames) {
    const productNickname = nicknames.find(
      (pNickname) =>
        pNickname.accountType.toUpperCase() ===
          product.typeAccount.toUpperCase() &&
        pNickname.accountId === product.id
    );
    return !!productNickname?.name && productNickname.name !== ''
      ? productNickname?.name
      : product.nameAccount;
  }
};
