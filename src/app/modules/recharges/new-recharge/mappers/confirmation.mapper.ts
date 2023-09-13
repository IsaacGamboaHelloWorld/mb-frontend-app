import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IRechargeService } from '@modules/recharges/new-recharge/entities/recharge.entities';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';

const imageCdnPipe = new ImageCdnPipe();

export function rechargeConfirmationMapper(
  toWho: any
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'recharge-confirmation',
    img: {
      url: imageCdnPipe.transform('/isologo.png'),
      type: 'small'
    },
    title: this.translateService.instant('RECHARGE.CONFIRMATION.TITLE'),
    amount: {
      name: this.translateService.instant('VALUE'),
      value: this.currencyFormat.transform(toWho?.amount?.normalize, true)
    },
    list: [
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.DESTINATION'),
        value: toWho?.to?.name
      },
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.OPERATOR'),
        value: toWho?.phoneNumber.value
      },
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.ORIGIN'),
        value: `${toWho?.from?.nameAccount} ${toWho?.from?.id.slice(
          -4
        )} - ${this.translateService.instant(
          'PRODUCTS.DEPOSIT_ACCOUNT.BALANCE_AVAILABLE'
        )} ${this.currencyFormat.transform(
          toWho?.from?.productAccountBalances?.saldo_disponible?.amount,
          true
        )}`
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
      name: this.translateService.instant('RECHARGE.CONFIRMATION.BTN'),
      loading: false,
      className: 'btn btn-primary medium',
      id: 'RecargaCelular_btn_recargar'
    }
  };
}

export const rechargeServiceMapper = (form: any): IRechargeService => ({
  phoneNumber: form?.phoneNumber?.normalize,
  operatorCode: form?.to?.code,
  accountId: form?.from?.id,
  accountType: form?.from?.typeAccount,
  amount: form?.amount?.normalize?.toString()
});
