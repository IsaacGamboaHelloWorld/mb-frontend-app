import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { ICardOther } from '@modules/home/entities/otherProducts.entities';
import { Product } from '@commons/models/product.model';
import { ICard } from '@commons/entities/card.entities';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { TranslateService } from '@ngx-translate/core';
import { mapperOtherProduct } from '@modules/home/mappers/other-products.mapper';
import { trackBy } from '@commons/helpers/trackBy.helper';

@Component({
  selector: 'app-group-other-products',
  templateUrl: './group-other-products.component.html',
  styleUrls: ['./group-other-products.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupOtherProductsComponent {
  @Input() products: ICardOther[];
  public slideOpts: object = {
    slidesPerView: 'auto',
    centeredSlides: false,
    speed: 400,
    touchReleaseOnEdges: true,
    iOSEdgeSwipeThreshold: 50,
    iOSEdgeSwipeDetection: true
  };
  constructor(
    private translateService: TranslateService,
    private currencyFormat: CurrencyFormatPipe,
    private typeCreditCard: TypeCreditCardPipe,
    private imageCdnPipe: ImageCdnPipe
  ) {}

  public trackByFn(index: number, product: Product): string {
    return trackBy(product, product.id);
  }

  public setProduct(product: Product): ICard {
    return mapperOtherProduct(
      product,
      this.translateService,
      this.currencyFormat,
      this.typeCreditCard,
      this.imageCdnPipe
    );
  }
}
