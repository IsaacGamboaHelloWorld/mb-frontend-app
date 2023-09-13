import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  IQrState,
  qrFeatureName
} from '@modules/qr/new-payment/store/qr.state';

const QrState = createFeatureSelector<IQrState>(qrFeatureName);
export const qrPayment = createSelector(QrState, (state) => state.payment);
export const qrAnnulment = createSelector(QrState, (state) => state.annulment);
