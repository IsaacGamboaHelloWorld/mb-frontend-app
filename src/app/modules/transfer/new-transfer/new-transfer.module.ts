import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NewTransferPage } from '@modules/transfer/new-transfer/new-transfer.page';
import { NewTransferRoutingModule } from '@modules/transfer/new-transfer/new-transfer-routing.module';
import { ToWhoComponent } from '@modules/transfer/new-transfer/components/to-who/to-who.component';
import { WhenComponent } from '@modules/transfer/new-transfer/components/when/when.component';
import { HowMuchComponent } from '@modules/transfer/new-transfer/components/how-much/how-much.component';
import { NewTransferService } from '@modules/transfer/services/transfer.service';
import { RegisteredAccountService } from '@modules/transfer/services/registered-account.service';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { VelocitySmallCardModule } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.module';
import { VelocityBoxInputModule } from '@commons/velocity/molecules/velocity-box-input/velocity-box-input.module';
import { VelocityTransactionCostModule } from '@commons/velocity/molecules/velocity-transaction-cost/velocity-transaction-cost.module';
import { VelocityTypeBankModule } from '@commons/velocity/molecules/velocity-type-bank/velocity-type-bank.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityGeneralErrorModule } from '@commons/velocity/molecules/velocity-general-error/velocity-general-error.module';
import { VelocityGeneralInformationModule } from '@commons/velocity/molecules/velocity-general-information/velocity-general-information.module';
import { ToWhoNotRegisteredComponent } from '@modules/transfer/new-transfer/components/to-who-not-registered/to-who-not-registered.component';
import { VelocityLabelRadioModule } from '@commons/velocity/molecules/velocity-label-radio/velocity-label-radio.module';
import { InitTemplateTransferGuard } from '@modules/transfer/new-transfer/guard/init-template-transfer.guard';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { TransferModule } from '@modules/transfer/transfer.module';

@NgModule({
  declarations: [
    NewTransferPage,
    ToWhoComponent,
    WhenComponent,
    HowMuchComponent,
    ToWhoNotRegisteredComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NewTransferRoutingModule,
    ReactiveFormsModule,
    VelocityButtonModule,
    TranslateModule,
    GlobalDirectivesModule,
    GlobalPipesModule,
    ContErrorModule,
    VelocitySmallCardModule,
    VelocityBoxInputModule,
    VelocityTransactionCostModule,
    VelocityTypeBankModule,
    VelocityGeneralErrorModule,
    VelocityGeneralInformationModule,
    VelocityLabelRadioModule,
    CustomHeaderModule,
    TransferModule
  ],
  providers: [
    NewTransferService,
    RegisteredAccountService,
    NewTransferFacade,
    InitTemplateTransferGuard
  ]
})
export class NewTransferModule {}
