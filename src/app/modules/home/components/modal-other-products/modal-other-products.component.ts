import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { HomeFacade } from '@modules/home/home.facade';
import { IOtherProduct } from '@modules/home/store/home.state';
import { joinProducts } from '@commons/helpers/joinProducts.helper';
import { IProductsPack } from '@commons/entities/products.entities';
import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'app-modal-other-products',
  templateUrl: './modal-other-products.component.html',
  styleUrls: ['./modal-other-products.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeFacade]
})
export class ModalOtherProductsComponent {
  constructor(
    private facade: HomeFacade,
    private modalService: ModalService,
    private translateService: TranslateService
  ) {}

  get products$(): Observable<IOtherProduct[]> {
    return this.facade.otherProducts$;
  }

  get isLoading$(): Observable<boolean> {
    return this.products$.pipe(
      map(
        (products: IOtherProduct[]) =>
          products?.filter((product) => product.loading).length > 0
      )
    );
  }

  get hasProducts$(): Observable<boolean> {
    return this.products$.pipe(
      map(
        (products: IOtherProduct[]) =>
          products?.reduce(
            (accumulator, currentValue) =>
              accumulator + joinProducts(currentValue?.products).length,
            0
          ) > 0
      )
    );
  }

  public text(product: IOtherProduct): string {
    return product.loading
      ? this.translateService.instant('AVAL_PRODUCTS.PRODUCT.LOADING')
      : product.completed
      ? this.lengthProducts(product?.products) +
        ' ' +
        this.translateService.instant('AVAL_PRODUCTS.PRODUCT.TEXT')
      : this.translateService.instant('AVAL_PRODUCTS.PRODUCT.ERROR');
  }

  public lengthProducts(products: IProductsPack): number {
    return joinProducts(products)?.length;
  }

  public loadOtherBank(bank: string): void {
    this.facade.loadOtherBank(bank);
  }

  public close(): void {
    combineLatest([this.hasProducts$, this.isLoading$])
      .pipe(
        first(),
        map((data) => ({ hasProducts: data[0], isLoading: data[1] }))
      )
      .subscribe((data) => {
        this.facade.changeToggleAval(data.hasProducts && !data.isLoading);
        this.modalService.close();
      });
  }
}
