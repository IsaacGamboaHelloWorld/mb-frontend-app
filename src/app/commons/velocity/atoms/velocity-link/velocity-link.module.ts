import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityLinkComponent } from '@commons/velocity/atoms/velocity-link/velocity-link.component';

@NgModule({
  declarations: [VelocityLinkComponent],
  imports: [CommonModule],
  exports: [VelocityLinkComponent]
})
export class VelocityLinkModule {}
