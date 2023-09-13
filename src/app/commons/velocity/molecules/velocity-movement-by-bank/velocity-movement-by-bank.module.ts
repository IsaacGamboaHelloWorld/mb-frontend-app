import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VelocityMovementByBankComponent } from './velocity-movement-by-bank.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

@NgModule({
  declarations: [VelocityMovementByBankComponent],
  exports: [VelocityMovementByBankComponent],
  imports: [CommonModule, GlobalPipesModule]
})
export class VelocityMovementByBankModule {}
