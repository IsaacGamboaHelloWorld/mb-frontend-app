import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityVoucherComponent } from '@commons/velocity/organisms/velocity-voucher/velocity-voucher.component';

@NgModule({
  exports: [VelocityVoucherComponent],
  declarations: [VelocityVoucherComponent],
  imports: [CommonModule]
})
export class VelocityVoucherModule {}
