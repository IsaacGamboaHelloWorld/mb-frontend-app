import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { KEYS } from '@commons/constants/global';
import { first, map } from 'rxjs/operators';
import { IPocket } from '@commons/entities/pockets.entities';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { movePocketsAmountValidator } from '@modules/pockets/helpers/pockets.validators';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { Product } from '@commons/models/product.model';
import { Observable, Subscription } from 'rxjs';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { NavController } from '@ionic/angular';
import { CURRENCY } from '@modules/forms/constants/type-input';
import { ICardSmallEntities } from '@commons/entities/card-small.entities';
import { cardSmallMapper } from '@commons/mappers/card-small.mapper';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { movePocketServiceMapper } from '@modules/pockets/pages/move-pockets/mappers/move-pockets.mapper';

@Component({
  selector: 'app-form-move-pockets',
  templateUrl: './form-move-pockets.component.html',
  styleUrls: ['./form-move-pockets.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FormMovePocketsComponent implements OnInit, OnDestroy {
  public formMovePocket: FormGroup;
  private _pocketsList: IPocket[];
  private _pocket: IPocket = null;
  private _activePocketId: string = '';
  private _basicProduct: IProductBasic = null;
  private _product: Product;
  private _whereSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private facade: PocketsFacade,
    private secureStorage: AdlSecureStorageService,
    private translateService: TranslateService,
    private currencyFormat: CurrencyFormatPipe,
    private navCtrl: NavController,
    private saveDataTemplateService: SaveDataTemplateService
  ) {}

  ngOnInit(): void {
    this._loadPocket();
  }

  ngOnDestroy(): void {
    this._whereSubscription.unsubscribe();
  }

  get configCurrency(): object {
    return CURRENCY;
  }

  get amountToMove(): AbstractControl {
    return this.formMovePocket.get('amountToMove');
  }

  get where(): AbstractControl {
    return this.formMovePocket.get('where');
  }

  get pocketTo(): AbstractControl {
    return this.formMovePocket.get('pocketTo');
  }

  get labelAccount(): string {
    return this.where.value !== 2 && this.where.value === 1
      ? 'POCKETS.MOVE.FROM'
      : 'POCKETS.MOVE.TO';
  }

  get hasMorePockets(): boolean {
    return this._pocketsList.length > 1;
  }

  get showPocketsList(): boolean {
    return this.where.value === 2;
  }

  get showAccount(): boolean {
    return this.where.value === 1 || this.where.value === 3;
  }

  get isLoading$(): Observable<boolean> {
    return this.facade.movePocket$.pipe(map((data) => data.loading));
  }

  get pocket(): IPocket {
    return this._pocket;
  }

  get pocketsByProduct$(): Observable<IPocket[]> {
    return this.facade.findPocketsByProduct$(
      this._basicProduct?.id,
      this._basicProduct?.type
    );
  }

  get pocketsShowList$(): Observable<IPocket[]> {
    return this.pocketsByProduct$.pipe(
      map((items) =>
        items.filter((item) => item?.pocketId !== this._activePocketId)
      )
    );
  }

  get productActive$(): Observable<ICardSmallEntities> {
    return this.facade
      .findProduct$(this._basicProduct?.id, this._basicProduct?.type)
      .pipe(
        map((product) =>
          cardSmallMapper(product, this.translateService, this.currencyFormat)
        )
      );
  }

  public submitForm(): void {
    if (this.formMovePocket.valid) {
      const template: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        toWho: {
          ...this.formMovePocket.value,
          amountToMove: {
            value: this.amountToMove?.value,
            normal: this.amountToMove?.currencyValue()
          },
          pocketFrom: this._pocket
        }
      };
      this.saveDataTemplateService.saveDataTemplate(template);
      this.facade.movePocket(
        movePocketServiceMapper(
          this._pocket,
          this._basicProduct,
          this.formMovePocket
        )
      );
    }
  }

  private async _loadPocket(): Promise<void> {
    try {
      this._basicProduct = JSON.parse(
        await this.secureStorage.get(KEYS.ACTIVE_PRODUCT)
      );
      this.facade
        .findProduct$(this._basicProduct?.id, this._basicProduct?.type)
        .pipe(first())
        .subscribe((prod) => (this._product = prod));
      this._activePocketId = await this.secureStorage.get(KEYS.ACTIVE_POCKET);
      this.pocketsByProduct$.pipe(first()).subscribe((pockets: IPocket[]) => {
        this._pocketsList = pockets || [];
        this._pocket = this._pocketsList.find(
          (pocket: IPocket) => pocket.pocketId === this._activePocketId
        );
        this._initForm();
      });
    } catch {}
  }

  private _initForm(): void {
    this.formMovePocket = this.fb.group({
      amountToMove: [
        null,
        [Validators.required, movePocketsAmountValidator.bind(this)]
      ],
      where: [null, [Validators.required]],
      pocketTo: [null],
      pocketFrom: [null]
    });
    this._whereSubscription = this.where.valueChanges.subscribe(() =>
      this.amountToMove.updateValueAndValidity()
    );
  }
}
