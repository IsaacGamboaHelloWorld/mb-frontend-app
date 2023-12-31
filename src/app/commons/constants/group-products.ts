import { TYPE_ACCOUNTS } from '@commons/constants/types_account';

export const GROUP_ONE = [
  TYPE_ACCOUNTS.DEPOSIT_ACCOUNT,
  TYPE_ACCOUNTS.CURRENT_ACCOUNT
];

export const GROUP_TWO = [
  TYPE_ACCOUNTS.DEPOSIT_ACCOUNT,
  TYPE_ACCOUNTS.CURRENT_ACCOUNT,
  TYPE_ACCOUNTS.CREDIT_CARD
];

export const PRODUCTS_WITH_HIDDEN_ID: string[] = [
  TYPE_ACCOUNTS.DEPOSIT_ACCOUNT,
  TYPE_ACCOUNTS.CURRENT_ACCOUNT
];

export const INITIAL_STATE_HIDDEN_ID: boolean = false;
