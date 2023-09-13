import {
  Component,
  Injector,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { filter, first, map } from 'rxjs/operators';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';

import { HomeFacade } from '@modules/home/home.facade';
import { IProductsPack } from '@commons/entities/products.entities';
import { trackBy } from '@commons/helpers/trackBy.helper';
import {
  joinOtherProducts,
  joinProducts
} from '@commons/helpers/joinProducts.helper';
import {
  IPayRollLoansState,
  IProductsState
} from '@modules/main-container/store/states/products.state';
import { ORDER_PRODUCTS } from '@commons/constants/order_products';
import {
  IProductBasic,
  IProductNickname
} from '@modules/main-container/entities/main-products.entities';
import { SecurityService } from '@app/commons/security/services/security.service';
import {
  MESSAGES,
  PRODUCT_DETAIL
} from '@app/commons/constants/navigatie-global';
import { ICardOther } from '@modules/home/entities/otherProducts.entities';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { initGreeting } from '@commons/helpers/greetings.helper';
import { SPECIAL_DATES } from '@commons/constants/special-dates';
import { TranslateService } from '@ngx-translate/core';
import { ModalOtherProductsComponent } from '@modules/home/components/modal-other-products/modal-other-products.component';
import { ModalService } from '@commons/services/modal.service';
import { environment } from '@environment/environment';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { ConfigPageOpenAccountAbstract } from '@app/commons/velocity/pages/utils/config-page-open-account.abstract';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage extends ConfigPageOpenAccountAbstract {
  @ViewChild(IonContent) ionContent: IonContent;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private facade: HomeFacade,
    private navCtrl: NavController,
    private security: SecurityService,
    private securityStorageService: AdlSecureStorageService,
    private translateService: TranslateService,
    private menuCtrl: MenuController,
    private router: Router,
    private modalService: ModalService,
    protected injector: Injector
  ) {
    super(injector);
  }

  ionViewDidLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get otherProducts$(): Observable<ICardOther[]> {
    return this.facade.otherProducts$.pipe(
      map((products) =>
        products.reduce(
          (accumulator, currentValue) =>
            accumulator.concat(joinOtherProducts(currentValue?.products)),
          []
        )
      )
    );
  }

  get products$(): Observable<IProductsPack> {
    return this.facade.combinationProducts$.pipe(
      filter((data) => !!data),
      map((keys) => {
        Object.keys(keys).forEach((product) => {
          !ORDER_PRODUCTS.some((key) => product.includes(key)) &&
            delete keys[product];
        });
        return keys;
      })
    );
  }

  get nicknames$(): Observable<IProductNickname[]> {
    return this.facade.nicknames$.pipe(
      filter((_data) => _data.completed),
      map((data) => data.nicknames)
    );
  }

  get showOtherProducts$(): Observable<boolean> {
    return this.facade.toggleProducts$;
  }

  get hiddenNavBar$(): Observable<boolean> {
    return this.facade.hiddenNavBar$;
  }

  get hasErrorProducts$(): Observable<boolean> {
    return this.facade.hasErrorProducts$;
  }

  get infoProducts$(): Observable<IProductsState> {
    return this.facade.productList$;
  }

  get payrollLoanCreditType(): string {
    return TYPE_ACCOUNTS.PAYDAY_LOAN;
  }

  get freeDestinationCreditType(): string {
    return TYPE_ACCOUNTS.FREE_DESTINATION;
  }

  get payRollLoans$(): Observable<IPayRollLoansState> {
    return this.facade.payRollLoans$.pipe(
      map((data) => ({
        ...data,
        rollLoans: data?.rollLoans.filter(
          (item) => item?.status?.split('-')[1].trim() !== 'CANCELADO'
        )
      }))
    );
  }

  get freeDestination$(): Observable<IFreeDestinationDetail[]> {
    return this.facade.freeDestinationDetails$;
  }

  get hasProducts$(): Observable<boolean> {
    return this.products$.pipe(
      filter((data) => !!data),
      map((products: IProductsPack) => joinProducts(products).length > 0)
    );
  }

  get greeting(): string {
    return initGreeting(
      this.translateService.instant('GREETINGS.MORNING'),
      this.translateService.instant('GREETINGS.AFTERNOON'),
      this.translateService.instant('GREETINGS.NIGHT'),
      this.translateService.instant('GREETINGS.BIRTHDAY'),
      SPECIAL_DATES,
      this.translateService
    );
  }

  get customerName$(): Observable<string> {
    return this.facade.dataUser$.pipe(
      filter((data) => !!data && data?.success),
      map((userData) => userData?.shortName)
    );
  }

  get hasOtherCards$(): Observable<boolean> {
    return combineLatest([
      this.facade.tuplusBalance$,
      this.facade.stocksType$
    ]).pipe(
      map(
        (products) => !!products[0]?.information || !!products[1]?.information
      )
    );
  }

  get isCheckAval$(): Observable<boolean> {
    return this.facade.toggleProducts$;
  }

  get isCheckCredits$(): Observable<boolean> {
    return this.facade.toggleCredits$;
  }

  get urlOpenDepositAccount(): string {
    return environment.external_url.openDepositAccount;
  }

  get urlOpenCDT(): string {
    return environment.external_url.openCDT;
  }

  get urlOpenTC(): string {
    return environment.external_url.request_credit_card;
  }

  get showAccounts(): boolean {
    return environment.showOpenAccounts;
  }

  get showComplementaryCard$(): Observable<boolean> {
    return this.facade.couldHaveComplementary$;
  }

  public trackByFn(index: number, item: { key: string }): string {
    return trackBy(item, item.key);
  }

  public fetchProducts(): void {
    this.facade.fetchLoadProducts();
  }

  public retryProduct(product: IProductBasic): void {
    this.facade.fetchProduct(product.type, product.id);
  }

  public async goToDetail(product: IProductBasic): Promise<void> {
    const detailProduct: object = {
      type: product.type.toLowerCase(),
      id: product.id
    };

    await this.securityStorageService.put(
      KEYS.DETAIL_PRODUCT,
      JSON.stringify(detailProduct),
      Capacitor.platform === 'web'
    );
    this.navCtrl.navigateRoot([PRODUCT_DETAIL]);
  }

  public goToMessages(): void {
    this.router.navigate([MESSAGES]);
  }

  public toggleMenu(): void {
    this.menuCtrl.toggle();
  }

  public openModalAval(): void {
    this.facade.toggleProducts$.pipe(first()).subscribe((data) => {
      if (data) {
        this.facade.changeToggleAval(false);
      } else {
        this.facade.loadOtherBanks();
        this.modalService.openModal(
          ModalOtherProductsComponent,
          {},
          'default-modal',
          false
        );
      }
    });
  }

  public toggleRollLoans(): void {
    this.facade.toggleCredits$.pipe(first()).subscribe((data) => {
      if (data) {
        this.facade.changeToggleCredits(false);
      } else {
        this.facade.fetchRollLoans();
        this.facade.fetchFreeDestination();
        this.facade.changeToggleCredits(true);
      }
    });
  }

  public fetchRollLoans(): void {
    this.facade.fetchRollLoans();
  }

  public fetchFreeDestination(): void {
    this.facade.fetchFreeDestination();
  }
}
