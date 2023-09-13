import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VelocityButtonComponent } from '@commons/velocity/atoms/velocity-button/velocity-button.component';

@NgModule({
  declarations: [VelocityButtonComponent],
  imports: [CommonModule],
  exports: [VelocityButtonComponent]
})
export class VelocityButtonModule {}
