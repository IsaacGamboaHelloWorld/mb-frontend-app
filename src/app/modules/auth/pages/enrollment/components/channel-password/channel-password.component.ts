import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AbstractEnrollmentComponent } from '@modules/auth/pages/abstract-enrollment.component';
import { UrlEnrollment } from '@commons/constants/url-enrollment';
import { PageView } from '@commons/decorators/page-view.decorator';

@PageView(UrlEnrollment.CHANNEL_PASSWORD, UrlEnrollment.CHANNEL_PASSWORD)
@Component({
  selector: '[app-channel-password]',
  templateUrl: './channel-password.component.html',
  styleUrls: ['./channel-password.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelPasswordComponent extends AbstractEnrollmentComponent
  implements OnInit {
  public formChannelPass: FormGroup;
  constructor(private fb: FormBuilder, protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.formChannelPass = this.fb.group({
      currentPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ]
      ]
    });
  }
}
