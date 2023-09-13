import { IRedeemBody } from '@modules/tuplus/entities/redeem-tuplus.entities';
import { FormGroup } from '@angular/forms';
import { TYPE_MODAL_PUSH } from '@modules/push-notification/constants/type-modal.constant';
import { TUPLUS_DETAIL } from '@commons/constants/navigatie-global';
import { DecimalPipe } from '@angular/common';

const decimalPipe = new DecimalPipe('en-US');
export const redeemPointsServiceMapper = (
  form: FormGroup,
  equivalent: number,
  traceId: string
): IRedeemBody => ({
  redemptionRequest: {
    totalPoints: form.controls?.['points'].value?.toString(),
    curAmt: equivalent?.toString(),
    accountId:
      form.controls?.['where'].value?.value == 'CC'
        ? form.controls?.['credit'].value?.id
        : form.controls?.['deposit'].value?.id,
    accountType:
      form.controls?.['where'].value?.value == 'CC'
        ? form.controls?.['credit'].value?.typeAccount
        : form.controls?.['deposit'].value?.typeAccount,
    bankId: '00010029',
    bankName: 'POPULAR',
    otpInfo: {
      otpValue: form.controls?.['otp'].value,
      spRefId: traceId
    }
  }
});

export function successModalMapper(): any {
  return {
    icon: 'icon-vel-success-hand',
    iconType: 'success',
    type: TYPE_MODAL_PUSH.enabled,
    title: this.translateService
      .instant('TUPLUS.WHERE_TO_REDEEM.REDEEMED')
      .replace(
        '{points}',
        this.formWhereToRedeem.controls?.['points'].value?.toLocaleString(
          'en-US'
        )
      )
      .replace(',', '.'),
    hasInLineLink: true,
    description:
      this._depositAccounts == true
        ? this.translateService
            .instant('TUPLUS.WHERE_TO_REDEEM.DESCRIPTIONDC')
            .replace('{value}', this._equivalent?.toLocaleString('en-US'))
            .replace(
              '{typeAccount}',
              this.formWhereToRedeem?.value?.deposit?.accountInformation?.productName.toLowerCase()
            )
            .replace(
              '{id}',
              this.formWhereToRedeem.controls?.['deposit']?.value?.id?.slice(-4)
            )
            .replace(',', '.')
        : this.translateService
            .instant('TUPLUS.WHERE_TO_REDEEM.DESCRIPTIONCC')
            .replace('{value}', this._equivalent?.toLocaleString('en-US'))
            .replace(
              '{id}',
              this.formWhereToRedeem.controls?.['credit']?.value?.id.slice(-4)
            )
            .replace(',', '.'),
    firstBtn: this.translateService.instant('UNDERSTOOD'),
    eventFirstBtn: overflowModalButton.bind(
      this,
      this.modalService,
      this.navCtrl
    )
  };
}

export function limitPointsMessageMapper(translateService, minValue, maxValue) {
  return translateService
    .instant('TUPLUS.WHERE_TO_REDEEM.MIN_MAX_POINTS')
    .replace('{min}', decimalPipe.transform(minValue).replace(/,/g, '.'))
    .replace('{max}', decimalPipe.transform(maxValue).replace(/,/g, '.'));
}

export const overflowModalButton = (modalService, navCtrl) => {
  modalService.close();
  navCtrl.navigateBack([TUPLUS_DETAIL]);
};
