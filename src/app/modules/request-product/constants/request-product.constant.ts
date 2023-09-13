export interface IRequestProductCardItem {
  icon: string;
  name: string;
  iconType: string;
  enabled: boolean;
  value: string;
}

export const REQUEST_PRODUCTS_DEPOSIT_ACCOUNT: IRequestProductCardItem = {
  icon: 'icon-vel-money-box-b',
  name: 'PRODUCT_TYPES.DEPOSIT_ACCOUNT',
  iconType: 'success',
  enabled: true,
  value: 'DEPOSIT_ACCOUNT'
};

export const REQUEST_PRODUCTS_CREDIT_CARD: IRequestProductCardItem = {
  icon: 'icon-vel-payments-finance-credit-card-8',
  name: 'PRODUCT_TYPES.CREDIT_CARD',
  iconType: 'success',
  enabled: true,
  value: 'CREDIT_CARD'
};

export const REQUEST_PRODUCTS_ITEMS: IRequestProductCardItem[] = [
  REQUEST_PRODUCTS_DEPOSIT_ACCOUNT,
  REQUEST_PRODUCTS_CREDIT_CARD
];
