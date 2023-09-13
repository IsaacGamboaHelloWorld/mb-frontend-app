import { environment } from '@environment/environment';
import { HOME } from '@commons/constants/navigatie-global';

export const REQUEST_CREDIT_CARD = {
  title: 'OPEN_ACCOUNT_SCREEN.REQUEST_NEW_CREDIT_CARD.TITLE',
  text: 'OPEN_ACCOUNT_SCREEN.REQUEST_NEW_CREDIT_CARD.TEXT',
  btn: 'OPEN_ACCOUNT_SCREEN.REQUEST_NEW_CREDIT_CARD.BTN',
  img: '/new-tc-image.png',
  url: environment.external_url.request_credit_card,
  isExternal: true
};

export const REQUEST_DEPOSIT_ACCOUNT = {
  title: 'OPEN_ACCOUNT_SCREEN.REQUEST_DEPOSIT_ACCOUNT.TITLE',
  text: 'OPEN_ACCOUNT_SCREEN.REQUEST_DEPOSIT_ACCOUNT.TEXT',
  btn: 'OPEN_ACCOUNT_SCREEN.REQUEST_DEPOSIT_ACCOUNT.BTN',
  img: '/retiros-image.png',
  url: '',
  baseUrl: environment.external_url.openDepositAccount,
  isExternal: true
};

export const REQUEST_TRANSFER = {
  title: 'NEW_TRANSFER.OPEN_ACCOUNT.TITLE',
  text: 'NEW_TRANSFER.OPEN_ACCOUNT.TEXT',
  btn: 'NEW_TRANSFER.OPEN_ACCOUNT.BTN',
  img: '/transferencias-image.png',
  url: environment.external_url.recharge,
  isExternal: true
};

export const REQUEST_RECHARGE = {
  title: 'RECHARGE.OPEN_ACCOUNT.TITLE',
  text: 'RECHARGE.OPEN_ACCOUNT.TEXT',
  btn: 'RECHARGE.OPEN_ACCOUNT.BTN',
  img: '/recharge-empty.png',
  url: environment.external_url.recharge,
  isExternal: true
};

export const REQUEST_PAYMENT = {
  title: 'PAYMENT.OPEN_ACCOUNT.TITLE',
  text: 'PAYMENT.OPEN_ACCOUNT.TEXT',
  btn: 'PAYMENT.OPEN_ACCOUNT.BTN',
  img: '/pagos-image.png',
  url: environment.external_url.recharge,
  isExternal: true
};

export const REQUEST_QR = {
  title: 'QR.OPEN_ACCOUNT.TITLE',
  subTitle: 'QR.OPEN_ACCOUNT.SUB_TITLE',
  text: 'QR.OPEN_ACCOUNT.TEXT',
  img: '/new-tc-image.png'
};

export const NOT_COMPLEMENTARY_PAGE = {
  title: 'NOT_COMPLEMENTARY.TITLE',
  text: 'NOT_COMPLEMENTARY.DESCRIPTION',
  btn: 'UNDERSTOOD',
  img: '/not-complementary.png',
  url: HOME,
  isExternal: false
};

export const REQUEST_WITHDRAWAL = {
  title: 'TRANSFER_WITHDRAWAL.OPEN_ACCOUNT.TITLE',
  text: 'TRANSFER_WITHDRAWAL.OPEN_ACCOUNT.TEXT',
  btn: 'TRANSFER_WITHDRAWAL.OPEN_ACCOUNT.BTN',
  img: '/retiros-image.png',
  url: environment.external_url.recharge,
  isExternal: true
};

export enum URLS_OPEN_NEW_PRODUCT {
  TRANSFER = 'transferencia',
  ADVANCE = 'avance',
  RECHARGE = 'recarga',
  PAYMENT = 'pago',
  WITHDRAWAL = 'giros-retiros',
  ACTIVATE_CREDIT_CARD = 'activacion-tarjeta-credito',
  QR = 'pago-qr'
}
