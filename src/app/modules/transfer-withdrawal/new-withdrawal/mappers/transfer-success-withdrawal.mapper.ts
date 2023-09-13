import { IVoucher } from '@commons/entities/voucher.entities';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IOtpWithdrawalResponse } from '@modules/transfer-withdrawal/new-withdrawal/entities/otp-transfer-withdrawal.entities';

const imageCdnPipe = new ImageCdnPipe();

export function transferWithdrawalSuccessMapper(
  response?: IOtpWithdrawalResponse
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'transfer-withdrawal-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant('TRANSFER_WITHDRAWAL.SUCCESS.TITLE'),
    description: this.translateService.instant(
      'TRANSFER_WITHDRAWAL.SUCCESS.DESCRIPTION'
    ),
    date: `${dateFormat(
      new Date().toISOString(),
      'dd/MMM/yyyy',
      true,
      true
    )} - IP ${response?.request?.ipAddress}`,
    list: [
      {
        name: this.translateService.instant('COST_TRANSACTION.TITLE'),
        value: this.translateService.instant('COST_TRANSACTION.VALUE')
      }
    ]
  };
  return {
    voucher,
    buttonFirst: {
      name: this.translateService.instant('FINISH'),
      className: 'btn btn-primary medium space-button'
    },
    buttonSecond: {
      name: this.translateService.instant('TRANSFER_WITHDRAWAL.SUCCESS.BTN'),
      className: 'btn btn-secondary medium'
    }
  };
}
