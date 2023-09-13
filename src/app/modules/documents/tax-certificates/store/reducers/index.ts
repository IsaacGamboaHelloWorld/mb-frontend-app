import { combineReducers } from '@ngrx/store';

import { featureCertificateTC as certificateTC } from '@modules/documents/tax-certificates/store/reducers/certificate-tc.reducer';
import { featureCertificateGMF as certificateGMF } from '@modules/documents/tax-certificates/store/reducers/certificate-gmf.reducer';
import { featureCertificateIncomeTaxes as certificateIncomeTaxes } from '@modules/documents/tax-certificates/store/reducers/certificate-income-taxes.reducer';
import { featureCertificateRAC as certificateRAC } from '@modules/documents/tax-certificates/store/reducers/certificate-rac.reducer';

export const taxCertificatesRootReducer = combineReducers({
  certificateTC,
  certificateGMF,
  certificateIncomeTaxes,
  certificateRAC
});
