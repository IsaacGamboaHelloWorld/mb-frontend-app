import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BasicTemplateContainer } from '@commons/velocity/templates/basic-template/basic-template.container';
import { FormStepComponent } from '@commons/velocity/templates/basic-template/components/form-step/form-step.component';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { PageVoucherComponent } from '@commons/velocity/templates/utils/components/page-voucher/page-voucher.component';
import { StepGuard } from '@commons/velocity/templates/utils/guards/step.guard';

const routes: Routes = [
  {
    path: '',
    component: BasicTemplateContainer,
    children: [
      {
        path: '',
        component: FormStepComponent
      },
      {
        path: UrlsTemplateConstant.confirmation,
        component: PageVoucherComponent,
        canActivate: [StepGuard]
      },
      {
        path: UrlsTemplateConstant.success,
        component: PageVoucherComponent,
        canActivate: [StepGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicTemplateRoutingModule {}
