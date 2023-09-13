import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ITaxCertificatesState,
  taxCertificatesFeatureName
} from '@modules/documents/tax-certificates/store/tax-certificates.state';

const taxCertificatesState = createFeatureSelector<ITaxCertificatesState>(
  taxCertificatesFeatureName
);

export const certificateTc = createSelector(
  taxCertificatesState,
  (state) => state.certificateTC
);

export const certificateGMF = createSelector(
  taxCertificatesState,
  (state) => state.certificateGMF
);

export const certificateIncomeTaxes = createSelector(
  taxCertificatesState,
  (state) => state.certificateIncomeTaxes
);

export const certificateRAC = createSelector(
  taxCertificatesState,
  (state) => state.certificateRAC
);
