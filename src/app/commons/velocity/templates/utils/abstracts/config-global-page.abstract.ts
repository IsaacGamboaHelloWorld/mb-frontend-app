import { Injectable, Injector, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Subject } from 'rxjs';

import { ModalService } from '@commons/services/modal.service';
import { ContAlertComponent } from '@commons/velocity/templates/utils/components/cont-alert/cont-alert.component';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { TranslateService } from '@ngx-translate/core';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';

@Injectable()
export abstract class ConfigGlobalPageAbstractContainer {
  @ViewChild(IonContent) ionContent: IonContent;

  public modalService: ModalService;
  public configTemplate: ConfigTemplateService;
  protected translateService: TranslateService;
  protected securityStorageService: AdlSecureStorageService;
  protected _destroy$: Subject<boolean> = new Subject<boolean>();
  protected constructor(protected injector: Injector) {
    this.modalService = injector.get(ModalService);
    this.configTemplate = injector.get(ConfigTemplateService);
    this.translateService = injector.get(TranslateService);
    this.securityStorageService = injector.get(AdlSecureStorageService);
  }

  public iconRight(step: number = 4): string {
    return this.configTemplate.step <= step
      ? 'icon-vel-essential-delete-2'
      : undefined;
  }

  public iconLeft(step: number = 4): string {
    return this.configTemplate.step <= step
      ? 'icon-vel-arrows-diagrams-left-2'
      : undefined;
  }

  public back(): void {
    this.configTemplate.back();
  }

  public openModal(title?: string, description?: string): void {
    this.modalService.openModal(ContAlertComponent, {
      icon: 'icon-vel-warning-hex',
      iconType: 'warning',
      title: this.translateService.instant(title ? title : 'MODAL_LEAVE.TITLE'),
      description: this.translateService.instant(
        description ? description : 'MODAL_LEAVE.DESCRIPTION'
      ),
      firstBtn: this.translateService.instant('MODAL_LEAVE.BTN_FIRST'),
      secondBtn: this.translateService.instant('MODAL_LEAVE.SECOND_BTN'),
      hasInLineLink: true
    });
  }

  protected async resetActiveProduct(): Promise<void> {
    const activeProduct = await this.securityStorageService.get(
      KEYS.ACTIVE_PRODUCT
    );
    !!activeProduct &&
      (await this.securityStorageService.remove(KEYS.ACTIVE_PRODUCT));
  }
}
