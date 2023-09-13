import { NgModule } from '@angular/core';

import { FormStepComponent } from '@commons/velocity/templates/basic-template/components/form-step/form-step.component';
import { BasicTemplateRoutingModule } from '@commons/velocity/templates/basic-template/basic-template-routing.module';
import { BasicTemplateContainer } from '@commons/velocity/templates/basic-template/basic-template.container';
import { ConfigTemplateModule } from '@commons/velocity/templates/utils/config-template.module';

@NgModule({
  declarations: [FormStepComponent, BasicTemplateContainer],
  imports: [ConfigTemplateModule, BasicTemplateRoutingModule]
})
export class BasicTemplateModule {}
