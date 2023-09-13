import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { ConfigOtpInput } from '@commons/components/ng-otp-input/models/config';
import { OTP_INPUT_CONFIG } from '@commons/constants/global';
import { AbstractExperienceComponent } from '../../abstract-experience.component';
import { ISecureDataBriefQuestion } from '@modules/auth/entities/auth.interface';
import { PageView } from '@commons/decorators/page-view.decorator';
import { UrlExperience } from '@commons/constants/url-experience';

@PageView(
  UrlExperience.FILL_SECURITY_QUESTION,
  UrlExperience.FILL_SECURITY_QUESTION
)
@Component({
  selector: '[app-fill-security-question-experience]',
  templateUrl: './fill-security-question-experience.component.html',
  styleUrls: ['./fill-security-question-experience.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillSecurityQuestionComponent extends AbstractExperienceComponent
  implements OnInit, OnDestroy {
  public formSecureData: FormGroup;
  public valueComplete: string;
  public valueLength: number;
  public showPass: boolean = false;
  public secureDataBriefQuestion: ISecureDataBriefQuestion;
  private _subs: Subscription[] = [];

  constructor(private fb: FormBuilder, protected injector: Injector) {
    super(injector);
  }

  get secureDataSecret(): AbstractControl {
    return this.formSecureData.get('secureDataSecret');
  }

  get configOtpInput(): ConfigOtpInput {
    return OTP_INPUT_CONFIG;
  }

  get otpInputType(): 'tel' | 'password' {
    return this.showPass ? 'tel' : 'password';
  }

  get otpInputIcon(): string {
    return this.showPass ? 'icon-vel-eye-off' : 'icon-vel-eye';
  }

  ngOnInit(): void {
    this._initForm();
    this._obtainData();
  }

  ngOnDestroy(): void {
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
  }

  public submitSecureData(): void {
    this.submitExperience(this.formSecureData);
  }

  public toggleType(): void {
    this.showPass = !this.showPass;
  }

  private _initForm(): void {
    this.formSecureData = this.fb.group({
      secureDataSecret: ['', [Validators.required]]
    });
  }

  private _obtainData(): void {
    this._subs.push(
      this.facade.contentExperience$
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
          this.valueComplete = value;
        })
    );
  }
}
