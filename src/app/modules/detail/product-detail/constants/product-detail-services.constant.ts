import { ID_SECTIONS } from '@commons/constants/menu_items';

export const PRODUCT_DETAIL_TYPE_SERVICES = {
  WITHDRAWN_WITHOUT_CARD: {
    type: 'WITHDRAWN_WITHOUT_CARD',
    img: 'icon-vel-wallet',
    id: ID_SECTIONS.transferWithDrawal
  },
  PAYMENT_OBLIGATION: {
    type: 'PAYMENT',
    img: 'icon-vel-money-circle',
    id: ID_SECTIONS.payment
  },
  PAYMENT_OBLIGATION_CREDIT_CARD: {
    type: 'PAYMENT_OBLIGATION',
    img: 'icon-vel-money-circle',
    id: ID_SECTIONS.paymentObligations
  },
  TRANSFER_ACCOUNTS: {
    type: 'TRANSFER_ACCOUNTS',
    img: 'icon-vel-arrow-left-right',
    id: ID_SECTIONS.transfer
  },
  MOBILE_RECHARGES: {
    type: 'MOBILE_RECHARGES',
    img: 'icon-vel-smartphone',
    id: ID_SECTIONS.recharge
  },
  POCKETS: {
    type: 'POCKETS',
    img: 'icon-vel-money-box',
    id: ID_SECTIONS.pockets
  },
  STATEMENT: {
    type: 'STATEMENT',
    img: 'icon-vel-file-text-money',
    id: ID_SECTIONS.statement
  },
  CERTIFICATE: {
    type: 'CERTIFICATE',
    img: 'icon-vel-file-text-line',
    id: ID_SECTIONS.certificate
  },
  CERTIFICATE_TC: {
    type: 'CERTIFICATE_TC',
    img: 'icon-vel-file-text-line',
    id: ID_SECTIONS.certificateTC
  },
  PAYMENT_CARD: {
    type: 'PAYMENT_CARD',
    img: 'icon-vel-money-square',
    id: ID_SECTIONS.payment
  },
  ADVANCE: {
    type: 'ADVANCE',
    img: 'icon-vel-money',
    id: ID_SECTIONS.advance
  }
};
