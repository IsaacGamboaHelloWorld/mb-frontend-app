import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityCardRequestProductComponent } from '@commons/velocity/molecules/velocity-card-request-product/velocity-card-request-product.component';

@NgModule({
  declarations: [VelocityCardRequestProductComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityCardRequestProductComponent]
})
export class VelocityCardRequestProductModule {}
