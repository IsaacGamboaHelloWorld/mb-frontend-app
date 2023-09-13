import {
  ChangeDetectionStrategy,
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
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AbstractEnrollmentComponent } from '@modules/auth/pages/abstract-enrollment.component';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { ISecureDataBriefQuestion } from '@modules/auth/entities/auth.interface';
import { UrlEnrollment } from '@commons/constants/url-enrollment';
import { PageView } from '@commons/decorators/page-view.decorator';
import { ConfigOtpInput } from '@commons/components/ng-otp-input/models/config';
import { OTP_INPUT_CONFIG } from '@commons/constants/global';

@PageView(UrlEnrollment.FILL_SECURE_DATA, UrlEnrollment.FILL_SECURE_DATA)
@Component({
  selector: '[app-fill-secure-data]',
  templateUrl: './fill-secure-data.component.html',
  styleUrls: ['./fill-secure-data.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillSecureDataComponent extends AbstractEnrollmentComponent
  implements OnInit, OnDestroy {
  public formSecureData: FormGroup;
  public secureDataBriefQuestion: ISecureDataBriefQuestion;
  public valueLength: number;
  public valueComplete: string;
  public showPass: boolean = false;
  private _otpInputType: 'tel' | 'password';
  private _otpInputIcon: string;
  private _subs: Subscription[] = [];

  constructor(private fb: FormBuilder, protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
    this._obtainData();
  }

  ngOnDestroy(): void {
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
  }

  get productType(): string {
    return this.secureDataBriefQuestion.productType;
  }

  get questionType(): string {
    return this.secureDataBriefQuestion?.questionType === 'product'
      ? 'tel'
      : 'password';
  }

  get otpInputType(): 'tel' | 'password' {
    return this._otpInputType;
  }

  get otpInputIcon(): string {
    return this._otpInputIcon;
  }

  public toggleType(): void {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this._otpInputType = 'tel';
      this._otpInputIcon = 'icon-vel-eye-off';
    } else {
      this._otpInputType = 'password';
      this._otpInputIcon = 'icon-vel-eye';
    }
  }

  get isTel(): boolean {
    return this.questionType === 'tel';
  }

  get secureDataSecret(): AbstractControl {
    return this.formSecureData.get('secureDataSecret');
  }

  get configOtpInput(): ConfigOtpInput {
    return { ...OTP_INPUT_CONFIG, length: this.valueLength };
  }

  public concatData(): void {
    const originalValue = this.secureDataSecret.value;
    if (this.isTel)
      this.secureDataSecret.setValue(
        this.secureDataSecret.value.toString() + this.valueComplete
      );
    this.submitEnrollment(this.formSecureData);
    this.secureDataSecret.setValue(originalValue);
  }

  private _initForm(): void {
    this.formSecureData = this.fb.group({
      secureDataSecret: ['', [Validators.required]]
    });
  }

  private _obtainData(): void {
    this._subs.push(
      this.facade.contentEnrollment$
        .pipe(
          filter((state) => !state.loading),
          distinctUntilChanged()
        )
        .subscribe((data) => {
          !!data.content.secureDataBriefQuestion &&
            (this.secureDataBriefQuestion =
              data.content.secureDataBriefQuestion);
          const value = this.secureDataBriefQuestion?.question?.substring(
            this.secureDataBriefQuestion?.question?.lastIndexOf('*') + 1
          );
          this.valueLength =
            this.secureDataBriefQuestion?.productType ===
            TYPE_ACCOUNTS.DEBIT_CARD
              ? this.secureDataBriefQuestion?.length
              : this.secureDataBriefQuestion?.length
              ? this.secureDataBriefQuestion?.length - value.length
              : 0;
          this.valueComplete = value;
          this._otpInputType =
            this.secureDataBriefQuestion?.questionType === 'product'
              ? 'tel'
              : 'password';
          this._otpInputIcon =
            this.secureDataBriefQuestion?.questionType === 'product'
              ? ''
              : 'icon-vel-eye';
        })
    );
  }
}
