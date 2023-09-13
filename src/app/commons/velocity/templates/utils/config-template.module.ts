import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { InjectComponentDirective } from '@commons/velocity/templates/basic-template/directives/inject-component.directive';
import { PageVoucherModule } from '@commons/velocity/templates/utils/components/page-voucher/page-voucher.module';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { ContAlertComponent } from '@commons/velocity/templates/utils/components/cont-alert/cont-alert.component';
import { StepGuard } from '@commons/velocity/templates/utils/guards/step.guard';

@NgModule({
  declarations: [InjectComponentDirective, ContAlertComponent],
  exports: [InjectComponentDirective, CommonModule, ContAlertComponent],
  providers: [StepGuard],
  imports: [
    PageVoucherModule,
    IonicModule,
    CommonModule,
    VelocityModalLeaveModule
  ]
})
export class ConfigTemplateModule {}
