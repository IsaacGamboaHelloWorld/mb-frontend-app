import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTaxCertificatesPageRoutingModule } from './new-tax-certificates-routing.module';

import { NewTaxCertificatesPage } from './new-tax-certificates.page';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocityToastModule } from '@commons/velocity/molecules/velocity-toast/velocity-toast.module';
import { VelocityWithdrawalPlaceModule } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.module';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { TaxCertificatesService } from '@modules/documents/tax-certificates/services/tax-certificates.service';
import { TaxCertificatesFacade } from '@modules/documents/tax-certificates/tax-certificates.facade';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewTaxCertificatesPageRoutingModule,
    CustomHeaderModule,
    GlobalPipesModule,
    VelocityButtonModule,
    VelocityToastModule,
    VelocityWithdrawalPlaceModule,
    VelocityModalLeaveModule
  ],
  declarations: [NewTaxCertificatesPage],
  providers: [TaxCertificatesService, TaxCertificatesFacade]
})
export class NewTaxCertificatesPageModule {}
