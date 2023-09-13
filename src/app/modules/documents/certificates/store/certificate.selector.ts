import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  certificateFeatureName,
  ICertificateState
} from '@modules/documents/certificates/store/certificate.state';

const CertificateState = createFeatureSelector<ICertificateState>(
  certificateFeatureName
);

export const certificate = createSelector(CertificateState, (state) => state);
