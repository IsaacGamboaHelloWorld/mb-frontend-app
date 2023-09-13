import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnBoardingPageRoutingModule } from './on-boarding-routing.module';

import { OnBoardingPage } from './on-boarding.page';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnBoardingPageRoutingModule,
    VelocityImageTitleModule,
    VelocityButtonModule,
    GlobalPipesModule
  ],
  declarations: [OnBoardingPage],
  providers: [PocketsFacade]
})
export class OnBoardingPageModule {}
