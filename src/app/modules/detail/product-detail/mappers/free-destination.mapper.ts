import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IProductDetail } from '@modules/detail/product-detail/entities/product-detail.entities';
import {
  currencyFormat,
  dateFormat,
  translate
} from '@commons/helpers/global.helper';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';
import { servicesProductDetailMapper } from '@modules/detail/product-detail/mappers/services-product-detail.mapper';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';

export const freeDestinationDetailMapper = (
  product: IFreeDestinationDetail,
  loadingItem: boolean,
  translateService: TranslateService,
  currencyPipe: CurrencyFormatPipe,
  imageCdn: ImageCdnPipe
): IProductDetail => {
  const { loading, completed, errorMessage, error, success } = product;
  const defaultInfo = {
    loading,
    completed,
    errorMessage,
    error,
    success
  };
  return {
    ...defaultInfo,
    information:
      product?.dueDays > 0
        ? {
            id: `${translate(translateService, 'NRO')} ${
              product?.accountIdentifier
            }`,
            name: translateService.instant('FREE_DESTINATION.DETAIL_NAME'),
            status: {
              text: translateService.instant('FREE_DESTINATION.STATUS.ERROR'),
              class: 'error'
            },
            amount: {
              title: translateService.instant('FREE_DESTINATION.MIN_PAYMENT'),
              value: currencyFormat(
                currencyPipe,
                product?.minimumAmountToPay,
                true
              )
            },
            content: {
              list: [
                {
                  title: translateService.instant(
                    'FREE_DESTINATION.DETAILS_LIST.NEXT_PAYMENT_DATE'
                  ),
                  value: dateFormat(product?.dueDate)
                },
                {
                  title: translateService.instant(
                    'FREE_DESTINATION.DETAILS_LIST.TOTAL_BALANCE'
                  ),
                  value: currencyFormat(
                    currencyPipe,
                    product?.outstandingBalance,
                    true
                  )
                },
                {
                  title: translateService.instant(
                    'FREE_DESTINATION.DETAILS_LIST.DUE_RATE'
                  ),
                  value: `${product?.dueRate}${translate(
                    translateService,
                    'FREE_DESTINATION.DETAILS_LIST.PERCENTAGE'
                  )}`
                },
                {
                  title: translateService.instant(
                    'FREE_DESTINATION.DETAILS_LIST.DUE_DAYS'
                  ),
                  value: `${product?.dueDays} ${translate(
                    translateService,
                    'DAYS'
                  ).toLowerCase()}`
                },
                {
                  title: translateService.instant(
                    'FREE_DESTINATION.DETAILS_LIST.DUE_AMOUNT'
                  ),
                  value: currencyFormat(
                    currencyPipe,
                    product?.totalDueAmount,
                    true
                  )
                }
              ],
              description: translateService.instant(
                'FREE_DESTINATION.DETAILS_LIST.DESCRIPTION'
              )
            }
          }
        : {
            id: `${translate(translateService, 'NRO')} ${
              product?.accountIdentifier
            }`,
            name: translateService.instant('FREE_DESTINATION.DETAIL_NAME'),
            status: {
              text: translateService.instant('FREE_DESTINATION.STATUS.SUCCESS'),
              class: 'success'
            },
            amount: {
              title: translateService.instant('FREE_DESTINATION.TOTAL_BALANCE'),
              value: currencyFormat(
                currencyPipe,
                product?.outstandingBalance,
                true
              )
            },
            content: {
              list: [
                {
                  title: translateService.instant(
                    'FREE_DESTINATION.DETAILS_LIST.NEXT_PAYMENT_DATE'
                  ),
                  value: dateFormat(product?.dueDate)
                },
                {
                  title: translateService.instant(
                    'FREE_DESTINATION.DETAILS_LIST.MIN_PAYMENT'
                  ),
                  value: currencyFormat(
                    currencyPipe,
                    product?.minimumAmountToPay,
                    true
                  )
                }
              ]
            }
          },
    services: servicesProductDetailMapper(
      product,
      translateService,
      imageCdn,
      false,
      []
    )
  };
};
