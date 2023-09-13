import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

import { IPocket, IPocketsByProduct } from '@commons/entities/pockets.entities';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { KEYS, MAXIMUM_NUMBER_OF_POCKETS } from '@commons/constants/global';
import { Product } from '@commons/models/product.model';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { ModalService } from '@commons/services/modal.service';
import { ContModalPocketHomeComponent } from '@modules/pockets/pages/home-pockets/components/cont-modal-pocket-home/cont-modal-pocket-home.component';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import {
  POCKETS_CREATE,
  POCKETS_EDIT,
  POCKETS_MOVE,
  PRODUCT_DETAIL
} from '@commons/constants/navigatie-global';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';

@Component({
  selector: 'app-home-pockets',
  templateUrl: './home-pockets.page.html',
  styleUrls: ['./home-pockets.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomePocketsPage implements OnInit {
  public pocketsByProduct: IPocket[] = [];
  private productBasic: IProductBasic;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected injector: Injector,
    private facade: PocketsFacade,
    private modalService: ModalService,
    private translateService: TranslateService,
    private securityStorageService: AdlSecureStorageService,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this._getShowModalPocketsSecureStorage();
  }

  ionViewWillLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get pocket$(): Observable<IPocketsByProduct> {
    return this.facade.findPocket$(
      this.productBasic?.id,
      this.productBasic?.type
    );
  }

  get pocketsByProduct$(): Observable<IPocket[]> {
    return this.facade.findPocketsByProduct$(
      this.productBasic?.id,
      this.productBasic?.type
    );
  }

  get hasMaximumNumberOfPockets$(): Observable<boolean> {
    return this.pocketsByProduct$.pipe(
      map((pockets) => pockets?.length >= MAXIMUM_NUMBER_OF_POCKETS)
    );
  }

  get productsByType$(): Observable<Product[]> {
    return this.facade
      .filterProducts$([this.productBasic?.type.toUpperCase()])
      .pipe(
        map((products) =>
          products.filter((product) => product.couldHavePockets)
        )
      );
  }

  public async back(): Promise<void> {
    this.navCtrl.navigateForward([PRODUCT_DETAIL]);
  }

  public goToCreate(): void {
    this.pocketsByProduct$
      .pipe(first())
      .subscribe((data) =>
        data.length < MAXIMUM_NUMBER_OF_POCKETS
          ? this.navCtrl.navigateForward(POCKETS_CREATE)
          : this._openLimitModal()
      );
  }

  public showPockets(product?: Product): void {
    this.productBasic = product
      ? { id: product.id, type: product.typeAccount }
      : this.productBasic;

    this._saveSecureStorage(this.productBasic.id, this.productBasic.type);
  }

  public productById$(): Observable<Product> {
    return this.facade.findProduct$(
      this.productBasic?.id,
      this.productBasic?.type
    );
  }

  public textNewPocket(): string {
    return this.pocketsByProduct.length >= 1
      ? 'POCKETS.NEW_POCKET'
      : 'POCKETS.NEW_FIRST_POCKET';
  }

  public goalIsAccomplished(pocket: IPocket): boolean {
    return +pocket.amountSaved >= +pocket.savingGoal;
  }

  public textHave(pocket: IPocket): string {
    return this.goalIsAccomplished(pocket)
      ? 'POCKETS.GOAL_ACCOMPLISHED'
      : 'POCKETS.I_HAVE';
  }

  private _openModalInit(): void {
    this._getProductSecureStorage();
    this.modalService.openModal(
      ContModalPocketHomeComponent,
      {
        title: this.translateService.instant('POCKETS.MODAL_TERMS.TITLE'),
        firstDescription: this.translateService.instant(
          'POCKETS.MODAL_TERMS.TERMS.ONE'
        ),
        secondDescription: this.translateService.instant(
          'POCKETS.MODAL_TERMS.TERMS.TWO'
        ),
        thirdDescription: this.translateService.instant(
          'POCKETS.MODAL_TERMS.TERMS.THREE'
        ),
        checkboxText: this.translateService.instant(
          'POCKETS.MODAL_TERMS.CHECKBOX'
        ),
        textBtn: this.translateService.instant('POCKETS.MODAL_TERMS.BTN')
      },
      'wide-modal',
      false
    );
  }

  private _openLimitModal(): void {
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-notification-bell',
        iconType: 'information',
        title: this.translateService.instant(
          'POCKETS.MAXIMUM_POCKETS_MODAL.TITLE'
        ),
        description: this.translateService.instant(
          'POCKETS.MAXIMUM_POCKETS_MODAL.DESCRIPTION'
        ),
        firstBtn: this.translateService.instant(
          'POCKETS.MAXIMUM_POCKETS_MODAL.BUTTON'
        )
      },
      'default-modal',
      false,
      true
    );
  }

  private async _getProductSecureStorage(): Promise<void> {
    const activeProduct = await this.securityStorageService.get(
      KEYS.ACTIVE_PRODUCT
    );
    if (!!activeProduct) {
      this.productBasic = JSON.parse(activeProduct);
    }
  }

  private async _getShowModalPocketsSecureStorage(): Promise<void> {
    await this._getProductSecureStorage();
    const showModal = await this.securityStorageService.get(
      KEYS.SHOW_MODAL_POCKETS
    );
    ((!!showModal && showModal === 'true') || !showModal) &&
      this._openModalInit();
  }

  private async _saveSecureStorage(id: string, type: string): Promise<void> {
    await this.securityStorageService.put(
      KEYS.ACTIVE_PRODUCT,
      JSON.stringify({
        id,
        type
      })
    );
  }

  public async navigateTo(pocket: IPocket, route: string): Promise<void> {
    await this.securityStorageService.put(KEYS.ACTIVE_POCKET, pocket.pocketId);
    route === 'edit'
      ? this.navCtrl.navigateForward([POCKETS_EDIT])
      : this.navCtrl.navigateForward([POCKETS_MOVE]);
  }
}
