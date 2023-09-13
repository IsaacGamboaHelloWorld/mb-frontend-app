import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { BlockProductsFacade } from '@modules/block-product/block-products.facade';
import { Product } from '@commons/models/product.model';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { PageOpenAccountService } from '@commons/velocity/pages/utils/page-open-account.service';
import { HOME } from '@commons/constants/navigatie-global';
import { environment } from '@environment/environment';
import { ModalService } from '@commons/services/modal.service';
import { ModalBlockComponent } from '@modules/block-product/components/modal-block/modal-block.component';
import { ModalBlockAccountComponent } from '@modules/block-product/components/modal-block-account/modal-block-account.component';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { DebitCard } from '@modules/block-product/entities/block.entities';
import { FLEX_CUBE } from '@modules/block-product/constants/block-products.constants';
import { ModalProductBlockComponent } from '@commons/components/modal-product-block/modal-product-block.component';

@Component({
  selector: 'app-block-product',
  templateUrl: './block-product.page.html',
  styleUrls: ['./block-product.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BlockProductPage {
  public toggle: boolean = false;
  private _subs: Subscription[] = [];
  private _typeAccount: string;
  constructor(
    private facade: BlockProductsFacade,
    private pageOpenAccountService: PageOpenAccountService,
    private router: Router,
    private iab: InAppBrowser,
    private modalService: ModalService,
    private translateService: TranslateService
  ) {}

  ionViewWillEnter(): void {
    this._watchStore();
  }

  ionViewDidLeave(): void {
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
    this.facade.resetBlockProduct();
  }

  get creditCards$(): Observable<Product[]> {
    return this.facade.filterProducts$([TYPE_ACCOUNTS.CREDIT_CARD]);
  }

  get hasCreditCard$(): Observable<boolean> {
    return this.creditCards$.pipe(
      map((products) => !!products && products.length > 0)
    );
  }

  get lengthCreditCard$(): Observable<number> {
    return this.creditCards$.pipe(map((data) => data.length));
  }

  get lengthDebitCard$(): Observable<number> {
    return this.debitCards$.pipe(map((data) => data?.length));
  }

  get hasAccounts$(): Observable<boolean> {
    return this.obtainAcounts$().pipe(
      map((products) => !!products && products.length > 0)
    );
  }

  get debitCards$(): Observable<DebitCard[]> {
    return this.facade.debitCards$.pipe(map((data) => data?.data?.debitCards));
  }

  get hasDebitCard$(): Observable<boolean> {
    return this.debitCards$.pipe(
      map((products) => !!products && products.length > 0)
    );
  }

  public back(): void {
    this.router.navigate([HOME]);
  }

  get urlCreditCard(): string {
    return environment.external_url.request_credit_card;
  }

  get urlAccounts(): string {
    return environment.external_url.recharge;
  }

  get urlDenunciation(): string {
    return environment.external_url.denunciation;
  }

  public actionClickProduct(
    status: string,
    id: string,
    typeAccount: string
  ): void {
    this._typeAccount = typeAccount;
    if (status === 'ACTIVE') {
      this.modalService.openModal(
        ModalBlockComponent,
        {
          id,
          typeAccount
        },
        'default-modal',
        false
      );
    } else {
      this._openModalGeneric();
    }
  }

  public actionClickAccount(
    status: string,
    idNum: string,
    typeAccount: string
  ): void {
    this._typeAccount = 'ACCOUNT_TYPE';
    if (status === 'ACTIVE') {
      const isFlexCube = FLEX_CUBE.includes(idNum.slice(0, 3));
      this.modalService.openModal(
        ModalBlockAccountComponent,
        {
          id: idNum,
          type: typeAccount,
          icon: 'icon-vel-warning-hex',
          iconType: 'warning',
          title: this.translateService.instant(
            'BLOCK_PRODUCT.MODAL.ACCOUNT.TITLE'
          ),
          description: this.translateService.instant(
            `BLOCK_PRODUCT.MODAL.ACCOUNT.${
              isFlexCube ? 'DESCRIPTION_FLEX_CUBE' : 'DESCRIPTION'
            }`
          ),
          firstBtn: this.translateService.instant(
            'BLOCK_PRODUCT.MODAL.ACCOUNT.BTN1'
          ),
          secondBtn: this.translateService.instant(
            'BLOCK_PRODUCT.MODAL.ACCOUNT.BTN2'
          )
        },
        'default-modal',
        false
      );
    } else {
      this._openModalGeneric();
    }
  }

  public textStatus(status: string): string {
    return (
      this.translateService.instant(
        status === 'ACTIVE' ? 'TO_BLOCK' : 'TO_UNLOCK'
      ) + '<i class="icon-vel-lock-circle"></i>'
    );
  }

  public textStatusAccount(status: string): string {
    return this.translateService.instant(
      status === 'ACTIVE' ? 'TO_RESTRICT' : 'SET_FREE'
    );
  }

  public typeCardAccount(status: string, type: string): string {
    return status !== 'ACTIVE'
      ? 'three'
      : type === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT
      ? 'one'
      : 'two';
  }

  public obtainAcounts$(type?: string): Observable<Product[]> {
    return this.facade.filterProducts$(
      !type
        ? [TYPE_ACCOUNTS.DEPOSIT_ACCOUNT, TYPE_ACCOUNTS.CURRENT_ACCOUNT]
        : type === 'deposit'
        ? [TYPE_ACCOUNTS.DEPOSIT_ACCOUNT]
        : [TYPE_ACCOUNTS.CURRENT_ACCOUNT]
    );
  }

  public hasTypeAccount$(type: string): Observable<boolean> {
    return this.obtainAcounts$(type).pipe(map((data) => data.length > 0));
  }

  public lengthAccounts$(type: string): Observable<number> {
    return this.obtainAcounts$(type).pipe(map((data) => data?.length));
  }

  public setToggle(): void {
    this.toggle = !this.toggle;
  }

  public openBrowser(url: string): void {
    this.iab.create(url, '_blank');
  }

  private _openModalGeneric(): void {
    if (this._typeAccount === 'ACCOUNT_TYPE') {
      this.modalService.openModal(ModalProductBlockComponent, {
        title: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.TITLE_2'
        ),
        close: false,
        icon: 'icon-vel-success-hand',
        iconType: 'success',
        subtitle: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.SUBTITLE'
        ),
        descriptionOne: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.DESCRIPTION'
        ),
        descriptionTwo: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.DESCRIPTION_TWO'
        ),
        link: environment.external_url.offices,
        linkText: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.LINK'
        ),
        buttonText: this.translateService.instant('UNDERSTOOD')
      });
    } else {
      this.modalService.openModal(
        ModalGenericComponent,
        {
          icon: 'icon-vel-success-hand',
          iconType: 'success',
          title: this.translateService.instant(
            `BLOCK_PRODUCT.MODAL.${this._typeAccount}.TITLE`
          ),
          subTitle: this.translateService.instant(
            `BLOCK_PRODUCT.MODAL.${this._typeAccount}.SUBTITLE`
          ),
          description: this.translateService.instant(
            `BLOCK_PRODUCT.MODAL.${this._typeAccount}.DESCRIPTION`
          ),
          firstBtn: this.translateService.instant('UNDERSTOOD')
        },
        'default-modal',
        false
      );
    }
  }

  private _watchStore(): void {
    this._subs.push(
      this.facade.blockProduct$
        .pipe(
          filter((data) => data?.error || data?.completed),
          distinctUntilChanged()
        )
        .subscribe(async (data) => {
          !!this.modalService.modal && this.modalService.close();
          if (data.completed) {
            this.facade.fetchLoadProducts();
            this.facade.fetchDebitCardList();
            this._openModalGeneric();
            this.facade.resetBlockProduct();
            this.facade.resetDebitCards();
          }
        })
    );

    this._subs.push(
      this.modalService.actionButtonModal$.subscribe(
        (_) => !!this.modalService.modal && this.modalService.close()
      )
    );

    this.facade.fetchDebitCardList();
  }
}
