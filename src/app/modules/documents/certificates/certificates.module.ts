import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  certificateFeatureName,
  ICertificateState
} from '@modules/documents/certificates/store/certificate.state';
import { CertificateEffect } from '@modules/documents/certificates/store/certificate.effect';
import { CertificatesService } from '@modules/documents/certificates/services/certificates.service';
import { CertificatesFacade } from '@modules/documents/certificates/certificates.facade';
import { featureCertificate } from '@modules/documents/certificates/store/certificate.reducer';
import { CertificatesRoutingModule } from '@modules/documents/certificates/certificates-routing.module';

export const FEATURE_CERTIFICATE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ICertificateState>
>('Certificate Module State');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    StoreModule.forFeature(
      certificateFeatureName,
      FEATURE_CERTIFICATE_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([CertificateEffect])
  ],
  providers: [
    CertificatesService,
    CertificatesFacade,
    {
      provide: FEATURE_CERTIFICATE_REDUCER_TOKEN,
      useValue: featureCertificate
    }
  ]
})
export class CertificatesModule {}
