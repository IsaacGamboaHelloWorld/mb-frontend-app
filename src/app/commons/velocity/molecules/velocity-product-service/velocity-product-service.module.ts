import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityProductServiceComponent } from '@commons/velocity/molecules/velocity-product-service/velocity-product-service.component';

@NgModule({
  declarations: [VelocityProductServiceComponent],
  imports: [CommonModule],
  exports: [VelocityProductServiceComponent]
})
export class VelocityProductServiceModule {}
