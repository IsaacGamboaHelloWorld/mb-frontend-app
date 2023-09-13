import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityInformationPageComponent } from '@commons/velocity/organisms/velocity-information-page/velocity-information-page.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [VelocityInformationPageComponent],
  imports: [CommonModule, VelocityButtonModule],
  exports: [VelocityInformationPageComponent]
})
export class VelocityInformationPageModule {}
