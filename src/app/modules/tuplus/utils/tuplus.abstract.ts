import { NavController } from '@ionic/angular';
import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';

import { HOME } from '@commons/constants/navigatie-global';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { ModalService } from '@commons/services/modal.service';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { ContAlertComponent } from '@commons/velocity/templates/utils/components/cont-alert/cont-alert.component';

@Injectable()
export abstract class TuplusAbstract {
  public productBasic: IProductBasic;
  public navCtrl: NavController;
  public modalService: ModalService;
  protected fb: FormBuilder;
  protected currencyFormat: CurrencyFormatPipe;
  protected translateService: TranslateService;
  protected typeCreditCard: TypeCreditCardPipe;
  protected imageCdn: ImageCdnPipe;
  protected facade: TuplusFacade;

  protected constructor(protected injector: Injector) {
    this.fb = injector.get(FormBuilder);
    this.currencyFormat = injector.get(CurrencyFormatPipe);
    this.typeCreditCard = injector.get(TypeCreditCardPipe);
    this.modalService = injector.get(ModalService);
    this.imageCdn = injector.get(ImageCdnPipe);
    this.translateService = injector.get(TranslateService);
    this.navCtrl = injector.get(NavController);
    this.facade = injector.get(TuplusFacade);
  }

  public openModal(): void {
    this.modalService.openModal(ContAlertComponent, {
      icon: 'icon-vel-warning-hex',
      iconType: 'warning',
      title: this.translateService.instant('MODAL_LEAVE.TITLE'),
      description: this.translateService.instant('MODAL_LEAVE.DESCRIPTION'),
      firstBtn: this.translateService.instant('MODAL_LEAVE.BTN_FIRST'),
      secondBtn: this.translateService.instant('MODAL_LEAVE.SECOND_BTN'),
      hasInLineLink: true
    });
  }

  public closeModal(): void {
    this.modalService.close();
  }

  public overflowModalButton = () => {
    this.logoutTuplus();
    this.closeModal();
    this.navCtrl.navigateRoot([HOME]);
  };

  public logoutTuplus() {
    this.facade.fetchLogoutTuplus();
  }
}
