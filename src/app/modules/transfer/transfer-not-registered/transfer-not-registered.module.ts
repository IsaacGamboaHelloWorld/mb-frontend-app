import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { TransferNotRegisteredPageRoutingModule } from '@modules/transfer/transfer-not-registered/transfer-not-registered-routing.module';
import { InitTemplateGuard } from '@modules/transfer/transfer-not-registered/guard/init-template.guard';
import { TransferNotRegisteredPage } from '@modules/transfer/transfer-not-registered/transfer-not-registered.page';
import { TransferModule } from '@modules/transfer/transfer.module';
import { ToWhoNotRegisteredComponent } from '@modules/transfer/transfer-not-registered/components/to-who-not-registered/to-who-not-registered.component';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { VelocitySmallCardModule } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { VelocityLabelRadioModule } from '@commons/velocity/molecules/velocity-label-radio/velocity-label-radio.module';
import { VelocityTransactionCostModule } from '@commons/velocity/molecules/velocity-transaction-cost/velocity-transaction-cost.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { StepGuard } from '@commons/velocity/templates/utils/guards/step.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CustomHeaderModule,
    TranslateModule,
    TransferNotRegisteredPageRoutingModule,
    GlobalPipesModule,
    GlobalDirectivesModule,
    VelocitySmallCardModule,
    ContErrorModule,
    VelocityLabelRadioModule,
    VelocityTransactionCostModule,
    VelocityButtonModule,
    TransferModule
  ],
  declarations: [TransferNotRegisteredPage, ToWhoNotRegisteredComponent],
  providers: [InitTemplateGuard, StepGuard]
})
export class TransferNotRegisteredPageModule {}
