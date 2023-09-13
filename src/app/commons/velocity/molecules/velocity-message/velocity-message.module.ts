import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityMessageComponent } from '@commons/velocity/molecules/velocity-message/velocity-message.component';
import { VelocityCheckboxModule } from '@commons/velocity/atoms/velocity-checkbox/velocity-checkbox.module';

@NgModule({
  declarations: [VelocityMessageComponent],
  imports: [CommonModule, VelocityCheckboxModule],
  exports: [VelocityMessageComponent]
})
export class VelocityMessageModule {}
