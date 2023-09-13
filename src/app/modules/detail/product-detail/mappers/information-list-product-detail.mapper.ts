import { TranslateService } from '@ngx-translate/core';

import { Product } from '@commons/models/product.model';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import {
  currencyFormat,
  dateFormat,
  translate
} from '@commons/helpers/global.helper';
import { ItemList } from '@modules/detail/product-detail/entities/product-detail.entities';

export const infoProductListDetailMapper = (
  product: Product,
  loading: boolean,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe
): ItemList[] => {
  switch (product.typeAccount) {
    case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT: {
      return [
        {
          title: translate(
            translateService,
            'PRODUCTS.DEPOSIT_ACCOUNT.MONEY_AVAILABLE'
          ),
          value: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.saldo_disponible?.amount,
            true
          )
        },
        {
          title: translate(
            translateService,
            'PRODUCTS.DEPOSIT_ACCOUNT.MONEY_EXCHANGE'
          ),
          value: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.saldo_canje?.amount,
            true
          )
        },
        ...(product?.couldHavePockets
          ? [
              {
                title: translate(
                  translateService,
                  'PRODUCTS.DEPOSIT_ACCOUNT.MONEY_POCKETS'
                ),
                value: translate(
                  translateService,
                  'PRODUCTS.DEPOSIT_ACCOUNT.VIEW_POCKETS_BALANCE_BTN'
                ),
                hasPocket: true,
                loading
              }
            ]
          : [])
      ];
    }
    case TYPE_ACCOUNTS.CURRENT_ACCOUNT: {
      return [
        {
          title: translate(
            translateService,
            `PRODUCTS.CURRENT_ACCOUNT.${
              +product?.overDraftDays > 0 ? 'DAYS_OVERDRAFT' : 'MONEY_AVAILABLE'
            }`
          ),
          value:
            +product?.overDraftDays > 0
              ? product?.overDraftDays
              : currencyFormat(
                  currencyPipe,
                  product?.productAccountBalances?.saldo_disponible?.amount,
                  true
                )
        },
        {
          title: translate(
            translateService,
            'PRODUCTS.CURRENT_ACCOUNT.AVAILABLE_OVERDRAFT'
          ),
          value: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.cupo_disponible_sobregiro?.amount,
            true
          )
        },
        {
          title: translate(
            translateService,
            'PRODUCTS.CURRENT_ACCOUNT.QUOTA_OVERDRAFT'
          ),
          value: currencyFormat(
            currencyPipe,
            +product?.overDraftDays > 0
              ? product?.productAccountBalances?.cupo_disponible_sobregiro
                  ?.amount
              : product?.productAccountBalances?.cupos_aprobado_sobregiro
                  ?.amount,
            true
          )
        },
        {
          title: translate(
            translateService,
            'PRODUCTS.DEPOSIT_ACCOUNT.MONEY_EXCHANGE'
          ),
          value: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.saldo_canje?.amount,
            true
          )
        }
      ];
    }
    case TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM: {
      return [
        {
          title: translate(translateService, 'PRODUCTS.CDT.YOUR_INVERSION'),
          value: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.valor_constitucion?.amount,
            true
          )
        },
        {
          title: translate(translateService, 'PRODUCTS.CDT.PROJECTED_INTEREST'),
          value: currencyFormat(
            currencyPipe,
            product?.productAccountBalances?.intereses_causados?.amount,
            true
          )
        }
      ];
    }
    case TYPE_ACCOUNTS.CREDIT_CARD: {
      return Product.getMinimumPayment(product) > 0
        ? [
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.NEXT_PAYMENT'
              ),
              value: dateFormat(product.dueDate)
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.FULL_PAYMENT'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances?.pago_total_pesos?.amount,
                true
              )
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.QUOTA_AVAILABLE'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances?.cupo_disponible_compras_pesos
                  ?.amount,
                true
              )
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.QUOTA_ADVANCE'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances?.cupo_disponible_avances_pesos
                  ?.amount,
                true
              )
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.QUOTA_TOTAL'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances?.cupo_total?.amount,
                true
              )
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.CUTOFF_DATE'
              ),
              value: dateFormat(product?.dueDate)
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.PURCHASES_TO_APPLY'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances
                  ?.compras_y_avances_pendientes_por_posteo?.amount > 0
                  ? product?.productAccountBalances
                      ?.compras_y_avances_pendientes_por_posteo?.amount
                  : 0,
                true
              )
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.PAYMENTS_TO_APPLY'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances?.pagos_pendientes_por_posteo
                  ?.amount > 0
                  ? product?.productAccountBalances?.pagos_pendientes_por_posteo
                      ?.amount
                  : 0,
                true
              )
            }
          ]
        : [
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.QUOTA_ADVANCE'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances?.cupo_disponible_avances_pesos
                  ?.amount,
                true
              )
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.QUOTA_TOTAL'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances?.cupo_total?.amount,
                true
              )
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.FULL_PAYMENT'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances?.pago_total_pesos?.amount,
                true
              )
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.NEXT_PAYMENT'
              ),
              value: dateFormat(product.dueDate)
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.CUTOFF_DATE'
              ),
              value: dateFormat(product?.dueDate)
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.PURCHASES_TO_APPLY'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances
                  ?.compras_y_avances_pendientes_por_posteo?.amount > 0
                  ? product?.productAccountBalances
                      ?.compras_y_avances_pendientes_por_posteo?.amount
                  : 0,
                true
              )
            },
            {
              title: translate(
                translateService,
                'PRODUCTS.CREDIT_CARD.PAYMENTS_TO_APPLY'
              ),
              value: currencyFormat(
                currencyPipe,
                product?.productAccountBalances?.pagos_pendientes_por_posteo
                  ?.amount > 0
                  ? product?.productAccountBalances?.pagos_pendientes_por_posteo
                      ?.amount
                  : 0,
                true
              )
            }
          ];
    }
    default:
      return [];
  }
};
