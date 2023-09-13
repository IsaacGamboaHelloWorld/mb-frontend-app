import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewStatementsPageRoutingModule } from './new-statements-routing.module';
import { NewStatementsPage } from './new-statements.page';
import { StatementsFacade } from '@modules/documents/statements/statements.facade';
import { StatementsService } from '@modules/documents/statements/services/statements.service';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityProductCardSmallModule } from '@commons/velocity/molecules/velocity-product-card-small/velocity-product-card-small.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { VelocityToastModule } from '@commons/velocity/molecules/velocity-toast/velocity-toast.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewStatementsPageRoutingModule,
    CustomHeaderModule,
    GlobalPipesModule,
    VelocityButtonModule,
    VelocityProductCardSmallModule,
    VelocityModalLeaveModule,
    VelocityToastModule
  ],
  declarations: [NewStatementsPage],
  providers: [StatementsFacade, StatementsService]
})
export class NewStatementsPageModule {}
