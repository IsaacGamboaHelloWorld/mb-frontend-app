import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { PageVoucherComponent } from '@commons/velocity/templates/utils/components/page-voucher/page-voucher.component';
import { StepOneComponent } from '@commons/velocity/templates/advance-template/components/step-one/step-one.component';
import { StepTwoComponent } from '@commons/velocity/templates/advance-template/components/step-two/step-two.component';
import { StepThreeComponent } from '@commons/velocity/templates/advance-template/components/step-three/step-three.component';
import { AdvanceTemplateContainer } from '@commons/velocity/templates/advance-template/advance-template.container';
import { StepGuard } from '@commons/velocity/templates/utils/guards/step.guard';

const routes: Routes = [
  {
    path: '',
    component: AdvanceTemplateContainer,
    children: [
      {
        path: '',
        component: StepOneComponent
      },
      {
        path: UrlsTemplateConstant.howMuch,
        component: StepTwoComponent,
        canActivate: [StepGuard]
      },
      {
        path: UrlsTemplateConstant.when,
        component: StepThreeComponent,
        canActivate: [StepGuard]
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
export class AdvanceTemplateRoutingModule {}
