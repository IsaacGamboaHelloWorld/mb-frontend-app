import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityToastComponent } from '@commons/velocity/molecules/velocity-toast/velocity-toast.component';

@NgModule({
  declarations: [VelocityToastComponent],
  exports: [VelocityToastComponent],
  imports: [CommonModule]
})
export class VelocityToastModule {}
