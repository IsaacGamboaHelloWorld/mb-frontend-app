import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';

const imageCdnPipe = new ImageCdnPipe();
const typeCreditCardPipe = new TypeCreditCardPipe();

export function advancesConfirmationMapper(
  toWho: any
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'advances-confirmation',
    img: {
      url: imageCdnPipe.transform('/isologo.png'),
      type: 'small'
    },
    title: this.translateService.instant('ADVANCES.CONFIRMATION.TITLE'),
    description: this.translateService.instant(
      'ADVANCES.CONFIRMATION.DESCRIPTION'
    ),
    amount: {
      name: this.translateService.instant(
        'ADVANCES.CONFIRMATION.AMOUNT_ADVANCE'
      ),
      value: this.currencyFormat.transform(toWho?.amount?.normalize, true)
    },
    list: [
      {
        name: this.translateService.instant('ADVANCES.TO_WHO.FROM'),
        value: `${this.translateService.instant('NAME_BANK')} - ${
          toWho?.from?.nameAccount
        } ${
          typeCreditCardPipe.transform(toWho?.from?.id)?.name
        } - ${this.translateService.instant('NRO')}
         ${typeCreditCardPipe.transform(toWho?.from?.id)?.maskId.slice(-9)}`
      },
      {
        name: this.translateService.instant('ADVANCES.TO_WHO.TO'),
        value: `${toWho?.to?.nameAccount} ${
          toWho?.to?.id
        } - ${this.translateService.instant(
          'PRODUCTS.DEPOSIT_ACCOUNT.BALANCE_AVAILABLE'
        )} ${this.currencyFormat.transform(
          toWho?.to?.productAccountBalances?.saldo_disponible?.amount,
          true
        )}`
      },
      {
        name: this.translateService.instant(
          'ADVANCES.DEFERRED_FEES.QUANTITY_FEES'
        ),
        value: this.translateService.instant('ADVANCES.DEFERRED_FEES.QUANTITY')
      },
      {
        name: this.translateService.instant(
          'ADVANCES.TO_WHO.DESCRIPTION.LABEL'
        ),
        value: toWho?.description
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
      name: this.translateService.instant('ADVANCES.CONFIRMATION.BUTTON'),
      loading: false,
      className: 'btn btn-primary medium'
    }
  };
}
