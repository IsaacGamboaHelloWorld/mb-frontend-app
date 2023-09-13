import {
  DOCUMENTS_MENU,
  IMenuItem,
  INFORMATION_MENU,
  PAY,
  PROFILE_MENU,
  RECHARGE_PHONE,
  securityItems,
  TRANSFER,
  TRANSFER_WITHDRAWAL,
  ValidateEnableItems,
  REQUEST_PRODUCTS
} from './menu_items';
import { ItemConfig } from '@commons/entities/config';

export const sideMenu = (
  itemConfig: ItemConfig[] = [],
  addBiometric: boolean = false,
  hasComplementary: boolean = false
): IMenuItem[] =>
  ValidateEnableItems(
    [
      PROFILE_MENU,
      securityItems(addBiometric, itemConfig, hasComplementary),
      DOCUMENTS_MENU,
      REQUEST_PRODUCTS,
      INFORMATION_MENU
    ],
    itemConfig
  ) as IMenuItem[];

export const NAV_BAR_ITEMS: IMenuItem[] = [
  TRANSFER_WITHDRAWAL,
  RECHARGE_PHONE,
  PAY,
  TRANSFER
];
