import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { HomePocketsPageRoutingModule } from './home-pockets-routing.module';
import { HomePocketsPage } from './home-pockets.page';
import { VelocityCardPocketsModule } from '@commons/velocity/organisms/velocity-card-pockets/velocity-card-pockets.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { ContModalPocketHomeComponent } from '@modules/pockets/pages/home-pockets/components/cont-modal-pocket-home/cont-modal-pocket-home.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePocketsPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    VelocityCardPocketsModule,
    VelocityModalLeaveModule,
    VelocityButtonModule,
    GlobalPipesModule,
    CustomHeaderModule
  ],
  declarations: [HomePocketsPage, ContModalPocketHomeComponent],
  providers: [PocketsFacade]
})
export class HomePocketsPageModule {
  constructor() {}
}
