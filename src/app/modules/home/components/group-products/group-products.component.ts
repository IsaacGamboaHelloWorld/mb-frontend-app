import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { ICard } from '@commons/entities/card.entities';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '@commons/models/product.model';
import { mapperProduct } from '@modules/home/mappers/product.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import {
  IProductBasic,
  IProductNickname
} from '@modules/main-container/entities/main-products.entities';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { NEW_PAYMENT_LOANS } from '@commons/constants/navigatie-global';
import { HomeFacade } from '@modules/home/home.facade';
import { HideShowIdPipe } from '@app/commons/pipes/hide-show-id.pipe';

@Component({
  selector: 'app-group-products',
  templateUrl: './group-products.component.html',
  styleUrls: ['./group-products.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupProductsComponent {
  @Input() typeAccount: string;
  @Input() products: Product[];
  @Input() nicknames: IProductNickname[];
  @Output() retryProduct: EventEmitter<IProductBasic> = new EventEmitter<
    IProductBasic
  >(null);
  @Output() goToDetail: EventEmitter<IProductBasic> = new EventEmitter<
    IProductBasic
  >(null);

  constructor(
    private translateService: TranslateService,
    private currencyFormat: CurrencyFormatPipe,
    private typeCreditCard: TypeCreditCardPipe,
    private imageCdnPipe: ImageCdnPipe,
    private facade: HomeFacade,
    private router: Router,
    private pipeHideId: HideShowIdPipe
  ) {}

  public slideOpts: object = {
    slidesPerView: 'auto',
    centeredSlides: false,
    speed: 400,
    touchReleaseOnEdges: true,
    iOSEdgeSwipeThreshold: 50,
    iOSEdgeSwipeDetection: true
  };

  get hasProducts(): boolean {
    return this.products?.length > 0 && this._validateProduct(this.typeAccount);
  }

  get sufficientSlides(): boolean {
    return this.products?.length > 1;
  }

  get quantityProducts(): number {
    return !!this.products ? this.products?.length : 0;
  }

  public isOnly(products: object[]): boolean {
    return products.length <= 1;
  }

  public neededToPay(product: Product): boolean {
    return Product.getMinimumPayment(product) > 0;
  }

  public progress(product: Product): number {
    return !!product && !this.neededToPay(product)
      ? 100 - product?.capacity
      : 0;
  }

  public trackByFn(index: number, product: Product): string {
    return trackBy(product, product.id);
  }

  public setProduct(product: Product): ICard {
    return mapperProduct(
      product,
      this.nicknames,
      this.translateService,
      this.currencyFormat,
      this.typeCreditCard,
      this.imageCdnPipe,
      this.pipeHideId
    );
  }

  get typeAccounts(): typeof TYPE_ACCOUNTS {
    return TYPE_ACCOUNTS;
  }

  public redirectPay(product: Product): void {
    this.facade.setCreditCard({ id: product?.id, type: product?.typeAccount });
    this.router.navigate([NEW_PAYMENT_LOANS]);
  }

  public toogleHidden(typeAccount: string, id: string) {
    this.facade.toogleHiddenId(typeAccount, id);
  }

  private _validateProduct(typeProduct: string): boolean {
    return (
      typeProduct === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
      typeProduct === TYPE_ACCOUNTS.CREDIT_CARD ||
      typeProduct === TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM ||
      typeProduct === TYPE_ACCOUNTS.CURRENT_ACCOUNT
    );
  }
}
