import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityCheckboxComponent } from '@commons/velocity/atoms/velocity-checkbox/velocity-checkbox.component';

@NgModule({
  declarations: [VelocityCheckboxComponent],
  imports: [CommonModule],
  exports: [VelocityCheckboxComponent]
})
export class VelocityCheckboxModule {}
