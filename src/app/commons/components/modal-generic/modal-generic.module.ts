import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';

@NgModule({
  declarations: [ModalGenericComponent],
  imports: [CommonModule, VelocityModalLeaveModule],
  exports: [ModalGenericComponent]
})
export class ModalGenericModule {}
