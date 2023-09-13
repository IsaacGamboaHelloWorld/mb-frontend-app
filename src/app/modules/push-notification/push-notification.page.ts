import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, first } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';

import { HOME } from '@commons/constants/navigatie-global';
import { ModalService } from '@commons/services/modal.service';
import { registerMapper } from '@modules/push-notification/mappers/push.mapper';
import { PushNotificationFacade } from '@modules/push-notification/push-notification.facade';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { IRegisterPush } from '@modules/push-notification/store/push.state';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { TYPE_MODAL_PUSH } from '@modules/push-notification/constants/type-modal.constant';
import { VelocityLoaderComponent } from '@commons/velocity/molecules/velocity-loader/velocity-loader.component';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.page.html',
  styleUrls: ['./push-notification.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PushNotificationPage {
  private _subs: Subscription[] = [];
  private _listener: PluginListenerHandle;
  private _token: string;
  constructor(
    private facade: PushNotificationFacade,
    private navCtrl: NavController,
    private modalService: ModalService,
    private securityStorage: AdlSecureStorageService,
    private translateService: TranslateService
  ) {}

  ionViewWillEnter(): void {
    this._validateKey();
    this._watchEvents();
  }

  ionViewDidLeave(): void {
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
    !!this._listener && this._listener.remove();
  }

  get enable$(): Observable<IRegisterPush> {
    return this.facade.registerPush$;
  }

  public back(): void {
    this.navCtrl.navigateForward([HOME]);
  }

  public toggleCheck(enable: boolean): void {
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-warning-hex',
        iconType: 'warning',
        type: enable ? TYPE_MODAL_PUSH.disabled : TYPE_MODAL_PUSH.enabled,
        title: this.translateService.instant(
          enable
            ? 'PUSH_NOTIFICATION.MODAL.DISABLED.TITLE'
            : 'PUSH_NOTIFICATION.MODAL.ENABLE.TITLE'
        ),
        hasInLineLink: true,
        description: this.translateService.instant(
          enable
            ? 'PUSH_NOTIFICATION.MODAL.DISABLED.DESCRIPTION'
            : 'PUSH_NOTIFICATION.MODAL.ENABLE.DESCRIPTION'
        ),
        secondBtn: this.translateService.instant('CANCEL'),
        firstBtn: this.translateService.instant(
          enable
            ? 'PUSH_NOTIFICATION.MODAL.DISABLED.BTN'
            : 'PUSH_NOTIFICATION.MODAL.ENABLE.BTN'
        )
      },
      'default-modal'
    );
  }

  private async _validateKey(): Promise<void> {
    try {
      const key = await this.securityStorage.get(KEYS.PUSH);
      !!key && this.facade.togglePush(true);
      if (Capacitor.getPlatform() !== 'web') {
        PushNotifications.requestPermissions().then(({ receive }) => {
          receive === 'granted' && PushNotifications.register();
        });

        this._listener = PushNotifications.addListener(
          'registration',
          ({ value }: Token) => (this._token = value)
        );
      }
    } catch {}
  }

  private _watchEvents(): void {
    this._subs.push(
      this.modalService.actionButtonModal$.subscribe(
        (_) => !!this.modalService.modal && this.modalService.close(_)
      )
    );

    this._subs.push(
      this.modalService.actionCloseModal$
        .pipe(
          filter(
            (data) =>
              (data?.props?.type === TYPE_MODAL_PUSH.enabled ||
                data?.props?.type === TYPE_MODAL_PUSH.disabled) &&
              data?.value === STATUS_BUTTONS.primary
          )
        )
        .subscribe(async (data) => {
          if (data?.props?.type === TYPE_MODAL_PUSH.enabled) {
            const register = await registerMapper(this._token);
            this.facade.fetchRegisterPush(register);
          } else {
            this.facade.fetchDeletePush();
          }

          await this.modalService.openModal(
            VelocityLoaderComponent,
            {},
            'default-modal',
            false
          );
          combineLatest([this.facade.registerPush$, interval(2000)])
            .pipe(
              filter(([push, _]) => push.completed || push.error),
              first()
            )
            .subscribe(
              () => !!this.modalService.modal && this.modalService.close()
            );
        })
    );
  }
}
