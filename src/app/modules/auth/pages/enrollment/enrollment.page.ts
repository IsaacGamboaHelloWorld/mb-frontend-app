import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AbstractEnrollmentComponent } from '@modules/auth/pages/abstract-enrollment.component';
import { redirectHome } from '@modules/auth/mappers/redirect.mapper';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { StepEnrollmentType } from '@modules/auth/constants/step';
import { LOGIN } from '@commons/constants/navigatie-global';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.page.html',
  styleUrls: ['./enrollment.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class EnrollmentPage extends AbstractEnrollmentComponent {
  private _subs: Subscription[] = [];
  constructor(
    private authSession: AuthSessionService,
    private fb: FormBuilder,
    protected injector: Injector,
    private navCtrl: NavController,
    private securityStorageService: AdlSecureStorageService,
    private translateService: TranslateService
  ) {
    super(injector);
  }

  ionViewWillEnter(): void {
    this._listenStep();
  }

  ionViewDidLeave(): void {
    this.facade.resetAuth();
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
  }

  get stepEnrollmentType(): typeof StepEnrollmentType {
    return StepEnrollmentType;
  }

  public back(): void {
    this.navCtrl.navigateRoot([LOGIN]);
  }

  public showBackButton(step: string): string {
    return step === StepEnrollmentType.FILL_UNIVERSAL_PASSWORD ||
      step === StepEnrollmentType.FILL_CURRENT_CHANNEL_PASSWORD
      ? 'icon-vel-arrows-diagrams-left-2'
      : undefined;
  }

  public showHeader(step: string): boolean {
    return !!step && step !== StepEnrollmentType.COMPLETED;
  }

  public showText(step: string): boolean {
    return (
      !!step &&
      step !== StepEnrollmentType.SERVICE_ERROR &&
      step !== StepEnrollmentType.LIMIT_EXCEED_ON_SECURE_DATA_GENERATION &&
      step !== StepEnrollmentType.LIMIT_EXCEED_ON_OTP_GENERATION
    );
  }

  public showBigHeader(step: string): boolean {
    return (
      step === StepEnrollmentType.FILL_LOGIN_CREDENTIALS ||
      step === StepEnrollmentType.FILL_NEW_CREDENTIALS ||
      step === StepEnrollmentType.FILL_SECURITY_QUESTION ||
      step === StepEnrollmentType.V2_FILL_OTP_DATA ||
      step === StepEnrollmentType.V2_ACCEPT_CHANNEL_POLICIES ||
      step === StepEnrollmentType.FILL_OTP_DATA ||
      step === StepEnrollmentType.FILL_SECURE_DATA
    );
  }

  private _listenStep(): void {
    this._subs.push(
      this.facade.contentEnrollment$
        .pipe(
          filter((state) => !state.loading),
          distinctUntilChanged()
        )
        .subscribe((data) => {
          redirectHome(
            this.facade,
            data,
            this.authSession,
            this.navCtrl,
            this.securityStorageService,
            this.authService,
            this.translateService,
            this.modalService
          );
          this.changeTypeInput();
        })
    );
  }
}
