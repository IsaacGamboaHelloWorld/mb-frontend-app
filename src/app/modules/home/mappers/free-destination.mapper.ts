import { TranslateService } from '@ngx-translate/core';

import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { ICard } from '@commons/entities/card.entities';
import { currencyFormat, translate } from '@commons/helpers/global.helper';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';

export const freeDestinationCreditsMapper = (
  freeDestination: IFreeDestinationDetail,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  imageCdn: ImageCdnPipe
): ICard => {
  const { loading, completed, errorMessage, error, success } = freeDestination;
  const defaultInfo = {
    name: translate(translateService, 'FREE_DESTINATION.NAME'),
    id: `${translate(translateService, 'NRO')} ${
      freeDestination.accountIdentifier
    }`,
    sectionError: null,
    success,
    loading,
    completed,
    error,
    errorMessage,
    img: imageCdn.transform('/finances.png')
  };
  return {
    ...defaultInfo,
    content: {
      title:
        freeDestination?.dueDays > 0
          ? translate(translateService, 'FREE_DESTINATION.MIN_PAYMENT')
          : translate(translateService, 'FREE_DESTINATION.TOTAL_BALANCE'),
      amount:
        freeDestination?.dueDays > 0
          ? currencyFormat(
              currencyPipe,
              freeDestination?.minimumAmountToPay,
              true
            )
          : currencyFormat(
              currencyPipe,
              freeDestination?.outstandingBalance,
              true
            ),
      showFooter: true,
      link: translate(translateService, 'PRODUCTS.VIEW_DETAIL')
    }
  };
};
