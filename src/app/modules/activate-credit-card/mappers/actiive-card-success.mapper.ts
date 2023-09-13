import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { IActiveCreditCardService } from '@modules/activate-credit-card/entities/active-block-credit-card.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucher } from '@commons/entities/voucher.entities';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';

const imageCdnPipe = new ImageCdnPipe();
const typeCreditCardPipe = new TypeCreditCardPipe();

export function activeCreditCardSuccessMapper(
  template: IActiveCreditCardService
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'active-credit-card-success',
    img: {
      url: imageCdnPipe.transform('/credit-card.png')
    },
    title: this.translateService.instant('ACTIVE_CREDIT_CARD.VOUCHER.TITLE'),
    description: this.translateService.instant(
      'ACTIVE_CREDIT_CARD.VOUCHER.DESCRIPTION'
    ),
    list: [
      {
        name: this.translateService.instant('ACTIVE_CREDIT_CARD.VOUCHER.NAME'),
        value: `${this.translateService.instant(
          'BANKS.' + template?.details?.companyId
        )} ${this.translateService.instant('ACTIVE_CREDIT_CARD.CARD.NAME')} ${
          typeCreditCardPipe.transform(template?.details?.accountId)?.name
        } - ${this.translateService.instant(
          'PRODUCTS.CREDIT_CARD.TEXT_PRE_NUMBER'
        )}. ${typeCreditCardPipe
          .transform(template?.details?.accountId)
          ?.maskId.slice(-9)}`
      }
    ]
  };
  return {
    voucher,
    buttonFirst: {
      name: this.translateService.instant(
        'ACTIVE_CREDIT_CARD.VOUCHER.BTN_FIRST'
      ),
      className: 'btn btn-primary medium'
    },
    buttonSecond: {
      name: this.translateService.instant(
        'ACTIVE_CREDIT_CARD.VOUCHER.BTN_SECOND'
      ),
      className: 'btn btn-secondary medium space-button'
    }
  };
}
