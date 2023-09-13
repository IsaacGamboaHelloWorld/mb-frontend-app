import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { IAdvanceResponse } from '@modules/detail/advances/new-advance/entities/advances.entities';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { dateFormat } from '@commons/helpers/global.helper';

const imageCdnPipe = new ImageCdnPipe();
const typeCreditCardPipe = new TypeCreditCardPipe();

export function advancesSuccessMapper(
  responseAdvance: IAdvanceResponse
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'advances-confirmation',
    img: {
      url: imageCdnPipe.transform('/success.png'),
      type: 'small'
    },
    title: this.translateService.instant('ADVANCES.SUCCESS.TITLE'),
    description: this.translateService.instant('ADVANCES.SUCCESS.DESCRIPTION'),
    amount: {
      name: this.translateService.instant('ADVANCES.SUCCESS.AMOUNT_ADVANCE'),
      value: this.currencyFormat.transform(
        responseAdvance?.details?.advanceInformation?.amount.toString()
      )
    },
    date: dateFormat(new Date().toISOString(), 'dd/MMM/yyyy', true, true),
    list: [
      {
        name: this.translateService.instant('ADVANCES.TO_WHO.FROM'),
        value: `${this.translateService.instant(
          'BANKS.' + responseAdvance?.details?.accountToInformation?.bank
        )} - ${this.translateService.instant(
          'PRODUCT_TYPES.' +
            responseAdvance?.details?.accountFromInformation?.productType
        )} ${
          typeCreditCardPipe.transform(
            responseAdvance?.details?.accountFromInformation?.accountIdentifier
          )?.name
        } - ${this.translateService.instant('NRO')}
            **** ${responseAdvance?.details?.accountFromInformation?.accountIdentifier?.slice(
              -4
            )}`
      },
      {
        name: this.translateService.instant('ADVANCES.TO_WHO.TO'),
        value: `${this.translateService.instant(
          'PRODUCT_TYPES.' +
            responseAdvance?.details?.accountToInformation?.productType
        )} **** ${responseAdvance?.details?.accountToInformation?.accountIdentifier?.slice(
          -4
        )}`
      },
      {
        name: this.translateService.instant(
          'ADVANCES.DEFERRED_FEES.QUANTITY_FEES'
        ),
        value: `${responseAdvance?.details?.advanceInformation?.numberFees}`
      },
      {
        name: this.translateService.instant(
          'ADVANCES.TO_WHO.DESCRIPTION.LABEL'
        ),
        value: `${responseAdvance?.details?.advanceInformation?.description}`
      },
      {
        name: this.translateService.instant('COST_TRANSACTION.TITLE'),
        value: this.translateService.instant('COST_TRANSACTION.VALUE')
      }
    ]
  };
  return {
    voucher,
    buttonFirst: {
      name: this.translateService.instant('ADVANCES.SUCCESS.BTN_FIRST'),
      loading: false,
      className: 'btn btn-primary medium  space-button'
    },
    buttonSecond: {
      name: this.translateService.instant('ADVANCES.SUCCESS.BTN_SECOND'),
      className: 'btn btn-secondary medium'
    }
  };
}
