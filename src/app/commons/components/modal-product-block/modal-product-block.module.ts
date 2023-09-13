import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateModule } from '@ngx-translate/core';

import { ModalProductBlockComponent } from '@commons/components/modal-product-block/modal-product-block.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [ModalProductBlockComponent],
  exports: [ModalProductBlockComponent],
  imports: [CommonModule, TranslateModule, VelocityButtonModule],
  providers: [InAppBrowser]
})
export class ModalProductBlockModule {}
