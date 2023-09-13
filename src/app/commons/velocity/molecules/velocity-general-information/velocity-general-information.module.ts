import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityGeneralInformationComponent } from '@commons/velocity/molecules/velocity-general-information/velocity-general-information.component';

@NgModule({
  declarations: [VelocityGeneralInformationComponent],
  imports: [CommonModule],
  exports: [VelocityGeneralInformationComponent]
})
export class VelocityGeneralInformationModule {}
