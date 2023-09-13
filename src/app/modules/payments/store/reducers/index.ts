import { combineReducers } from '@ngrx/store';

import { featureListBillerTransfer as billersList } from '@modules/payments/store/reducers/billers-list.reducer';
import { featurePayBillerTransfer as billersPayment } from '@modules/payments/store/reducers/billers-payment.reducer';
import { featureRegisteredLoans as loansRegistered } from '@modules/payments/store/reducers/loans-registered.reducer';
import { featurePaymentLoan as loansPayment } from '@modules/payments/store/reducers/loans-payment.reducer';
import { featureDetailBiller as billersDetail } from '@modules/payments/store/reducers/billers-detail.reducer';
import { featureSearchBiller as billersSearch } from '@modules/payments/store/reducers/billers-search.reducer';
import { featureBarcodeBiller as billersBarcode } from '@modules/payments/store/reducers/billers-barcode.reducer';
import { featureTaxesCities as taxesCities } from '@modules/payments/store/reducers/taxes-cities.reducer';
import { featureTaxesAgreements as taxesAgreements } from '@modules/payments/store/reducers/taxes-agreements.reducer';
import { featureTaxesAmountReference as taxesAmountReference } from '@modules/payments/store/reducers/taxes-amount-reference.reducer';
import { featureTaxesPayment as taxesPayment } from '@modules/payments/store/reducers/taxes-payment.reducer';
import { featurePilaAgreements as pilaAgreements } from '@modules/payments/store/reducers/pila-agreements.reducer';
import { featurePilaInformation as pilaInformation } from '@modules/payments/store/reducers/pila-information.reducer';
import { featurePilaPayment as pilaPayment } from '@modules/payments/store/reducers/pila-payment.reducer';

export const paymentsRootReducer = combineReducers({
  billersList,
  billersPayment,
  loansRegistered,
  loansPayment,
  billersDetail,
  billersSearch,
  billersBarcode,
  taxesCities,
  taxesAgreements,
  taxesAmountReference,
  taxesPayment,
  pilaAgreements,
  pilaInformation,
  pilaPayment
});
