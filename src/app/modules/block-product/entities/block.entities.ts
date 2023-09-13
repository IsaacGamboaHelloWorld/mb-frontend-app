import { IAccountType } from '@commons/entities/products.entities';

export interface IBlockProductBody {
  accountId: string;
  accountType: string;
  companyId: string;
  refType: string;
}

export interface IBlockProductService {
  hiddenToast: boolean;
  success: boolean;
  errorMessage: string;
}

export interface IDebitCardListService {
  debitCards: DebitCard[];
  success: boolean;
  errorMessage: string;
}

export interface DebitCard {
  account: AccountInformation;
  card: DebitCardInformation;
  accountInformation?: IAccountType;
}

export interface AccountInformation {
  accountId: string;
  accountType: string;
  bank: string;
}

export interface DebitCardInformation {
  cardId: string;
  cardType: string;
}
