import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocitySkeletonCardComponent } from '@commons/velocity/molecules/velocity-skeleton-card/velocity-skeleton-card.component';

@NgModule({
  declarations: [VelocitySkeletonCardComponent],
  exports: [VelocitySkeletonCardComponent],
  imports: [CommonModule]
})
export class VelocitySkeletonCardModule {}
