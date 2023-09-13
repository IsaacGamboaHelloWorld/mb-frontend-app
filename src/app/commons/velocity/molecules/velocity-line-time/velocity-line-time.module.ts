import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityLineTimeComponent } from '@commons/velocity/molecules/velocity-line-time/velocity-line-time.component';

@NgModule({
  declarations: [VelocityLineTimeComponent],
  imports: [CommonModule],
  exports: [VelocityLineTimeComponent]
})
export class VelocityLineTimeModule {}
