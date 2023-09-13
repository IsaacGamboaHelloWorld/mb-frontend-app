import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageVoucherComponent } from '@commons/velocity/templates/utils/components/page-voucher/page-voucher.component';
import { VelocityVoucherModule } from '@commons/velocity/organisms/velocity-voucher/velocity-voucher.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [PageVoucherComponent],
  imports: [CommonModule, VelocityVoucherModule, VelocityButtonModule],
  exports: [PageVoucherComponent]
})
export class PageVoucherModule {}
