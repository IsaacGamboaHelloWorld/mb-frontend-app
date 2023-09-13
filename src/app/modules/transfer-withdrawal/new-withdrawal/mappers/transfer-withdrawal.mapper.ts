import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IOtpWithdrawal } from '@modules/transfer-withdrawal/new-withdrawal/entities/otp-transfer-withdrawal.entities';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { dateFormat } from '@commons/helpers/global.helper';

const imageCdnPipe = new ImageCdnPipe();

export function transferWithdrawalConfirmationMapper(
  toWho: any,
  retry?: boolean
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'transfer-withdrawal-confirmation',
    img: {
      url: imageCdnPipe.transform('/isologo.png'),
      type: 'small'
    },
    title: this.translateService.instant(
      'TRANSFER_WITHDRAWAL.CONFIRMATION.TITLE'
    ),
    amount: {
      name: this.translateService.instant(
        'TRANSFER_WITHDRAWAL.CONFIRMATION.AMOUNT_TO_TRANSFER'
      ),
      value: this.currencyFormat.transform(
        toWho?.fixedAmount?.id === 0
          ? toWho?.amount?.normalize
          : toWho?.fixedAmount?.value,
        true
      )
    },
    list: [
      {
        name: this.translateService.instant('TRANSFER_WITHDRAWAL.TO_WHO.WHERE'),
        value: this.translateService.instant(toWho?.where?.name)
      },
      ...(toWho?.transferToggle
        ? [
            {
              name: this.translateService.instant(
                'TRANSFER_WITHDRAWAL.TO_WHO.DOCUMENT'
              ),
              value: toWho?.documentId
            }
          ]
        : []),
      {
        name: this.translateService.instant(
          'TRANSFER_WITHDRAWAL.TO_WHO.ORIGIN'
        ),
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
      name: retry
        ? this.translateService.instant('RETRY')
        : this.translateService.instant(
            'TRANSFER_WITHDRAWAL.CONFIRMATION.BUTTON'
          ),
      loading: false,
      className: 'btn btn-primary medium'
    }
  };
}

export const transferWithdrawalServiceMapper = (form: any): IOtpWithdrawal => ({
  ...(form?.transferToggle ? { accountId: form?.documentId } : {}),
  otpChannel: form.where?.value,
  amount:
    form?.fixedAmount.id === 0
      ? form?.amount?.normalize
      : form?.fixedAmount?.value,
  accountType: form?.from?.typeAccount,
  accountId: form?.from?.id,
  sendBySMS: true,
  currency: 'COP',
  otpType: 'W',
  revocation: true,
  beneficiaryId: form?.documentId,
  smsMessage:
    '|OTP| es tu clave temporal del Banco Popular para retiro sin tarjeta. Recuerda que esta clave funciona durante 90 minutos.'
});
