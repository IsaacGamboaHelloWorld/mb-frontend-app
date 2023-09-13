import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocitySumSubtractComponent } from '@commons/velocity/molecules/velocity-sum-subtract/velocity-sum-subtract.component';

@NgModule({
  declarations: [VelocitySumSubtractComponent],
  imports: [CommonModule],
  exports: [VelocitySumSubtractComponent]
})
export class VelocitySumSubtractModule {}
