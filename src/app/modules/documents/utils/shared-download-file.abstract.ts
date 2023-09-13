import { NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Injector } from '@angular/core';

import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { KEYS } from '@commons/constants/global';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { HOME } from '@commons/constants/navigatie-global';
import { Product } from '@commons/models/product.model';
import { IProductCardSmall } from '@commons/entities/products.entities';
import { productCardSmallMapper } from '@modules/documents/mappers/documents.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TranslateService } from '@ngx-translate/core';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { first } from 'rxjs/operators';

export abstract class SharedDownloadFileAbstract {
  public productBasic: IProductBasic;
  public navCtr: NavController;
  protected fb: FormBuilder;
  protected currencyFormat: CurrencyFormatPipe;
  protected translateService: TranslateService;
  protected typeCreditCard: TypeCreditCardPipe;
  protected imageCdn: ImageCdnPipe;
  private _facade: MainContainerFacade;
  private securityStorageService: AdlSecureStorageService;
  protected constructor(protected injector: Injector) {
    this.fb = injector.get(FormBuilder);
    this.currencyFormat = injector.get(CurrencyFormatPipe);
    this.typeCreditCard = injector.get(TypeCreditCardPipe);
    this.imageCdn = injector.get(ImageCdnPipe);
    this.translateService = injector.get(TranslateService);
    this.navCtr = injector.get(NavController);
    this._facade = injector.get(MainContainerFacade);
    this.securityStorageService = injector.get(AdlSecureStorageService);
  }

  public async detailProduct(): Promise<IProductBasic> {
    const product = await this.securityStorageService.get(KEYS.DETAIL_PRODUCT);
    return !!product ? JSON.parse(product) : null;
  }

  public infoProductCardSmall(product: Product): IProductCardSmall {
    return productCardSmallMapper.bind(this)(product);
  }

  public back(): void {
    this._facade.beforeUrl$
      .pipe(first())
      .subscribe((url) =>
        this.navCtr.navigateBack(url, { animationDirection: 'back' }).then()
      );
  }

  public goHome(): void {
    this.navCtr.navigateForward([HOME]);
  }
}
