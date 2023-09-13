import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditPocketsPageRoutingModule } from './edit-pockets-routing.module';
import { EditPocketsPage } from './edit-pockets.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityBoxInputModule } from '@commons/velocity/molecules/velocity-box-input/velocity-box-input.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { VelocityOperatorModule } from '@commons/velocity/molecules/velocity-operator/velocity-operator.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { VelocityWithdrawalPlaceModule } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { FormEditPocketsComponent } from './components/form-edit-pockets/form-edit-pockets.component';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { InitTemplateEditPocketsGuard } from '@modules/pockets/pages/edit-pockets/guard/init-template-edit-pocket.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditPocketsPageRoutingModule,
    GlobalPipesModule,
    GlobalDirectivesModule,
    VelocityBoxInputModule,
    VelocityOperatorModule,
    VelocityWithdrawalPlaceModule,
    VelocityButtonModule,
    ContErrorModule,
    CustomHeaderModule
  ],
  declarations: [EditPocketsPage, FormEditPocketsComponent],
  providers: [PocketsFacade, PocketsService, InitTemplateEditPocketsGuard]
})
export class EditPocketsPageModule {}
