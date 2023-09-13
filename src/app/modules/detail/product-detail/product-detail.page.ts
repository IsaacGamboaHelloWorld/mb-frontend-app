import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { delay, first, map, takeUntil } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

import { SecurityService } from '@commons/security/services/security.service';
import { ProductDetailFacade } from '@modules/detail/product-detail/product-detail.facade';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { Product } from '@commons/models/product.model';
import {
  IProductDetail,
  IProductDetailInformation,
  IProductDetailService,
  IRange
} from '@modules/detail/product-detail/entities/product-detail.entities';
import {
  findInfoProduct,
  findMovements
} from '@modules/detail/product-detail/helpers/detail-product.helper';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { HideShowIdPipe } from '@commons/pipes/hide-show-id.pipe';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { IMovementsState } from '@modules/detail/product-detail/store/states/movements.state';
import { ModalService } from '@commons/services/modal.service';
import { VelocityProductDetailCardComponent } from '@commons/velocity/molecules/velocity-product-detail-card/velocity-product-detail-card.component';
import { pocketMapper } from '@modules/detail/product-detail/mappers/pocket.mapper';
import { IPocketsState } from '@modules/main-container/store/states/products.state';
import { AdlSecureStorageService } from '@app/commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { ContModalPocketsComponent } from '@modules/detail/product-detail/components/cont-modal-pockets/cont-modal-pockets.component';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { IPayrollLoans } from '@commons/entities/pay-rolls-loans.entities';
import { IMovements } from '@modules/detail/product-detail/entities/movements.entities';
import {
  movementsFreeDestination,
  movementsPayLoans
} from '@modules/detail/product-detail/mappers/movements.mapper';
import { IPocketsByProduct } from '@commons/entities/pockets.entities';
import { serviceRedirectDetail } from '@modules/detail/product-detail/helpers/service-redirect.helper';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';
import { GROUP_ONE } from '@commons/constants/group-products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailPage {
  public productBasic: IProductBasic;
  private _showFilter: boolean = false;
  protected _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private security: SecurityService,
    private facade: ProductDetailFacade,
    private translateService: TranslateService,
    private currencyFormat: CurrencyFormatPipe,
    private typeCreditCard: TypeCreditCardPipe,
    private imageCdnPipe: ImageCdnPipe,
    private modalService: ModalService,
    private navCtrl: NavController,
    private securityStorageService: AdlSecureStorageService,
    private cd: ChangeDetectorRef,
    private pipeHideId: HideShowIdPipe
  ) {}

  ionViewWillEnter(): void {
    this.cd.markForCheck();
    this.securityStorageService.get(KEYS.DETAIL_PRODUCT).then((product) => {
      !!product && (this.productBasic = JSON.parse(product));
      this.cd.markForCheck();
      !!product &&
        this._saveSecureStorage(this.productBasic.id, this.productBasic.type);
      !!product &&
        !this.isFinance &&
        this.facade.fetchMovements(
          this.productBasic?.type.toUpperCase(),
          this.productBasic?.id
        );
      !!product && this._loadPockets();
    });
    this.modalService.actionButtonModal$
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (data) => !!this.modalService.modal && this.modalService.close()
      );
  }

  ionViewWillLeave(): void {
    this.facade.resetMovements();
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get product$(): Observable<Product | IPayrollLoans | IFreeDestinationDetail> {
    return this.isFinance
      ? this._findCredits()
      : this.facade.findProduct$(
          this.productBasic?.id,
          this.productBasic?.type
        );
  }

  get isFinance(): boolean {
    return (
      this.productBasic?.type?.toUpperCase() === TYPE_ACCOUNTS.PAYDAY_LOAN ||
      this.productBasic?.type?.toUpperCase() === TYPE_ACCOUNTS.FREE_DESTINATION
    );
  }

  get pockets$(): Observable<IPocketsState> {
    return this.facade.pockets$;
  }

  get pocket$(): Observable<IPocketsByProduct> {
    return this.facade.findPocket$(
      this.productBasic?.id,
      this.productBasic?.type.toUpperCase()
    );
  }

  get hasProduct(): boolean {
    return !!this.productBasic;
  }

  get movements$(): Observable<IMovementsState> {
    return this.facade.movements$;
  }

  get showFilter(): boolean {
    return this._showFilter;
  }

  get complementary$(): Observable<boolean> {
    return this.facade.complementary$;
  }

  get productsAccount(): Observable<Product[]> {
    return this.facade.filterProducts$(GROUP_ONE);
  }

  public setMovements(
    movements: IMovementsState,
    product: Product | IPayrollLoans | IFreeDestinationDetail = null
  ): IMovements {
    if (
      (product as IPayrollLoans)?.accountType?.toUpperCase() ===
      TYPE_ACCOUNTS.PAYDAY_LOAN
    ) {
      return movementsPayLoans(
        this.translateService,
        this.currencyFormat,
        product as IPayrollLoans
      );
    } else if (
      (product as IFreeDestinationDetail)?.productType?.toUpperCase() ===
      TYPE_ACCOUNTS.FREE_DESTINATION
    ) {
      return movementsFreeDestination(
        this.translateService,
        this.currencyFormat,
        product as IFreeDestinationDetail
      );
    } else {
      return findMovements(
        this.translateService,
        this.currencyFormat,
        movements
      );
    }
  }

  public productDetail(
    product: Product | IPayrollLoans | IFreeDestinationDetail,
    loading: boolean = false,
    complementaryServices?: boolean,
    products: Product[] = []
  ): IProductDetail {
    return findInfoProduct(
      product,
      loading,
      this.translateService,
      this.currencyFormat,
      this.typeCreditCard,
      this.imageCdnPipe,
      complementaryServices,
      products,
      this.pipeHideId
    );
  }

  public trackByServices(
    index: number,
    service: IProductDetailService
  ): string {
    return trackBy(service, service.type);
  }

  public doRefresh(event: any): void {
    !!this.productBasic &&
      this.facade.fetchProduct(
        this.productBasic?.type.toUpperCase(),
        this.productBasic?.id
      );
    !!this.productBasic &&
      this.facade.fetchMovements(
        this.productBasic.id,
        this.productBasic.type.toUpperCase()
      );

    this.product$
      .pipe(first(), delay(2000))
      .subscribe((_) => event?.target?.complete());
  }

  public fetchMovements(range: IRange = { from: '', to: '' }): void {
    this.facade.fetchMovements(
      this.productBasic?.type.toUpperCase(),
      this.productBasic?.id,
      range.from,
      range.to
    );
  }

  public openDetailModal(productDetail: IProductDetailInformation): void {
    this.modalService.openModal(
      VelocityProductDetailCardComponent,
      {
        product: productDetail,
        footnotes: this.translateService.instant(
          'PRODUCTS.CREDIT_CARD.NOTES_TO_APPLY_CONDITIONS'
        )
      },
      'wide-modal'
    );
  }

  public toggleFilters(): void {
    this._showFilter = !this._showFilter;
  }

  public actionService(service: IProductDetailService, product: Product): void {
    serviceRedirectDetail.bind(this)(
      service,
      product,
      this.securityStorageService
    );
  }

  public showPockets(): void {
    this.pocket$.pipe(first()).subscribe((data: IPocketsByProduct) => {
      !data &&
        (data = {
          parent: {
            accountIdentifier: this.productBasic.id,
            productType: 'DEPOSIT_ACCOUNT'
          },
          totalSavedOnPockets: 0
        });
      this.modalService.openModal(
        ContModalPocketsComponent,
        {
          product: pocketMapper(
            data,
            this.translateService,
            this.currencyFormat
          ),
          btn: this.translateService.instant(
            'PRODUCTS.DEPOSIT_ACCOUNT.LINK_POCKETS'
          )
        },
        'wide-modal'
      );
    });
  }

  public contentLength(
    product: Product | IPayrollLoans | IFreeDestinationDetail
  ): number {
    return (product as IFreeDestinationDetail)?.productType?.toUpperCase() ===
      TYPE_ACCOUNTS.FREE_DESTINATION
      ? 5
      : 4;
  }
  public toogleHidden(typeAccount: string, id: string) {
    this.facade.toogleHiddenId(typeAccount, id);
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

  private _loadPockets(): void {
    this.facade
      .findProduct$(this.productBasic?.id, this.productBasic?.type)
      .pipe(
        first(),
        map((product) => product?.couldHavePockets)
      )
      .subscribe((data) => !!data && this.facade.fetchPockets());
  }

  private _findCredits(): Observable<IPayrollLoans | IFreeDestinationDetail> {
    return this.productBasic?.type?.toUpperCase() ===
      TYPE_ACCOUNTS.FREE_DESTINATION
      ? this.facade.findFreeDestination$(
          this.productBasic?.id,
          this.productBasic?.type?.toUpperCase()
        )
      : this.facade.findPayLoan$(
          this.productBasic?.id,
          this.productBasic?.type?.toUpperCase()
        );
  }
}
