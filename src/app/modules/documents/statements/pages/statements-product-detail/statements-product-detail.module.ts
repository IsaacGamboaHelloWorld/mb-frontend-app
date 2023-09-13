import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtractsPageRoutingModule } from './statements-product-detail-routing.module';

import { StatementsProductDetailPage } from './statements-product-detail.page';
import { VelocityCardDownloadModule } from '@commons/velocity/organisms/velocity-card-download/velocity-card-download.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { StatementsFacade } from '@modules/documents/statements/statements.facade';
import { StatementsService } from '@modules/documents/statements/services/statements.service';
import { VelocityErrorModule } from '@commons/velocity/atoms/velocity-error/velocity-error.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExtractsPageRoutingModule,
    VelocityCardDownloadModule,
    GlobalPipesModule,
    VelocityErrorModule,
    CustomHeaderModule
  ],
  declarations: [StatementsProductDetailPage],
  providers: [StatementsFacade, StatementsService]
})
export class StatementsProductDetailModule {}
