import {
  ChangeDetectionStrategy,
  Component,
  Injector,
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

import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { maxRepeatedCharsPatternValidator } from '@commons/validators/repeated-characters.validator';
import { AbstractEnrollmentComponent } from '@modules/auth/pages/abstract-enrollment.component';
import { ValidateSequenceNumbers } from '@commons/validators/sequence-numbers.validator';
import { UrlEnrollment } from '@commons/constants/url-enrollment';
import { PageView } from '@commons/decorators/page-view.decorator';
import { ConfigOtpInput } from '@commons/components/ng-otp-input/models/config';
import { OTP_INPUT_CONFIG } from '@commons/constants/global';
import { GlobalValidatorsServices } from '@commons/validators/global-validators.services';

@PageView(
  UrlEnrollment.NEW_UNIVERSAL_PASSWORD,
  UrlEnrollment.NEW_UNIVERSAL_PASSWORD
)
@Component({
  selector: '[app-new-universal-password]',
  templateUrl: './new-universal-password.component.html',
  styleUrls: ['./new-universal-password.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUniversalPasswordComponent extends AbstractEnrollmentComponent
  implements OnInit {
  public formNewPassword: FormGroup;
  public showPass: boolean = false;
  private _imageCdnPipe: ImageCdnPipe = new ImageCdnPipe();

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  get universalPasswordConfirmation(): AbstractControl {
    return this.formNewPassword.get('universalPasswordConfirmation');
  }

  get universalPassword(): AbstractControl {
    return this.formNewPassword.get('universalPassword');
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

  public submitEnrollmentData(): void {
    if (this.formNewPassword.valid) {
      this.universalPasswordConfirmation.setValue(this.universalPassword.value);
      this.submitEnrollment(this.formNewPassword);
    }
  }

  private _initForm(): void {
    this.formNewPassword = this.fb.group({
      universalPassword: [
        null,
        [
          Validators.required,
          GlobalValidatorsServices.validateNumber,
          maxRepeatedCharsPatternValidator(),
          ValidateSequenceNumbers(3)
        ]
      ],
      universalPasswordConfirmation: [null]
    });
  }
}
