import { filter, map, switchMap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';
import { from, Observable, of } from 'rxjs';

import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { IStorageItem } from '@commons/entities/global.entities';
import { KEYS } from '@commons/constants/global';
import { Product } from '@commons/models/product.model';
import { GROUP_ONE } from '@commons/constants/group-products';

export abstract class ConfigGlobalToWhoAbstract {
  protected facadeMainContainer: MainContainerFacade;
  protected securityStorageService: AdlSecureStorageService;
  protected saveDataTemplateService: SaveDataTemplateService;
  protected constructor(protected injector: Injector) {
    this.facadeMainContainer = injector.get(MainContainerFacade);
    this.securityStorageService = injector.get(AdlSecureStorageService);
    this.saveDataTemplateService = injector.get(SaveDataTemplateService);
  }

  protected loadSelectedProduct(
    form: FormGroup,
    property: string,
    products: Observable<Product[]> = null,
    typeProducts: string[] = GROUP_ONE
  ): Observable<Product> {
    return from(this.securityStorageService.get(KEYS.ACTIVE_PRODUCT)).pipe(
      switchMap((product) => {
        let sameProduct: IStorageItem;
        try {
          sameProduct = JSON.parse(product);
        } catch {}
        return !!product &&
          typeProducts.includes(sameProduct?.type?.toUpperCase())
          ? this._setProduct(sameProduct, form, property)
          : this.setFirstProduct(products, form, property);
      })
    );
  }

  protected setFirstProduct(
    products: Observable<Product[]>,
    form: FormGroup,
    property: string
  ): Observable<Product> {
    return !!products
      ? products.pipe(
          filter((data: Product[]) => data.length > 0),
          map((data: Product[]) => {
            form.controls[property].setValue(data[0]);
            return data[0];
          })
        )
      : of(null);
  }

  private _setProduct(
    item: IStorageItem,
    form: FormGroup,
    property: string
  ): Observable<Product> {
    return this.facadeMainContainer.findProduct$(item.id, item.type).pipe(
      map((info) => {
        form.controls[property].setValue(info);
        this.securityStorageService.remove(KEYS.ACTIVE_PRODUCT).then();
        return info;
      })
    );
  }
}
