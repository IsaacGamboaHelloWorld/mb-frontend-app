import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityDetailInfoComponent } from '@commons/velocity/molecules/velocity-detail-info/velocity-detail-info.component';
import { VelocityLinkModule } from '@commons/velocity/atoms/velocity-link/velocity-link.module';

@NgModule({
  declarations: [VelocityDetailInfoComponent],
  imports: [CommonModule, VelocityLinkModule],
  exports: [VelocityDetailInfoComponent]
})
export class VelocityDetailInfoModule {}
