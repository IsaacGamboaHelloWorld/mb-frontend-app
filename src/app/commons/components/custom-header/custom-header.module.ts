import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomHeaderComponent } from '@commons/components/custom-header/custom-header.component';

@NgModule({
  declarations: [CustomHeaderComponent],
  exports: [CustomHeaderComponent],
  imports: [CommonModule]
})
export class CustomHeaderModule {}
