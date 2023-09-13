import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AbstractEnrollmentComponent } from '@modules/auth/pages/abstract-enrollment.component';
import { SECONDS_RESEND_OTP } from '@commons/constants/global';
import { environment } from '@environment/environment';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { ModalOtpIosComponent } from '@modules/auth/pages/enrollment/components/modal-otp-ios/modal-otp-ios.component';
import { UrlEnrollment } from '@commons/constants/url-enrollment';
import { PageView } from '@commons/decorators/page-view.decorator';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { OtpAutocompletePlugin } from '@commons/capacitor-web-plugins';

@PageView(UrlEnrollment.OTP_DATA, UrlEnrollment.OTP_DATA)
@Component({
  selector: '[app-otp-data]',
  templateUrl: './otp-data.component.html',
  styleUrls: ['./otp-data.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class OtpDataComponent extends AbstractEnrollmentComponent
  implements OnInit, OnDestroy {
  public currentTime: number;
  public currentTimeString: string;
  public formOtpData: FormGroup;
  public showLoading: boolean = false;
  public showToast: boolean = false;
  private _timerSubscription: Subscription;
  private otpListener: PluginListenerHandle;
  private isAutomaticOtp: boolean = false;
  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    protected injector: Injector
  ) {
    super(injector);
  }

  get otpValue(): AbstractControl {
    return this.formOtpData.get('otpValue');
  }

  get isCurrentTime(): boolean {
    return this.currentTime > 0;
  }

  get platform(): string {
    return Capacitor.getPlatform();
  }

  get isIos(): boolean {
    return this.platform === 'ios';
  }

  ngOnInit(): void {
    this._initForm();
    this._timer();
    environment.onOtpAutomatic && this._validateOtpAutocomplete();
    this.isIos && this.modalService.openModal(ModalOtpIosComponent, {}, '');
  }

  ngOnDestroy(): void {
    !!this._timerSubscription && this._timerSubscription.unsubscribe();
    !!this.otpListener && this.otpListener.remove();
    this.subs?.length > 0 && this.subs.forEach((item) => item.unsubscribe());
  }

  public reSendOtpCode(): void {
    !!this.modalService.modal && this.modalService.close();
    !!this.otpListener && this.otpListener.remove();
    this.formOtpData.controls['forceOtpGeneration'].setValue(true);
    this.formOtpData.controls['automaticOtp'].setValue(false);
    this.submitEnrollment(this.formOtpData, true);
    this.formOtpData.reset({
      otpValue: '',
      forceOtpGeneration: false,
      automaticOtp: true
    });
    this._timer();
    environment.onOtpAutomatic && this._validateOtpAutocomplete();
  }

  public submitOtp(): void {
    !environment.onOtpAutomatic && (this.isAutomaticOtp = true);
    this.formOtpData.controls['automaticOtp'].setValue(this.isAutomaticOtp);
    this.submitEnrollment(this.formOtpData);
    !environment.onOtpAutomatic && (this.isAutomaticOtp = false);
  }

  public sendIos(isComplete: boolean): void {
    this.isIos && isComplete && (this.isAutomaticOtp = true);
    this.isIos && isComplete && this.submitOtp();
    this.isIos && (this.isAutomaticOtp = false);
  }

  public showToastIos(): void {
    this.isIos && (this.showToast = true);
    this.isIos && setTimeout(() => (this.showToast = false), 3000);
  }

  private _initForm(): void {
    this.formOtpData = this.fb.group({
      otpValue: ['', [Validators.required]],
      forceOtpGeneration: [false],
      automaticOtp: [true]
    });
  }

  private _validateOtpAutocomplete(): void {
    this.platform === 'android' && (this.showLoading = true);
    this.platform === 'android' &&
      OtpAutocompletePlugin.listenOtpOnAndroid({
        senderCode: environment.otpSenderCode
      })
        .then(({ success: ok }) => {
          if (ok) {
            this.otpListener = OtpAutocompletePlugin.addListener(
              'otpReceivedEvent',
              (data) => {
                if (!!data) {
                  const { success, otp, retry } = data;
                  retry && this._validateOtpAutocomplete();
                  if (success && !retry && otp !== '') {
                    this.isAutomaticOtp = true;
                    this.showLoading = false;
                    this.otpValue.setValue(otp);
                    this.submitOtp();
                    this.isAutomaticOtp = false;
                  }
                  !success && !retry && this._modalError();
                  this.otpListener.remove();
                }
              }
            );
          } else {
            this._modalError();
          }
        })
        .catch((_) => this._modalError());
  }

  private _timer(): void {
    this.currentTime = SECONDS_RESEND_OTP;

    const source$ = timer(0, 1000);
    this._timerSubscription = source$
      .pipe(filter((data) => data <= SECONDS_RESEND_OTP))
      .subscribe(() => {
        if (this.currentTime > 0) {
          this.currentTime--;
          this.currentTimeString =
            this.currentTime < 10
              ? '0' + this.currentTime.toString()
              : this.currentTime.toString();
          this.currentTimeString = this.translateService.instant(
            'AUTH.OTP_DATA.LINK_TEXT_TIMER',
            {
              value: `${this.currentTimeString}`
            }
          );
        } else {
          this.currentTimeString = this.translateService.instant(
            'AUTH.OTP_DATA.LINK_TEXT_RESEND',
            {
              value: `${this.currentTimeString}`
            }
          );
          !!this.otpListener && this.otpListener.remove();
          this._modalError();
          !!this._timerSubscription && this._timerSubscription.unsubscribe();
        }
      });
  }

  private _modalError(): void {
    !!this.otpListener && this.otpListener.remove();
    this.showLoading = false;
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-face-wrong',
        iconType: 'error',
        type: 'error-otp',
        title: this.translateService.instant('AUTH.OTP_DATA.MODAL.TITLE'),
        areButtonsWidthComplete: true,
        description: this.translateService.instant(
          'AUTH.OTP_DATA.MODAL.DESCRIPTION'
        ),
        secondBtn: this.translateService.instant(
          'AUTH.OTP_DATA.MODAL.BTN_SECOND'
        ),
        eventFirstBtn: this.reSendOtpCode.bind(this),
        firstBtn: this.translateService.instant('AUTH.OTP_DATA.MODAL.BTN')
      },
      'default-modal',
      false,
      true
    );
  }
}
