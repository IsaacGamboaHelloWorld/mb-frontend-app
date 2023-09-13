import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocitySectionOtherProductsComponent } from '@commons/velocity/molecules/velocity-section-other-products/velocity-section-other-products.component';
import { VelocityCheckboxSlideModule } from '@commons/velocity/atoms/velocity-checkout-slide/velocity-checkbox-slide.module';

@NgModule({
  declarations: [VelocitySectionOtherProductsComponent],
  exports: [VelocitySectionOtherProductsComponent],
  imports: [CommonModule, VelocityCheckboxSlideModule]
})
export class VelocitySectionOtherProductsModule {}
