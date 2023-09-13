import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityCardDownloadComponent } from '@commons/velocity/organisms/velocity-card-download/velocity-card-download.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [VelocityCardDownloadComponent],
  imports: [CommonModule, VelocityButtonModule],
  exports: [VelocityCardDownloadComponent]
})
export class VelocityCardDownloadModule {}
