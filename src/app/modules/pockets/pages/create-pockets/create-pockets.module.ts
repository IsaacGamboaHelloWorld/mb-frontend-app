import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { CreatePocketsPageRoutingModule } from './create-pockets-routing.module';
import { CreatePocketsPage } from './create-pockets.page';
import { HowMuchComponent } from '@modules/pockets/pages/create-pockets/components/how-much/how-much.component';
import { ForWhatComponent } from '@modules/pockets/pages/create-pockets/components/for-what/for-what.component';
import { HowComponent } from '@modules/pockets/pages/create-pockets/components/how/how.component';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocityWithdrawalPlaceModule } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.module';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';
import { VelocityOperatorModule } from '@commons/velocity/molecules/velocity-operator/velocity-operator.module';
import { InitTemplateCreatePocketGuard } from '@modules/pockets/pages/create-pockets/guard/init-template-create-pocket.guard';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePocketsPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    GlobalPipesModule,
    GlobalDirectivesModule,
    ContErrorModule,
    VelocityModalLeaveModule,
    VelocityButtonModule,
    VelocityWithdrawalPlaceModule,
    VelocityImageTitleModule,
    VelocityOperatorModule,
    CustomHeaderModule
  ],
  declarations: [
    CreatePocketsPage,
    HowMuchComponent,
    ForWhatComponent,
    HowComponent
  ],
  providers: [PocketsFacade, PocketsService, InitTemplateCreatePocketGuard]
})
export class CreatePocketsPageModule {}
