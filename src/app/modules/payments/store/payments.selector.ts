import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  IPaymentsState,
  paymentsFeatureName
} from '@modules/payments/store/payments.state';

const paymentsState = createFeatureSelector<IPaymentsState>(
  paymentsFeatureName
);

export const listBiller = createSelector(
  paymentsState,
  (state: IPaymentsState) => state.billersList
);

export const paymentBiller = createSelector(
  paymentsState,
  (state: IPaymentsState) => state.billersPayment
);

export const detailBiller = createSelector(
  paymentsState,
  (state: IPaymentsState) => state.billersDetail
);

export const barcodeBiller = createSelector(
  paymentsState,
  (state: IPaymentsState) => state.billersBarcode
);

export const searchBiller = createSelector(
  paymentsState,
  (state: IPaymentsState) => state.billersSearch
);

export const registeredLoans = createSelector(
  paymentsState,
  (state: IPaymentsState) => state.loansRegistered
);

export const paymentLoan = createSelector(
  paymentsState,
  (state: IPaymentsState) => state.loansPayment
);

export const taxesCities = createSelector(
  paymentsState,
  (state: IPaymentsState) => state?.taxesCities
);

export const taxesAgreements = createSelector(
  paymentsState,
  (state: IPaymentsState) => state?.taxesAgreements
);

export const taxesAmountReference = createSelector(
  paymentsState,
  (state: IPaymentsState) => state?.taxesAmountReference
);

export const taxesPayment = createSelector(
  paymentsState,
  (state: IPaymentsState) => state?.taxesPayment
);

export const pilaAgreements = createSelector(
  paymentsState,
  (state: IPaymentsState) => state?.pilaAgreements
);

export const pilaInformation = createSelector(
  paymentsState,
  (state: IPaymentsState) => state?.pilaInformation
);

export const pilaPayment = createSelector(
  paymentsState,
  (state: IPaymentsState) => state?.pilaPayment
);
