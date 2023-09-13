import { combineReducers } from '@ngrx/store';

import { featureQrPayment as payment } from '@modules/qr/new-payment/store/reducers/qr-payment.reducer';
import { featureQrAnnulment as annulment } from '@modules/qr/new-payment/store/reducers/qr-annulment.reducer';

export const QrRootReducer = combineReducers({
  payment,
  annulment
});
