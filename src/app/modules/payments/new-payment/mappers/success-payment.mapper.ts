import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';

import { IVoucher } from '@commons/entities/voucher.entities';
import { dateFormat } from '@commons/helpers/global.helper';
import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { IPaymentBillsResp } from '@modules/payments/entities/billers.entities';

const imageCdnPipe = new ImageCdnPipe();

export function newPaymentSuccessMapper(
  template: IPaymentBillsResp,
  property: string
): IVoucherTemplateEntities {
  const voucher: IVoucher = {
    id: 'new-payment-success',
    img: {
      url: imageCdnPipe.transform('/success.png')
    },
    title: this.translateService.instant('PAYMENT.SUCCESS.TITLE'),
    description: this.translateService.instant('PAYMENT.SUCCESS.DESCRIPTION'),
    amount: {
      name: this.translateService.instant('VALUE'),
      value: this.currencyFormat.transform(
        template?.billerPayment?.amount,
        true
      )
    },
    date: `${dateFormat(
      new Date().toISOString(),
      'dd/MMM/yyyy',
      true,
      true
    )} - IP ${template?.request?.ipAddress}`,
    list: [
      {
        name: this.translateService.instant('RECHARGE.TO_WHO.ORIGIN'),
        value: `${this.translateService.instant(
          'PRODUCT_TYPES.' + template.billerPayment?.originAccountType
        )} **** ${template.billerPayment?.originAccountId?.slice(-4)}`
      },
      ...(template?.billerPayment?.biller
        ? [
            {
              name: this.translateService.instant(
                'RECHARGE.TO_WHO.DESTINATION'
              ),
              value: `${template?.billerPayment?.billerName} ${
                !!template?.billerPayment?.billerNickName
                  ? '- ' + template.billerPayment?.billerId
                  : ''
              } - ${this.translateService.instant(
                'PAYMENT.NOT_REGISTERED.SUCCESS.REFERENCE'
              )}. ${template?.billerPayment?.[property] || ''}`
            }
          ]
        : [
            {
              name: this.translateService.instant(
                'RECHARGE.TO_WHO.DESTINATION'
              ),
              value: `${
                template?.billerPayment?.billerName
              } - ${this.translateService.instant(
                'PAYMENT.NOT_REGISTERED.SUCCESS.REFERENCE'
              )}. ${template?.billerPayment?.contract}`
            }
          ]),
      {
        name: this.translateService.instant('PAYMENT.LOANS.SUCCESS.APPROVAL'),
        value: template?.approvalId
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
      name: this.translateService.instant('FINISH'),
      loading: false,
      className: 'btn btn-primary medium space-button'
    },
    buttonSecond: {
      name: this.translateService.instant('PAYMENT.SUCCESS.BUTTON_SECOND'),
      className: 'btn btn-secondary medium'
    }
  };
}
