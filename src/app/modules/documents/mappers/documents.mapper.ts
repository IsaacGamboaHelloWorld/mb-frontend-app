import { Product } from '@commons/models/product.model';
import { IProductCardSmall } from '@commons/entities/products.entities';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';

export function productCardSmallMapper(product: Product): IProductCardSmall {
  const defaultInfo = {
    productName: product?.accountInformation?.productName,
    accountIdentifier: product?.accountInformation?.accountIdentifier.slice(-4)
  };
  switch (product.typeAccount) {
    case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT: {
      return {
        ...defaultInfo,
        availableBalanceLabel: this.translateService.instant(
          'BALANCE_AVAILABLE'
        ),
        availableBalance: this.currencyFormat.transform(
          product?.productAccountBalances?.saldo_disponible?.amount,
          true
        ),
        icon: 'icon-vel-money-box-b'
      };
    }
    case TYPE_ACCOUNTS.CURRENT_ACCOUNT: {
      return {
        ...defaultInfo,
        availableBalanceLabel: this.translateService.instant(
          'BALANCE_AVAILABLE'
        ),
        availableBalance: this.currencyFormat.transform(
          product?.productAccountBalances?.saldo_disponible?.amount,
          true
        ),
        icon: 'icon-vel-money-box'
      };
    }
    case TYPE_ACCOUNTS.CREDIT_CARD: {
      return {
        ...defaultInfo,
        availableBalanceLabel: this.translateService.instant(
          'PRODUCTS.CREDIT_CARD.QUOTA_AVAILABLE'
        ),
        availableBalance: this.currencyFormat.transform(
          product?.productAccountBalances?.cupo_disponible_compras_pesos
            ?.amount,
          true
        ),
        img: this.imageCdn.transform(
          this.typeCreditCard.transform(product.id).img
        )
      };
    }
  }
}
