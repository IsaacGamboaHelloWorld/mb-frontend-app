import { filter, map, take } from 'rxjs/operators';
import { combineLatest, interval, Observable, zip } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthFacade } from '@modules/auth/auth.facade';
import { AuthService } from '@commons/services/auth/auth.service';
import { mapAuthEnrollment } from '@modules/auth/mappers/auth.mapper';
import { IContentAuth, InitAuth } from '@modules/auth/entities/auth.interface';
import { SecurityService } from '@commons/security/services/security.service';
import { ModalService } from '@commons/services/modal.service';
import { ContModalAuthComponent } from '@modules/auth/pages/login/components/cont-modal-auth/cont-modal-auth.component';
import { VelocityLoaderComponent } from '@commons/velocity/molecules/velocity-loader/velocity-loader.component';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';

export abstract class AbstractEnrollmentComponent {
  public modalService: ModalService;
  protected authService: AuthService;
  protected facade: AuthFacade;
  protected securityService: SecurityService;
  protected _translateService: TranslateService;
  protected authTokenService: AuthTokenService;
  private _password: boolean = true;
  private _passwordConfirm: boolean = true;

  protected constructor(protected injector: Injector) {
    this.authService = injector.get(AuthService);
    this.facade = injector.get(AuthFacade);
    this.securityService = injector.get(SecurityService);
    this._translateService = injector.get(TranslateService);
    this.modalService = injector.get(ModalService);
    this.authTokenService = injector.get(AuthTokenService);
  }

  get isLoading$(): Observable<boolean> {
    return this.facade.contentEnrollment$.pipe(map((data) => data.loading));
  }

  get step$(): Observable<string> {
    return this.facade.contentEnrollment$.pipe(
      map((data) => data?.content?.step)
    );
  }

  get information$(): Observable<InitAuth> {
    return this.facade.contentEnrollment$.pipe(
      map((data) => data?.information)
    );
  }

  get isPassword(): boolean {
    return this._password;
  }

  get isPasswordConfirm(): boolean {
    return this._passwordConfirm;
  }

  public closeModal(): void {
    this.modalService.close();
  }

  public changeTypeInput(): void {
    this._password = !this._password;
  }

  public changeTypeInputConfirm(): void {
    this._passwordConfirm = !this._passwordConfirm;
  }

  public submitEnrollment(
    form: FormGroup,
    excludeValidate: boolean = false
  ): void {
    (excludeValidate || form.valid) && this.submitForm(form.value);
  }

  public minDelay(): void {
    this._openLoader();

    const subs = combineLatest([this.isLoading$, interval(2000)])
      .pipe(filter(([isLoading, time]) => !isLoading))
      .subscribe(() => {
        this.modalService.modal && this.modalService.close();
        subs.unsubscribe();
      });
  }

  protected submitForm(form: IContentAuth): void {
    this.facade.setLoadingAuth();
    zip(
      this.securityService.initializeSecurityKeys$(),
      this.authService.getServerPublicKey(),
      this.facade.contentEnrollment$
    )
      .pipe(take(1))
      .subscribe(
        ([security, key, enrollment]) => {
          mapAuthEnrollment(
            enrollment.content,
            form,
            key.publicKey,
            this.facade,
            this.authService
          );
        },
        (_) => {
          this.facade.setErrorAuth();
          this.modalOpen();
        }
      );
  }

  protected mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      matchingControl.setErrors(
        control.value !== matchingControl.value ? { mustMatch: true } : null
      );
    };
  }

  private modalOpen(): void {
    this.modalService.openModal(ContModalAuthComponent, {
      title: this._translateService.instant('AUTH.ERROR.TITLE'),
      description: this._translateService.instant('AUTH.ERROR.DESCRIPTION'),
      firstBtn: this._translateService.instant('AUTH.ERROR.BTN')
    });
  }

  private _openLoader(): void {
    this.modalService.openModal(
      VelocityLoaderComponent,
      {},
      'default-modal',
      false
    );
  }
}
