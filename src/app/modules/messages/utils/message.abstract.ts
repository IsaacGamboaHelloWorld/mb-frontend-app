import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';

import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { MessagesFacade } from '@modules/messages/messages.facade';
import { ModalService } from '@commons/services/modal.service';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { sameDay } from '@commons/helpers/global.helper';

@Injectable()
export class MessageAbstract {
  public modalService: ModalService;
  protected _destroy$: Subject<boolean> = new Subject<boolean>();
  protected translateService: TranslateService;
  protected facade: MessagesFacade;
  protected navCtrl: NavController;
  protected secureStorage: AdlSecureStorageService;

  constructor(protected injector: Injector) {
    this.facade = injector.get(MessagesFacade);
    this.modalService = injector.get(ModalService);
    this.translateService = injector.get(TranslateService);
    this.navCtrl = injector.get(NavController);
    this.secureStorage = injector.get(AdlSecureStorageService);
  }

  public openModal(method: () => void): void {
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-warning-hex',
        iconType: 'warning',
        type: 'delete-messages',
        title: this.translateService.instant('MESSAGES.MODAL.TITLE'),
        hasInLineLink: true,
        description: this.translateService.instant(
          'MESSAGES.MODAL.DESCRIPTION'
        ),
        secondBtn: this.translateService.instant('BACK'),
        firstBtn: this.translateService.instant(
          'POCKETS.EDIT.MODAL_DELETE.DELETE_BTN'
        ),
        eventFirstBtn: method.bind(this)
      },
      'default-modal',
      false,
      true
    );
  }

  public isSameDate(date: string = ''): boolean {
    return sameDay(new Date(date), new Date());
  }

  public back(url: string): void {
    this.navCtrl.navigateBack([url]);
  }
}
