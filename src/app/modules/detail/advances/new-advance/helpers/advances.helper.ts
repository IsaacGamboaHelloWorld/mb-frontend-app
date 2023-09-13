import { ADVANCE_LIMITS } from '@commons/constants/global';
import { Product } from '@commons/models/product.model';

export function advanceAmountLimit(product: Product): number {
  if (!!product?.productAccountBalances) {
    return product?.productAccountBalances?.cupo_disponible_avances_pesos
      ?.amount >= ADVANCE_LIMITS.MAX
      ? ADVANCE_LIMITS.MAX
      : product?.productAccountBalances?.cupo_disponible_avances_pesos?.amount;
  } else {
    return 0;
  }
}
