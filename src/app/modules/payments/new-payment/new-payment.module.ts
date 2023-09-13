import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NewPaymentRoutingModule } from 'src/app/modules/payments/new-payment/new-payment-routing.module';
import { NewPaymentPage } from 'src/app/modules/payments/new-payment/new-payment.page';
import { HowMuchPublicComponent } from '@modules/payments/new-payment/components/how-much-public/how-much-public.component';
import { WhenComponent } from '@modules/payments/new-payment/components/when/when.component';
import { ToWhoPublicComponent } from '@modules/payments/new-payment/components/to-who-public/to-who-public.component';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { VelocitySmallCardModule } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.module';
import { VelocityServicePaymentModule } from '@commons/velocity/molecules/velocity-service-payment/velocity-service-payment.module';
import { VelocityGeneralErrorModule } from '@commons/velocity/molecules/velocity-general-error/velocity-general-error.module';
import { VelocityGeneralInformationModule } from '@commons/velocity/molecules/velocity-general-information/velocity-general-information.module';
import { ToWhoLoansComponent } from '@modules/payments/new-payment/components/to-who-loans/to-who-loans.component';
import { VelocityCardLoanModule } from '@commons/velocity/molecules/velocity-card-loan/velocity-card-loan.module';
import { HowMuchLoanComponent } from '@modules/payments/new-payment/components/how-much-loan/how-much-loan.component';
import { VelocityValueLoanModule } from '@commons/velocity/molecules/velocity-value-loan/velocity-value-loan.module';
import { VelocityTransactionCostModule } from '@commons/velocity/molecules/velocity-transaction-cost/velocity-transaction-cost.module';
import { HowMuchNotRegisteredComponent } from '@modules/payments/new-payment/components/how-much-not-registered/how-much-not-registered.component';
import { ToWhoNotRegisteredComponent } from '@modules/payments/new-payment/components/to-who-not-registered/to-who-not-registered.component';
import { AgreementFinderComponent } from '@modules/payments/new-payment/components/agreement-finder/agreement-finder.component';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { VelocityLabelTextRadioModule } from '@commons/velocity/molecules/velocity-label-text-radio/velocity-label-text-radio.module';
import { VelocityLoaderModule } from '@commons/velocity/molecules/velocity-loader/velocity-loader.module';
import { ModalCustomComponent } from '@modules/payments/new-payment/components/modal-custom/modal-custom.component';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { PaymentsModule } from '@modules/payments/payments.module';
import { InitTemplatePaymentGuard } from '@modules/payments/new-payment/guard/init-template-payment.guard';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NewPaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    VelocityButtonModule,
    GlobalPipesModule,
    GlobalDirectivesModule,
    ContErrorModule,
    VelocitySmallCardModule,
    VelocityServicePaymentModule,
    VelocityGeneralErrorModule,
    VelocityGeneralInformationModule,
    VelocityLabelTextRadioModule,
    VelocityCardLoanModule,
    VelocityValueLoanModule,
    VelocityTransactionCostModule,
    VelocityImageTitleModule,
    VelocityLoaderModule,
    VelocityModalLeaveModule,
    PaymentsModule,
    CustomHeaderModule
  ],
  providers: [PaymentsFacade, DatePipe, InitTemplatePaymentGuard],
  declarations: [
    NewPaymentPage,
    HowMuchPublicComponent,
    WhenComponent,
    ToWhoPublicComponent,
    ToWhoLoansComponent,
    HowMuchLoanComponent,
    HowMuchNotRegisteredComponent,
    ToWhoNotRegisteredComponent,
    AgreementFinderComponent,
    ModalCustomComponent
  ]
})
export class NewPaymentModule {}
