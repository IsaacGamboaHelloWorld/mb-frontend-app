import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityInfoWithLinesComponent } from '@commons/velocity/atoms/velocity-info-with-lines/velocity-info-with-lines.component';

@NgModule({
  declarations: [VelocityInfoWithLinesComponent],
  imports: [CommonModule],
  exports: [VelocityInfoWithLinesComponent]
})
export class VelocityInfoWithLinesModule {}
