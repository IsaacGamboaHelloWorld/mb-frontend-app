import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaxCertificatesRoutingModule } from '@modules/documents/tax-certificates/tax-certificates-routing.module';
import {
  ICertificateTCState,
  taxCertificatesFeatureName
} from '@modules/documents/tax-certificates/store/tax-certificates.state';
import { TaxCertificatesEffect } from '@modules/documents/tax-certificates/store/tax-certificates.effect';
import { TaxCertificatesService } from '@modules/documents/tax-certificates/services/tax-certificates.service';
import { TaxCertificatesFacade } from '@modules/documents/tax-certificates/tax-certificates.facade';
import { taxCertificatesRootReducer } from '@modules/documents/tax-certificates/store/reducers';

export const FEATURE_TAX_CERTIFICATES_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ICertificateTCState>
>('Certificate TC Module State');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaxCertificatesRoutingModule,
    StoreModule.forFeature(
      taxCertificatesFeatureName,
      FEATURE_TAX_CERTIFICATES_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([TaxCertificatesEffect])
  ],
  providers: [
    TaxCertificatesService,
    TaxCertificatesFacade,
    {
      provide: FEATURE_TAX_CERTIFICATES_REDUCER_TOKEN,
      useValue: taxCertificatesRootReducer
    }
  ]
})
export class TaxCertificatesModule {}
