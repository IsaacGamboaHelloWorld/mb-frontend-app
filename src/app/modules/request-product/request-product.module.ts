import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RequestProductPageRoutingModule } from './request-product-routing.module';
import { RequestProductPage } from './request-product.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityCardRequestProductModule } from '@commons/velocity/molecules/velocity-card-request-product/velocity-card-request-product.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestProductPageRoutingModule,
    GlobalPipesModule,
    VelocityCardRequestProductModule,
    CustomHeaderModule
  ],
  declarations: [RequestProductPage]
})
export class RequestProductPageModule {}
