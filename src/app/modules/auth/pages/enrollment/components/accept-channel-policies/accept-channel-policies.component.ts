import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

import { AbstractEnrollmentComponent } from '@modules/auth/pages/abstract-enrollment.component';
import { environment } from '@environment/environment';
import { UrlEnrollment } from '@commons/constants/url-enrollment';
import { PageView } from '@commons/decorators/page-view.decorator';

@PageView(UrlEnrollment.CHANNEL_POLICIES, UrlEnrollment.CHANNEL_POLICIES)
@Component({
  selector: '[app-accept-channel-policies]',
  templateUrl: './accept-channel-policies.component.html',
  styleUrls: ['./accept-channel-policies.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcceptChannelPoliciesComponent extends AbstractEnrollmentComponent
  implements OnInit {
  public formAcceptTerms: FormGroup;

  constructor(
    private fb: FormBuilder,
    private iab: InAppBrowser,
    public platform: Platform,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  public openPDF(type: string): void {
    this.iab.create(
      type === 'terms' ? environment.terms : environment.policies,
      this.platform.is('android') ? '_system' : '_blank'
    );
  }

  private _initForm(): void {
    this.formAcceptTerms = this.fb.group({
      termsAndConditions: [false, [Validators.requiredTrue]],
      bankPolicies: [false, [Validators.requiredTrue]]
    });
  }
}
