import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { VelocityProductCardSmallComponent } from '@commons/velocity/molecules/velocity-product-card-small/velocity-product-card-small.component';

@NgModule({
  declarations: [VelocityProductCardSmallComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityProductCardSmallComponent]
})
export class VelocityProductCardSmallModule {}
