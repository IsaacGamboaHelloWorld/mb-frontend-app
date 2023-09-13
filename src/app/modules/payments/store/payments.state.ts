import {
  IAgreement,
  IBillerDetail,
  IBillerPaymentBarcode,
  IPaymentBills,
  IPaymentBillsResp
} from '@modules/payments/entities/billers.entities';
import {
  ILoanPayment,
  IRegisteredLoan
} from '@modules/payments/entities/loans.entities';
import {
  ITaxesAgreement,
  ITaxesAmountReferenceResponse,
  ITaxesCity,
  ITaxesPaymentResponse
} from '@modules/payments/entities/tax-payment.entities';
import {
  IPilaAgreement,
  IPilaInformationResponse,
  IPilaPaymentResponse
} from '@modules/payments/entities/pila-payment.entities';

export const paymentsFeatureName = 'paymentsModuleState';

export interface IListBillerState {
  information: IPaymentBills[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ISearchBillerState {
  information: IAgreement[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IDetailBillerState {
  information: IBillerDetail;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IBarcodeBillerState {
  information: IBillerPaymentBarcode;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ILoanPaymentState {
  information: ILoanPayment;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IRegisteredLoansState {
  information: IRegisteredLoan[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPayBillerState {
  information: IPaymentBillsResp;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ITaxesCitiesState {
  listCities: ITaxesCity[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ITaxesAgreementsState {
  taxesAgreements: ITaxesAgreement[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ITaxesAmountReferenceState {
  amountReference: ITaxesAmountReferenceResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ITaxesPaymentState {
  response: ITaxesPaymentResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPilaAgreementsState {
  agreementsAvailable: IPilaAgreement[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPilaInformationState {
  information: IPilaInformationResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPilaPaymentState {
  response: IPilaPaymentResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPaymentsState {
  billersList: IListBillerState;
  billersPayment: IPayBillerState;
  billersDetail: IDetailBillerState;
  billersSearch: ISearchBillerState;
  billersBarcode: IBarcodeBillerState;
  loansRegistered: IRegisteredLoansState;
  loansPayment: ILoanPaymentState;
  taxesCities: ITaxesCitiesState;
  taxesAgreements: ITaxesAgreementsState;
  taxesAmountReference: ITaxesAmountReferenceState;
  taxesPayment: ITaxesPaymentState;
  pilaAgreements: IPilaAgreementsState;
  pilaInformation: IPilaInformationState;
  pilaPayment: IPilaPaymentState;
}
