import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VelocityCustomMessageComponent } from './velocity-custom-message.component';
import { VelocityCheckboxModule } from '@commons/velocity/atoms/velocity-checkbox/velocity-checkbox.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

@NgModule({
  declarations: [VelocityCustomMessageComponent],
  exports: [VelocityCustomMessageComponent],
  imports: [CommonModule, VelocityCheckboxModule, GlobalPipesModule]
})
export class VelocityCustomMessageModule {}
