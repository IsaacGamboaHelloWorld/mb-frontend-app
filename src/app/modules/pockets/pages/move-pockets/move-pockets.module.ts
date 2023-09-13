import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovePocketsPageRoutingModule } from './move-pockets-routing.module';
import { MovePocketsPage } from './move-pockets.page';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { VelocityWithdrawalPlaceModule } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { VelocitySmallCardModule } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { FormMovePocketsComponent } from './components/form-move-pockets/form-move-pockets.component';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { InitTemplateMovePocketsGuard } from '@modules/pockets/pages/move-pockets/guard/init-template-move-pocket.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MovePocketsPageRoutingModule,
    GlobalPipesModule,
    GlobalDirectivesModule,
    VelocityWithdrawalPlaceModule,
    VelocitySmallCardModule,
    VelocityButtonModule,
    ContErrorModule,
    CustomHeaderModule
  ],
  declarations: [MovePocketsPage, FormMovePocketsComponent],
  providers: [PocketsFacade, PocketsService, InitTemplateMovePocketsGuard]
})
export class MovePocketsPageModule {}
