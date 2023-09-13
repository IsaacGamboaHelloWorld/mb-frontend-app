import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityCardOpenNewProductComponent } from '@commons/velocity/molecules/velocity-card-open-new-product/velocity-card-open-new-product.component';

@NgModule({
  declarations: [VelocityCardOpenNewProductComponent],
  imports: [CommonModule],
  exports: [VelocityCardOpenNewProductComponent]
})
export class VelocityCardOpenNewProductModule {}
