import { Component, Injector, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Capacitor } from '@capacitor/core';

import { AbstractEnrollmentComponent } from '@modules/auth/pages/abstract-enrollment.component';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS, PERSIST_LIST } from '@commons/constants/global';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { InitAuth } from '@modules/auth/entities/auth.interface';
import { VelocityLoaderComponent } from '@commons/velocity/molecules/velocity-loader/velocity-loader.component';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';

import { environment } from '@environment/environment';
import { GlobalService } from '@commons/services/global.service';
// @ts-ignore
import packageInfo from '../../../../../../package.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage extends AbstractEnrollmentComponent {
  public formLogin: FormGroup;
  public disabled: boolean = false;
  private _information: InitAuth;

  constructor(
    private fb: FormBuilder,
    private securityStorageService: AdlSecureStorageService,
    protected injector: Injector,
    private globalService: GlobalService
  ) {
    super(injector);
  }

  ionViewWillEnter(): void {
    this._initForm();
    this._validRemember();
    this._watchEvents();
  }

  get id(): AbstractControl {
    return this.formLogin.get('id');
  }

  get idFake(): AbstractControl {
    return this.formLogin.get('idFake');
  }

  get hasIdMask(): boolean {
    return this.idFake.value !== '' && !!this.idFake.value;
  }

  get hasForm(): boolean {
    return !!this.formLogin;
  }

  get showCode(): boolean {
    return environment.addDeviceId;
  }

  get version(): string {
    return Capacitor.getPlatform() === 'ios'
      ? packageInfo.versionIos
      : packageInfo.versionAndroid;
  }

  public submitFormLogin(): void {
    if (this.disabled) {
      const { id: idStorage, idType: idTypeStorage } = this._information;
      const { id, idType } = this.formLogin.value;
      idStorage === id &&
        idType === idTypeStorage &&
        this.submitEnrollment(this.formLogin);
    } else {
      this.submitEnrollment(this.formLogin);
    }
  }

  public removeAccount(): void {
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-warning-hex',
        iconType: 'warning',
        type: 'remove-account',
        title: this._translateService.instant(
          'AUTH.LOGIN.MODALS.UNLIKE_DEVICE.TITLE'
        ),
        hasInLineLink: true,
        description: this._translateService.instant(
          'AUTH.LOGIN.MODALS.UNLIKE_DEVICE.DESCRIPTION'
        ),
        secondBtn: this._translateService.instant(
          'AUTH.LOGIN.MODALS.UNLIKE_DEVICE.SECOND_BTN'
        ),
        firstBtn: this._translateService.instant(
          'AUTH.LOGIN.MODALS.UNLIKE_DEVICE.FIRST_BTN'
        ),
        eventSecondBtn: this._removeData.bind(this),
        eventFirstBtn: this.closeModal.bind(this)
      },
      'default-modal'
    );
  }

  private _initForm(): void {
    this.facade.resetAuth();
    this.formLogin = this.fb.group({
      idType: ['CC', Validators.required],
      id: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      idFake: [null]
    });
  }

  private async _validRemember(): Promise<void> {
    try {
      const information = await this.securityStorageService.get(KEYS.REMEMBER);
      this.securityStorageService.remove(KEYS.AUTH_TOKEN);
      if (!isNullOrUndefined(information)) {
        this._information = JSON.parse(information);
        this.formLogin.setValue({
          idType: this._information?.idType || 'CC',
          id: this._information?.id || '',
          idFake: `********${this._information?.id?.slice(-2)}`
        });
        this.disabled = true;
      }
    } catch {}
  }

  private async _removeData(): Promise<void> {
    this.closeModal();
    try {
      await this.modalService.openModal(
        VelocityLoaderComponent,
        {
          text: this._translateService.instant('AUTH.LOGIN.MODALS.LOADING.TEXT')
        },
        'default-modal',
        false
      );
      await this.securityStorageService.clearDB();
      for (const key of PERSIST_LIST) {
        const hasKey = await this.securityStorageService.get(key);
        !!hasKey && (await this.securityStorageService.remove(key, true));
      }
      this.securityService.resetKeys();
      this.formLogin.setValue({
        idType: 'CC',
        id: null,
        idFake: null
      });
      this.disabled = false;
      !!this.modalService.modal && this.modalService.close();
    } catch (e) {
      !!this.modalService.modal && this.modalService.close();
    }
  }

  private _watchEvents(): void {
    !!this.globalService.logOutAuto &&
      this.modalService.openModal(
        ModalGenericComponent,
        {
          icon: 'icon-vel-notification-bell',
          iconType: 'information',
          title: this._translateService.instant('AUTH.TIMELESS_SESSION.TITLE'),
          description: this._translateService.instant(
            'AUTH.TIMELESS_SESSION.DESCRIPTION'
          ),
          firstBtn: this._translateService.instant('UNDERSTOOD'),
          eventFirstBtn: this.closeModal.bind(this)
        },
        'default-modal'
      );
    !!this.globalService.logOutAuto &&
      (this.globalService.setLogOutAuto = false);
  }
}
