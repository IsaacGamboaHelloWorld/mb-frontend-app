import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { OpenAccountCustomPageRoutingModule } from './open-account-custom-routing.module';
import { OpenAccountCustomPage } from './open-account-custom.page';
import { VelocityInformationPageModule } from '@commons/velocity/organisms/velocity-information-page/velocity-information-page.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GlobalPipesModule,
    OpenAccountCustomPageRoutingModule,
    VelocityInformationPageModule,
    CustomHeaderModule
  ],
  declarations: [OpenAccountCustomPage],
  providers: [InAppBrowser]
})
export class OpenAccountCustomPageModule {}
