import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityProductDetailCardComponent } from '@commons/velocity/molecules/velocity-product-detail-card/velocity-product-detail-card.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [VelocityProductDetailCardComponent],
  imports: [CommonModule, VelocityButtonModule],
  exports: [VelocityProductDetailCardComponent]
})
export class VelocityProductDetailCardModule {}
