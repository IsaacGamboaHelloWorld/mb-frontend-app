import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityModalLeaveComponent } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [VelocityModalLeaveComponent],
  imports: [CommonModule, VelocityButtonModule],
  exports: [VelocityModalLeaveComponent]
})
export class VelocityModalLeaveModule {}
