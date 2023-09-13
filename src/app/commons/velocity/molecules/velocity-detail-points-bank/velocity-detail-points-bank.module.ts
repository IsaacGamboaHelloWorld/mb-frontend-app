import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VelocityDetailPointsBankComponent } from './velocity-detail-points-bank.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

@NgModule({
  declarations: [VelocityDetailPointsBankComponent],
  exports: [VelocityDetailPointsBankComponent],
  imports: [CommonModule, GlobalPipesModule]
})
export class VelocityDetailPointsBankModule {}
