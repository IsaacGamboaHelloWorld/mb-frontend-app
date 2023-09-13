import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { NewPaymentOneStepRoutingModule } from './new-payment-one-step-routing.module';
import { NewPaymentOneStepPage } from './new-payment-one-step.page';
import { FormTaxesComponent } from '@modules/payments/new-payment-one-step/components/form-taxes/form-taxes.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { VelocitySmallCardModule } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.module';
import { VelocityTransactionCostModule } from '@commons/velocity/molecules/velocity-transaction-cost/velocity-transaction-cost.module';
import { CityFinderComponent } from '@modules/payments/new-payment-one-step/components/city-finder/city-finder.component';
import { VelocityLabelTextRadioModule } from '@commons/velocity/molecules/velocity-label-text-radio/velocity-label-text-radio.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { VelocityGeneralErrorModule } from '@commons/velocity/molecules/velocity-general-error/velocity-general-error.module';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { FormPilaComponent } from '@modules/payments/new-payment-one-step/components/form-pila/form-pila.component';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { PaymentsModule } from '@modules/payments/payments.module';
import { VelocityWithdrawalPlaceModule } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.module';
import { InitTemplatePaymentOneStepGuard } from '@modules/payments/new-payment-one-step/guard/init-template-payment-one-step.guard';

@NgModule({
  declarations: [
    NewPaymentOneStepPage,
    FormTaxesComponent,
    FormPilaComponent,
    CityFinderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CustomHeaderModule,
    VelocityButtonModule,
    VelocitySmallCardModule,
    VelocityTransactionCostModule,
    VelocityLabelTextRadioModule,
    VelocityImageTitleModule,
    VelocityGeneralErrorModule,
    VelocityTransactionCostModule,
    VelocityModalLeaveModule,
    VelocityWithdrawalPlaceModule,
    GlobalDirectivesModule,
    GlobalPipesModule,
    TranslateModule,
    ContErrorModule,
    NewPaymentOneStepRoutingModule,
    PaymentsModule
  ],
  providers: [PaymentsFacade, DatePipe, InitTemplatePaymentOneStepGuard]
})
export class NewPaymentOneStepModule {}
