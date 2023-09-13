import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { GenericHomeProductPageRoutingModule } from './generic-home-product-routing.module';
import { GenericHomeProductPage } from './generic-home-product.page';
import { VelocityCardServiceModule } from '@commons/velocity/molecules/velocity-card-service/velocity-card-service.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericHomeProductPageRoutingModule,
    VelocityCardServiceModule,
    VelocityImageTitleModule,
    TranslateModule,
    GlobalPipesModule,
    CustomHeaderModule
  ],
  declarations: [GenericHomeProductPage]
})
export class GenericHomeProductPageModule {}
