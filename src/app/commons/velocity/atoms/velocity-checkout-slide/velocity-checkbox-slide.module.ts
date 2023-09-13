import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VelocityCheckboxSlideComponent } from '@commons/velocity/atoms/velocity-checkout-slide/velocity-checkbox-slide.component';

@NgModule({
  declarations: [VelocityCheckboxSlideComponent],
  imports: [CommonModule],
  exports: [VelocityCheckboxSlideComponent]
})
export class VelocityCheckboxSlideModule {}
