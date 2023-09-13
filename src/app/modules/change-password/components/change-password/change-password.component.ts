import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { maxRepeatedCharsPatternValidator } from '@commons/validators/repeated-characters.validator';
import { ValidateSequenceNumbers } from '@commons/validators/sequence-numbers.validator';
import { ChangePasswordFacade } from '@modules/change-password/change-password.facade';
import { ChangePasswordService } from '@modules/change-password/services/change-password.service';
import { mapChangePasswordService } from '@modules/change-password/mappers/change-password.mapper';
import { IChangePasswordState } from '@modules/change-password/store/change-password.state';
import { ConfigOtpInput } from '@commons/components/ng-otp-input/models/config';
import { OTP_INPUT_CONFIG } from '@commons/constants/global';
import { GlobalValidatorsServices } from '@commons/validators/global-validators.services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent implements OnInit {
  public formChangePassword: FormGroup;
  public showPass: boolean = false;
  public showPassNew: boolean = false;

  constructor(
    private fb: FormBuilder,
    private facade: ChangePasswordFacade,
    private changePasswordService: ChangePasswordService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  get configOtpInput(): ConfigOtpInput {
    return OTP_INPUT_CONFIG;
  }

  get changePassword$(): Observable<IChangePasswordState> {
    return this.facade.changePassword$;
  }

  get currentPassword(): AbstractControl {
    return this.formChangePassword.get('currentPassword');
  }

  get newPassword(): AbstractControl {
    return this.formChangePassword.get('newPassword');
  }

  get confirmedPassword(): AbstractControl {
    return this.formChangePassword.get('confirmedPassword');
  }

  public toggleType(): void {
    this.showPass = !this.showPass;
  }

  public toggleTypeNew(): void {
    this.showPassNew = !this.showPassNew;
  }

  public submitForm(): void {
    if (this.formChangePassword.valid) {
      this.confirmedPassword.setValue(this.newPassword.value);
      this.facade.setLoadingChangePassword();
      this.changePasswordService
        .getAuthServerPublicKey$()
        .pipe(first())
        .subscribe((key) => {
          mapChangePasswordService(
            this.formChangePassword.value,
            key.publicKey
          ).then((data) => this.facade.fetchChangePassword(data));
        });
    }
  }

  private _initForm(): void {
    this.formChangePassword = this.fb.group({
      currentPassword: [null, Validators.required],
      newPassword: [
        null,
        [
          Validators.required,
          GlobalValidatorsServices.validateNumber,
          maxRepeatedCharsPatternValidator(),
          ValidateSequenceNumbers(3)
        ]
      ],
      confirmedPassword: [null]
    });
  }
}
