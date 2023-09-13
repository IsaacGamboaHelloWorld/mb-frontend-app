import {
  Component,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Subscription } from 'rxjs';

import { AbstractEnrollmentComponent } from '@modules/auth/pages/abstract-enrollment.component';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS, OTP_INPUT_CONFIG } from '@commons/constants/global';
import { InitAuth } from '@modules/auth/entities/auth.interface';
import { InfoUser } from '@commons/entities/auth-data.entities';
import { UrlEnrollment } from '@commons/constants/url-enrollment';
import { PageView } from '@commons/decorators/page-view.decorator';
import {
  GROUP_MEMO_GLOBAL,
  memoClosureGlobal
} from '@commons/memorize/global.memorize';
import { ConfigOtpInput } from '@commons/components/ng-otp-input/models/config';

@PageView(UrlEnrollment.UNIVERSAL_PASSWORD, UrlEnrollment.UNIVERSAL_PASSWORD)
@Component({
  selector: '[app-universal-password]',
  templateUrl: './universal-password.component.html',
  styleUrls: ['./universal-password.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class UniversalPasswordComponent extends AbstractEnrollmentComponent
  implements OnInit, OnDestroy {
  @Input() information: InitAuth;
  public formEnrollment: FormGroup;
  public showPass: boolean = false;
  private _subs: Subscription[] = [];
  private _hasBiometricKey: boolean = false;
  private _universalPasswordValidators: ValidatorFn[] = [];

  constructor(
    private fb: FormBuilder,
    private fingerprintAIO: FingerprintAIO,
    private securityStorageService: AdlSecureStorageService,
    private translateService: TranslateService,
    protected injector: Injector,
    private platform: Platform,
    private keyboard: Keyboard
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
    this._validateBiometric();
    this._subs.push(
      this.keyboard
        .onKeyboardDidShow()
        .subscribe(() =>
          document.getElementById('universal-password-submit').scrollIntoView()
        )
    );
  }

  ngOnDestroy(): void {
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
  }

  get universalPassword(): AbstractControl {
    return this.formEnrollment.get('universalPassword');
  }

  get showBiometric(): boolean {
    return this._hasBiometricKey;
  }

  get configOtpInput(): ConfigOtpInput {
    return OTP_INPUT_CONFIG;
  }

  get otpInputIcon(): string {
    return this.showPass ? 'icon-vel-eye-off' : 'icon-vel-eye';
  }

  get otpInputType(): 'tel' | 'password' {
    return this.showPass ? 'tel' : 'password';
  }

  public toggleType(): void {
    this.showPass = !this.showPass;
  }

  public forgotPassword(): void {
    this.formEnrollment.controls['universalPassword'].setValue('0000');
    this.formEnrollment.controls['forgotPassword'].setValue(true);
    this.submitEnrollment(this.formEnrollment);
    this.minDelay();
  }

  public async openBiometric(): Promise<void> {
    if (this._hasBiometricKey) {
      try {
        const biometric = await this.fingerprintAIO.show({
          title: this.translateService.instant('NAME_BANK'),
          description: this.translateService.instant(
            'AUTH.UNIVERSAL_PASSWORD.FINGERPRINT.DESCRIPTION'
          ),
          cancelButtonTitle: this.translateService.instant(
            'AUTH.UNIVERSAL_PASSWORD.FINGERPRINT.CANCEL_BUTTON'
          ),
          disableBackup: true
        });
        !!biometric
          ? await this._biometricLogin()
          : this.facade.openToast(
              this.translateService.instant(
                'AUTH.UNIVERSAL_PASSWORD.FINGERPRINT.ERROR'
              )
            );
      } catch {}
    }
  }

  public obtainPlatform(): string {
    return this.platform.is('android') ? 'android' : 'ios';
  }

  private _initForm(): void {
    this._universalPasswordValidators = [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern(/^[0-9]+$/)
    ];
    this.formEnrollment = this.fb.group({
      universalPassword: ['', this._universalPasswordValidators],
      forgotPassword: [false],
      isBiometric: [false]
    });
  }

  private async _validateBiometric(): Promise<void> {
    try {
      if (!!memoClosureGlobal(GROUP_MEMO_GLOBAL.HAS_BIOMETRIC, true)) {
        const infoBiometric = await this.securityStorageService.get(
          KEYS.BIOMETRIC
        );
        const info: InfoUser = JSON.parse(infoBiometric) || {};

        if (
          !!info &&
          atob(info?.idType || '').toUpperCase() === this.information?.idType &&
          atob(info?.id || '') === this.information?.id
        ) {
          this._hasBiometricKey = true;
          await this.openBiometric();
        }
      }
    } catch {}
  }

  private async _biometricLogin(): Promise<void> {
    const userKey = await this.securityStorageService.get(KEYS.BIOMETRIC);
    this.formEnrollment.controls['universalPassword'].clearValidators();
    this.formEnrollment.controls['universalPassword'].setValue(
      JSON.parse(userKey)?.password || ''
    );
    this.formEnrollment.controls['isBiometric'].setValue(true);
    this.submitEnrollment(this.formEnrollment);
    this.formEnrollment.reset({
      universalPassword: '',
      forgotPassword: false,
      isBiometric: false
    });
    this.formEnrollment.controls['universalPassword'].setValidators(
      this._universalPasswordValidators
    );
  }
}
