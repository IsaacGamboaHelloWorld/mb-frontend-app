import { environment } from '@environment/environment';

export const LIST_URLS_BLOCK_PRODUCTS = [
  environment.api.base + environment.api.services.recharges.recharge,
  environment.api.base + environment.api.services.products.advances,
  environment.api.base + environment.api.services.products.block,
  environment.api.base + environment.api.services.transfer.new,
  environment.api.base + environment.api.services.payment.pila.payment,
  environment.api.base + environment.api.services.payment.taxes.payment,
  environment.api.base + environment.api.services.payment.payLoans,
  environment.api.base + environment.api.services.payment.payBillers
];

export const LIST_CODE_BLOCK_PRODUCTS = ['07', '20', '62'];
