import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CleaveDirective } from '@commons/directives/cleave.directive';
import { DetectFocusDirective } from '@commons/directives/detect-focus.directive';
import { OnlyNumbersDirective } from '@commons/directives/only-numbers.directive';

@NgModule({
  declarations: [CleaveDirective, DetectFocusDirective, OnlyNumbersDirective],
  imports: [CommonModule],
  exports: [CleaveDirective, DetectFocusDirective, OnlyNumbersDirective]
})
export class GlobalDirectivesModule {}
