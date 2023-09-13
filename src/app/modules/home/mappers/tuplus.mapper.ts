import { ITuplusState } from '@modules/main-container/store/states/main-container.state';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { ICard } from '@commons/entities/card.entities';
import { translate } from '@commons/helpers/global.helper';
import { DecimalPipe } from '@angular/common';

const decimalPipe = new DecimalPipe('en-US');

export const mapperTuplus = (
  tuplus: ITuplusState,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  imageCdn: ImageCdnPipe
): ICard => {
  const { loading, completed, errorMessage, error } = tuplus;

  const defaultInfo = {
    name: translate(translateService, 'TUPLUS.NAME'),
    id: null,
    sectionError: null,
    success: tuplus?.information?.success,
    loading,
    completed,
    error,
    errorMessage,
    img: imageCdn.transform('/tu-plus.png')
  };
  return {
    ...defaultInfo,
    content: {
      title: translate(translateService, 'TUPLUS.TOTAL_POINTS'),
      amount: decimalPipe
        .transform(tuplus?.information?.totalPoints)
        ?.replace(/,/g, '.'),
      link: translate(translateService, 'PRODUCTS.VIEW_DETAIL'),
      showFooter: true
    }
  };
};
