import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCertificatesPageRoutingModule } from './new-certificates-routing.module';

import { NewCertificatesPage } from './new-certificates.page';
import { CertificatesFacade } from '@modules/documents/certificates/certificates.facade';
import { CertificatesService } from '@modules/documents/certificates/services/certificates.service';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocityProductCardSmallModule } from '@commons/velocity/molecules/velocity-product-card-small/velocity-product-card-small.module';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewCertificatesPageRoutingModule,
    CustomHeaderModule,
    GlobalPipesModule,
    VelocityButtonModule,
    VelocityProductCardSmallModule,
    VelocityModalLeaveModule
  ],
  declarations: [NewCertificatesPage],
  providers: [CertificatesFacade, CertificatesService]
})
export class NewCertificatesPageModule {}
