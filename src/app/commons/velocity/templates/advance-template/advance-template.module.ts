import { NgModule } from '@angular/core';

import { AdvanceTemplateContainer } from '@commons/velocity/templates/advance-template/advance-template.container';
import { StepOneComponent } from '@commons/velocity/templates/advance-template/components/step-one/step-one.component';
import { StepTwoComponent } from '@commons/velocity/templates/advance-template/components/step-two/step-two.component';
import { StepThreeComponent } from '@commons/velocity/templates/advance-template/components/step-three/step-three.component';
import { AdvanceTemplateRoutingModule } from '@commons/velocity/templates/advance-template/advance-template-routing.module';
import { VelocityLineTimeModule } from '@commons/velocity/molecules/velocity-line-time/velocity-line-time.module';
import { ConfigTemplateModule } from '@commons/velocity/templates/utils/config-template.module';

@NgModule({
  declarations: [
    AdvanceTemplateContainer,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent
  ],
  imports: [
    ConfigTemplateModule,
    AdvanceTemplateRoutingModule,
    VelocityLineTimeModule
  ]
})
export class AdvanceTemplateModule {}
