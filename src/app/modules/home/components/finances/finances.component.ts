import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { IProductsPack } from '@commons/entities/products.entities';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TranslateService } from '@ngx-translate/core';
import { IFinance } from '@modules/home/entities/finances.entities';
import { FINANCES_PROPERTIES } from '@modules/home/constants/properties-finances.constant';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { financesMapper } from '@modules/home/mappers/finances.mapper';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancesComponent {
  @Input() products: IProductsPack;

  public slideOpts: object = {
    slidesPerView: 'auto',
    centeredSlides: false,
    speed: 400,
    touchReleaseOnEdges: true,
    iOSEdgeSwipeThreshold: 50,
    iOSEdgeSwipeDetection: true
  };

  constructor(
    private currencyFormatPipe: CurrencyFormatPipe,
    private translateService: TranslateService
  ) {}

  get finances(): IFinance[] {
    return this._mapProductsToFinancialResume();
  }

  get hasFinance(): boolean {
    return !!this.finances && this.finances?.length > 0;
  }

  get hasProducts(): boolean {
    return !!this.products;
  }

  public trackByFn(index: number, finance: IFinance): string {
    return trackBy(finance, finance?.type);
  }

  private _mapProductsToFinancialResume(): IFinance[] {
    const values: IFinance[] = Object.keys(FINANCES_PROPERTIES).map((section) =>
      financesMapper(
        this.products,
        section,
        this.translateService,
        this.currencyFormatPipe
      )
    );
    return values.filter((value) => !!value);
  }
}
