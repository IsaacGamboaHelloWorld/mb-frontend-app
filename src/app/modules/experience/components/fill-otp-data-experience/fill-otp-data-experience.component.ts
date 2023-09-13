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
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SECONDS_RESEND_OTP } from '@commons/constants/global';
import { environment } from '@environment/environment';
import { PageView } from '@commons/decorators/page-view.decorator';
import { OtpAutocompletePlugin } from '@commons/capacitor-web-plugins';
import { AbstractExperienceComponent } from '../../abstract-experience.component';
import { ModalOtpIosExperienceComponent } from '../modal-otp-ios-experience/modal-otp-ios-experience.component';
import { UrlExperience } from '@commons/constants/url-experience';

@PageView(UrlExperience.FILL_OTP_DATA, UrlExperience.FILL_OTP_DATA)
@Component({
  selector: '[app-fill-otp-data-experience]',
  templateUrl: './fill-otp-data-experience.component.html',
  styleUrls: ['./fill-otp-data-experience.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FillOtpDataExperienceComponent extends AbstractExperienceComponent
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

  get isDisabled(): boolean {
    return !this.isIos;
  }

  ngOnInit(): void {
    this._initForm();
    this._timer();
    environment.onOtpAutomatic && this._validateOtpAutocomplete();
    this.isIos &&
      this.modalService.openModal(ModalOtpIosExperienceComponent, {}, '');
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
    this.submitExperience(this.formOtpData, true);
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
    this.submitExperience(this.formOtpData);
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
                } else {
                  this.facade.openToast(
                    this.translateService.instant(
                      'EXPERIENCE.FILL_OTP_DATA.TOAST_ERROR'
                    )
                  );
                }
                this.otpListener.remove();
              }
            }
          );
        })
        .catch((_) => {});
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
            'EXPERIENCE.FILL_OTP_DATA.LINK_TEXT_TIMER',
            {
              value: `${this.currentTimeString}`
            }
          );
        } else {
          this.currentTimeString = this.translateService.instant(
            'EXPERIENCE.FILL_OTP_DATA.LINK_TEXT_RESEND',
            {
              value: `${this.currentTimeString}`
            }
          );
          !!this.otpListener && this.otpListener.remove();
          !!this._timerSubscription && this._timerSubscription.unsubscribe();
        }
      });
  }
}
