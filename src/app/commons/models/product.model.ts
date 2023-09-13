import {
  IAccountBalance,
  IAccountType
} from '@commons/entities/products.entities';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';

export class Product {
  accountInformation?: IAccountType;
  status?: string;
  openedDate?: string;
  closedDate?: string;
  dueDate?: string;
  overDraftDays?: string;
  term?: {
    units: string;
    count: number | string;
  };
  periodicityOfPayment?: string;
  capacity?: number;
  couldHavePockets?: boolean;
  productAccountBalances?: {
    cupo_disponible_compras_pesos: IAccountBalance;
    cupo_disponible_avances_pesos: IAccountBalance;
    compras_y_avances_pendientes_por_posteo: IAccountBalance;
    pagos_pendientes_por_posteo: IAccountBalance;
    pago_total: IAccountBalance;
    pago_total_pesos: IAccountBalance;
    saldo_mora_pesos: IAccountBalance;
    valor_pago_minimo: IAccountBalance;
    saldo_canje_48_horas: IAccountBalance;
    saldo_ayer: IAccountBalance;
    cupo_total: IAccountBalance;
    cupo_disponible_sobregiro: IAccountBalance;
    saldo_disponible: IAccountBalance;
    cupos_aprobado_sobregiro: IAccountBalance;
    saldo_pendiente_pago: IAccountBalance;
    saldo_canje_72_horas: IAccountBalance;
    saldo_canje_24_horas: IAccountBalance;
    saldo_canje: IAccountBalance;
    saldo_actual: IAccountBalance;
    cupo_aprobado_remesas: IAccountBalance;
    valor_constitucion: IAccountBalance;
    intereses_causados: IAccountBalance;
    tasa_nominal: IAccountBalance;
    cupo_disponible_compras: IAccountBalance;
  };
  pocketsInformation?: {
    totalSavedOnPockets: string;
  };
  success?: boolean;
  errorMessage?: string;
  didAthCall?: boolean;
  loading?: boolean;
  completed?: boolean;
  error?: boolean;
  id?: string;
  typeAccount?: string;
  enabled?: boolean;
  nameAccount?: string;
  nameSmall?: string;
  hiddenIdStatus?: boolean;
  showHiddenId?: boolean;

  public static getMinimumPayment(product: Product): number {
    return !isNullOrUndefined(
      product?.productAccountBalances?.valor_pago_minimo
    )
      ? product.productAccountBalances?.valor_pago_minimo?.amount
      : 0;
  }
}
