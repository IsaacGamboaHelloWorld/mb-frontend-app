import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificatesPageRoutingModule } from './certificates-product-detail-routing.module';

import { CertificatesProductDetailPage } from './certificates-product-detail.page';
import { CertificatesService } from '@modules/documents/certificates/services/certificates.service';
import { CertificatesFacade } from '@modules/documents/certificates/certificates.facade';
import { VelocityCardDownloadModule } from '@commons/velocity/organisms/velocity-card-download/velocity-card-download.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CertificatesPageRoutingModule,
    VelocityCardDownloadModule,
    GlobalPipesModule,
    CustomHeaderModule
  ],
  declarations: [CertificatesProductDetailPage],
  providers: [CertificatesService, CertificatesFacade]
})
export class CertificatesProductDetailModule {}
