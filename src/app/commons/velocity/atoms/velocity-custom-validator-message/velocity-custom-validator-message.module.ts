import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VelocityCustomValidatorMessageComponent } from '@commons/velocity/atoms/velocity-custom-validator-message/velocity-custom-validator-message.component';

@NgModule({
  declarations: [VelocityCustomValidatorMessageComponent],
  imports: [CommonModule],
  exports: [VelocityCustomValidatorMessageComponent]
})
export class VelocityCustomValidatorMessageModule {}
