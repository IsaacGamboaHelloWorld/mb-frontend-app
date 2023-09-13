import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityBadgeComponent } from '@commons/velocity/atoms/velocity-badge/velocity-badge.component';

@NgModule({
  declarations: [VelocityBadgeComponent],
  imports: [CommonModule],
  exports: [VelocityBadgeComponent]
})
export class VelocityBadgeModule {}
