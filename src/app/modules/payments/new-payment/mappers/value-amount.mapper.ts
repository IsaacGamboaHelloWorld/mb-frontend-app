import { LOAN_TYPES_VALUE } from '@modules/payments/new-payment/constants/loans.contant';
import { Product } from '@commons/models/product.model';

export const amountHowMuchLoan = (type: string, product: Product): object => {
  let amount: object;
  switch (type) {
    case LOAN_TYPES_VALUE.MIN:
      amount = {
        value: 0,
        normal: product?.productAccountBalances?.valor_pago_minimo?.amount || 0
      };
      break;
    case LOAN_TYPES_VALUE.TOTAL:
      amount = {
        value: 0,
        normal: product?.productAccountBalances?.pago_total_pesos?.amount || 0
      };
      break;
    default:
      amount = { value: 0, normal: 0 };
      break;
  }
  return amount;
};
