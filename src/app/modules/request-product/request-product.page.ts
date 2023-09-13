import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';

import {
  HOME,
  PRODUCTS_REQUEST_INFORMATION
} from '@commons/constants/navigatie-global';
import {
  IRequestProductCardItem,
  REQUEST_PRODUCTS_ITEMS
} from './constants/request-product.constant';
import { PageOpenAccountService } from '@commons/velocity/pages/utils/page-open-account.service';
import {
  REQUEST_CREDIT_CARD,
  REQUEST_DEPOSIT_ACCOUNT
} from '@commons/constants/open-new-products';
import { ConfigPageOpenAccountAbstract } from '@commons/velocity/pages/utils/config-page-open-account.abstract';

@Component({
  selector: 'app-request-product',
  templateUrl: './request-product.page.html',
  styleUrls: ['./request-product.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RequestProductPage extends ConfigPageOpenAccountAbstract {
  constructor(
    private navController: NavController,
    private pageOpenAccountService: PageOpenAccountService,
    protected injector: Injector
  ) {
    super(injector);
  }

  get productsItems(): IRequestProductCardItem[] {
    return REQUEST_PRODUCTS_ITEMS;
  }

  public async navigateTo(event: string): Promise<void> {
    switch (event) {
      case 'DEPOSIT_ACCOUNT':
        this.pageOpenAccountService.params = {
          ...REQUEST_DEPOSIT_ACCOUNT,
          url: await this.getUrl(REQUEST_DEPOSIT_ACCOUNT.baseUrl, true)
        };
        break;
      case 'CREDIT_CARD':
        this.pageOpenAccountService.params = REQUEST_CREDIT_CARD;
      default:
        break;
    }
    this.navController.navigateForward([PRODUCTS_REQUEST_INFORMATION]);
  }

  public back(): void {
    this.navController.navigateRoot([HOME]);
  }
}
