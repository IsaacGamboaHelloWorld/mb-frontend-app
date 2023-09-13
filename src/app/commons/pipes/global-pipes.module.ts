import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ReplaceValuePipe } from '@commons/pipes/replace-value.pipe';
import { FileCdnPipe } from './file-cdn.pipe';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { FilterPipe } from './filter.pipe';
import { LoadAmountPipe } from '@commons/pipes/load-amount.pipe';
import { HideShowIdPipe } from './hide-show-id.pipe';

@NgModule({
  declarations: [
    ImageCdnPipe,
    CurrencyFormatPipe,
    ReplaceValuePipe,
    FileCdnPipe,
    TypeCreditCardPipe,
    FilterPipe,
    LoadAmountPipe,
    HideShowIdPipe
  ],
  imports: [CommonModule, TranslateModule],
  exports: [
    TranslateModule,
    ImageCdnPipe,
    CurrencyFormatPipe,
    ReplaceValuePipe,
    TypeCreditCardPipe,
    FilterPipe,
    LoadAmountPipe,
    HideShowIdPipe
  ],
  providers: [
    CurrencyFormatPipe,
    ReplaceValuePipe,
    ImageCdnPipe,
    TypeCreditCardPipe,
    FilterPipe,
    LoadAmountPipe,
    HideShowIdPipe
  ]
})
export class GlobalPipesModule {}
