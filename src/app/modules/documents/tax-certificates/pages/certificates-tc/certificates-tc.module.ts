import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CertificatesTcPageRoutingModule } from './certificates-tc-routing.module';

import { CertificatesTcPage } from './certificates-tc.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { TaxCertificatesService } from '@modules/documents/tax-certificates/services/tax-certificates.service';
import { TaxCertificatesFacade } from '@modules/documents/tax-certificates/tax-certificates.facade';
import { VelocityCardDownloadModule } from '@commons/velocity/organisms/velocity-card-download/velocity-card-download.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CertificatesTcPageRoutingModule,
    GlobalPipesModule,
    CustomHeaderModule,
    VelocityCardDownloadModule
  ],
  declarations: [CertificatesTcPage],
  providers: [TaxCertificatesService, TaxCertificatesFacade]
})
export class CertificatesTcPageModule {}
