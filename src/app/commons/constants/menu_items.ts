import {
  ACTIVE_CREDIT_CARD,
  ADVANCES,
  BIOMETRIC,
  BLOCK_CREDIT_CARD,
  CHANGE_PASSWORD,
  CONTACTS,
  HOME_DOCUMENTS,
  HOME_PAYMENT,
  HOME_TRANSFER,
  NEW_PAYMENT_NOT_REGISTERED,
  NEW_PAYMENT_PILA,
  NEW_TRANSFER_NOT_REGISTERED,
  PRODUCTS_REQUEST,
  OPEN_ACCOUNT_CUSTOM,
  PUSH_NOTIFICATION,
  QR_ANNULMENT,
  QR_PAYMENT,
  RECHARGES,
  TOTP,
  TRANSFER_WITHDRAWALS,
  EXPERIENCE
} from './navigatie-global';
import { URLS_OPEN_NEW_PRODUCT } from '@commons/constants/open-new-products';
import { environment } from '@environment/environment';
import { MinAmountTransactions } from '@commons/constants/min-amount-transactions';
import { ItemConfig } from '@commons/entities/config';
import { IGenericHomeItem } from '@commons/entities/generic-home-product-entities';

export enum ID_SECTIONS {
  advance = 'advance',
  transfer = 'transfer',
  fastTransfer = 'fastTransfer',
  transferRegistered = 'transferRegistered',
  transferNotRegistered = 'transferNotRegistered',
  programTransfers = 'programTransfers',
  cellToCell = 'transferCellToCell',
  recharge = 'recharge',
  profile = 'profile',
  contacts = 'contacts',
  registeredDevices = 'registeredDevices',
  transferWithDrawal = 'transferWithDrawal',
  qr = 'QR',
  payment = 'payment',
  paymentObligations = 'paymentObligations',
  paymentRegistered = 'paymentRegistered',
  paymentNotRegistered = 'paymentNotRegistered',
  paymentPila = 'paymentPila',
  paymentTaxes = 'paymentTaxes',
  certificate = 'certificate',
  taxCertificates = 'taxCertificates',
  certificateTC = 'certificateTC',
  statement = 'statement',
  pockets = 'pockets',
  blockingProducts = 'blockingProducts',
  documents = 'documents',
  requestProducts = 'requestProducts',
  experience = 'experience'
}

export const NOT_COMPLEMENTARY_ITEMS: string[] = [
  ID_SECTIONS.recharge,
  ID_SECTIONS.transferNotRegistered,
  ID_SECTIONS.transferWithDrawal,
  ID_SECTIONS.paymentNotRegistered,
  ID_SECTIONS.paymentPila,
  ID_SECTIONS.advance
];

export const NOT_COMPLEMENTARY_URLS: any[] = [
  {
    url: ADVANCES,
    id: ID_SECTIONS.advance
  },
  {
    url: NEW_PAYMENT_PILA,
    id: ID_SECTIONS.paymentPila
  },
  {
    url: NEW_TRANSFER_NOT_REGISTERED,
    id: ID_SECTIONS.transferNotRegistered
  },
  {
    url: RECHARGES,
    id: ID_SECTIONS.recharge
  },
  {
    url: TRANSFER_WITHDRAWALS,
    id: ID_SECTIONS.transferWithDrawal
  },
  {
    url: NEW_PAYMENT_NOT_REGISTERED,
    id: ID_SECTIONS.paymentNotRegistered
  }
];

export interface IMenuItem {
  icon: string;
  text: string;
  id?: string;
  path: string[] | string;
  state: boolean;
  minAmount: number;
  hasPermissions?: boolean;
  enable: boolean;
  open?: boolean;
  children?: ISubMenuItem[];
}

export interface ISubMenuItem {
  text: string;
  path: string;
  id?: string;
  enable?: boolean;
  hasPermissions?: boolean;
  externalUrl?: boolean;
}

export const HIDDEN_NAV_BAR = [];

export const TRANSFER_WITHDRAWAL: IMenuItem = {
  icon: 'icon-vel-money',
  text: 'NAV_BAR_ITEMS.MONEY_ORDER',
  id: ID_SECTIONS.transferWithDrawal,
  path: [
    TRANSFER_WITHDRAWALS,
    OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.WITHDRAWAL,
    EXPERIENCE
  ],
  state: false,
  minAmount: MinAmountTransactions.transferWithdrawal,
  enable: true,
  hasPermissions: true
};

export const RECHARGE_PHONE: IMenuItem = {
  icon: 'icon-vel-smartphone',
  text: 'NAV_BAR_ITEMS.RECHARGE_PHONE',
  id: ID_SECTIONS.recharge,
  path: [
    RECHARGES,
    OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.RECHARGE,
    EXPERIENCE
  ],
  state: false,
  minAmount: MinAmountTransactions.recharge,
  enable: true,
  hasPermissions: true
};

export const PAY: IMenuItem = {
  icon: 'icon-vel-money-circle',
  text: 'NAV_BAR_ITEMS.PAY',
  id: ID_SECTIONS.payment,
  path: [
    HOME_PAYMENT,
    OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.PAYMENT,
    null
  ],
  state: false,
  minAmount: MinAmountTransactions.payment,
  enable: true,
  hasPermissions: true
};

export const TRANSFER: IMenuItem = {
  icon: 'icon-vel-arrow-left-right',
  text: 'NAV_BAR_ITEMS.TRANSFER',
  id: ID_SECTIONS.transfer,
  path: [
    HOME_TRANSFER,
    OPEN_ACCOUNT_CUSTOM + URLS_OPEN_NEW_PRODUCT.TRANSFER,
    null
  ],
  state: false,
  minAmount: MinAmountTransactions.transfer,
  enable: true,
  hasPermissions: true
};

export const PROFILE_MENU: IMenuItem = {
  icon: 'icon-vel-user-smile',
  text: 'SIDE_MENU.PROFILE.TITLE',
  path: null,
  id: ID_SECTIONS.profile,
  state: false,
  minAmount: 0,
  enable: true,
  children: []
};

export const securityItems = (
  addBiometric: boolean = false,
  itemConfig: ItemConfig[] = [],
  hasComplementary: boolean = false
): IMenuItem => ({
  icon: 'icon-vel-lock',
  text: 'SIDE_MENU.SECURITY.TITLE',
  path: null,
  state: false,
  minAmount: 0,
  enable: true,
  open: false,
  children: ValidateEnableItems(
    [
      ...(!hasComplementary
        ? [
            {
              text: 'SIDE_MENU.SECURITY.SUBMENU.EXPERIENCE',
              path: EXPERIENCE,
              enable: true
            }
          ]
        : []),
      {
        text: 'SIDE_MENU.SECURITY.SUBMENU.PUSH_NOTIFICATION',
        path: PUSH_NOTIFICATION,
        enable: true
      },
      {
        text: 'SIDE_MENU.SECURITY.SUBMENU.CHANGE_PASSWORD',
        path: CHANGE_PASSWORD,
        enable: true
      },
      ...(addBiometric
        ? [
            {
              text: 'SIDE_MENU.SECURITY.SUBMENU.CONFIG_FINGERPRINT',
              path: BIOMETRIC,
              enable: true,
              id: 'HomeMenuSeguridad_href_configurarHuella'
            }
          ]
        : []),
      {
        text: 'SIDE_MENU.SECURITY.SUBMENU.BLOCKING_PRODUCTS',
        path: BLOCK_CREDIT_CARD,
        enable: true,
        id: ID_SECTIONS.blockingProducts
      },
      {
        text: 'SIDE_MENU.SECURITY.SUBMENU.ACTIVATE_PRODUCTS',
        path: ACTIVE_CREDIT_CARD,
        enable: true
      },
      ...(environment.showTotp
        ? [
            {
              text: 'totp',
              path: TOTP,
              enable: true
            }
          ]
        : [])
    ],
    itemConfig
  ) as ISubMenuItem[]
});

export const DOCUMENTS_MENU: IMenuItem = {
  icon: 'icon-vel-essential-list-12',
  text: 'SIDE_MENU.DOCUMENTS.TITLE',
  path: HOME_DOCUMENTS,
  id: ID_SECTIONS.documents,
  state: false,
  minAmount: 0,
  enable: true,
  children: []
};

export const REQUEST_PRODUCTS: IMenuItem = {
  icon: 'icon-vel-essential-folder-10',
  text: 'SIDE_MENU.REQUEST_PRODUCTS.TITLE',
  path: PRODUCTS_REQUEST,
  id: ID_SECTIONS.requestProducts,
  state: false,
  minAmount: 0,
  enable: true,
  children: []
};

export const INFORMATION_MENU: IMenuItem = {
  icon: 'icon-vel-information',
  text: 'SIDE_MENU.INFORMATION.TITLE',
  path: null,
  state: false,
  minAmount: 0,
  enable: true,
  open: false,
  children: [
    {
      text: 'SIDE_MENU.INFORMATION.SUBMENU.CONTACT',
      path: CONTACTS,
      enable: true
    },
    {
      text: 'SIDE_MENU.INFORMATION.SUBMENU.TERMS',
      path: environment.terms,
      enable: true,
      externalUrl: true
    }
  ]
};

export const ValidateEnableItems = (
  items: (IMenuItem | ISubMenuItem | IGenericHomeItem)[] = [],
  itemConfig: ItemConfig[] = [],
  complementary: boolean = true
): (IMenuItem | ISubMenuItem | IGenericHomeItem)[] =>
  items.map((item) => {
    item.hasPermissions =
      complementary || !environment.validateComplementary
        ? true
        : !NOT_COMPLEMENTARY_ITEMS.includes(item.id);
    item.path = item.hasPermissions ? item.path : EXPERIENCE;
    itemConfig.forEach((itemConf) => {
      if (item.id === itemConf?.id) {
        item.enable = itemConf?.enabled;
        item.path = !itemConf.enabled ? null : item.path;
      }
    });
    return item;
  });
