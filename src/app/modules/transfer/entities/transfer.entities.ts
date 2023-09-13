import { Product } from '@commons/models/product.model';
import { IRegisteredAccount } from '@modules/transfer/entities/registered-account.entities';

export interface INewTransferRespond {
  errorStatusCode: string;
  approvalId: string;
  errorMessage: string;
  hiddenToast?: boolean;
  specificErrorMessage: string;
  request: {
    transactionCost: string;
    companyId: string;
    id: string;
    idType: string;
    ipAddress: string;
    currentSystemDate: number;
    notes: string;
    dueDate: string;
    accountFromInformation: {
      accountIdentifier: string;
      productType: string;
      bank: string;
      bankName: string;
      name: string;
      identificationType: string;
      identificationNumber: string;
      isFavorite: boolean;
    };
    accountToInformation: {
      accountIdentifier: string;
      productType: string;
      bank: string;
      bankName: string;
      name: string;
      identificationType: string;
      identificationNumber: string;
      isFavorite: boolean;
    };
    transferInformation: {
      amount: number;
    };
    invoiceNumber: string;
    requestId: string;
    approvedChallenge: boolean;
  };
  success: boolean;
}

export interface INewTransfer {
  form: {
    account_origin: Product;
    account_destination: IRegisteredAccount;
  };
  amount: number | string;
  voucher: string;
  description: string;
  dueDate: string;
  isNew: boolean;
  scheduledTransfer: boolean;
  favorite: boolean;
}

export interface INewTransferService {
  transferInformation: {
    amount: string;
  };
  companyId: string;
  notes: string;
  accountFromInformation: {
    accountIdentifier: string;
    productType: string;
    bank?: string;
  };
  scheduledTransfer: boolean;
  approvedChallenge?: boolean;
  requestId: number;
  invoiceNumber: string;
  dueDate: string;
  transactionCost?: string;
  accountToInformation: {
    bank: string;
    isNewAccount: boolean;
    name: string;
    identificationNumber: string;
    accountIdentifier: string;
    bankName: string;
    identificationType: string;
    productType: string;
    isFavorite: boolean;
  };
}
