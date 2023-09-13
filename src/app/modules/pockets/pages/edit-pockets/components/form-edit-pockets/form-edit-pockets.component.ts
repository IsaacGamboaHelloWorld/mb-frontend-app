import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { KEYS } from '@commons/constants/global';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { IPocket, IPocketsByProduct } from '@commons/entities/pockets.entities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alphanumericValidator } from '@commons/validators/global-validators.validator';
import { pocketSetPeriodicAmountValidator } from '@modules/pockets/helpers/pockets.validators';
import { Observable, Subject } from 'rxjs';
import {
  IEditPocketState,
  IPocketsCategoriesState
} from '@modules/pockets/store/pockets.state';
import {
  IPocketCategory,
  IPocketsPeriodicityItem,
  POCKETS_PERIODICITY
} from '@modules/pockets/constants/pockets.constant';
import { CURRENCY } from '@modules/forms/constants/type-input';
import { ModalService } from '@commons/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { NavController } from '@ionic/angular';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';
import { VelocityLoaderComponent } from '@commons/velocity/molecules/velocity-loader/velocity-loader.component';
import { POCKETS_HOME } from '@commons/constants/navigatie-global';
import { editPocketServiceMapper } from '@modules/pockets/pages/edit-pockets/mappers/edit-pockets.mapper';
import { deletePocketServiceMapper } from '@modules/pockets/pages/edit-pockets/mappers/delete-pockets.mapper';
import { pocketsMapper } from '@modules/pockets/mappers/pockets.mapper';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';

@Component({
  selector: 'app-form-edit-pockets',
  templateUrl: './form-edit-pockets.component.html',
  styleUrls: ['./form-edit-pockets.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FormEditPocketsComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _pocket: IPocket = null;
  private _basicProduct: IProductBasic = null;
  public formPocket: FormGroup = null;

  constructor(
    private modalService: ModalService,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private secureStorage: AdlSecureStorageService,
    private facade: PocketsFacade,
    private navCtrl: NavController,
    private currencyFormatPipe: CurrencyFormatPipe,
    private saveDataTemplateService: SaveDataTemplateService
  ) {}

  ngOnInit(): void {
    this._loadPocket();
  }

  ngOnDestroy(): void {}

  get name(): AbstractControl {
    return this.formPocket.get('name');
  }

  get pocketType(): AbstractControl {
    return this.formPocket.get('pocketType');
  }

  get amount(): AbstractControl {
    return this.formPocket.get('amount');
  }

  get periodicity(): AbstractControl {
    return this.formPocket.get('periodicity');
  }

  get periodicAmount(): AbstractControl {
    return this.formPocket.get('periodicAmount');
  }

  get pocket$(): Observable<IPocketsByProduct> {
    return this.facade.findPocket$(
      this._basicProduct?.id,
      this._basicProduct?.type
    );
  }

  get categories$(): Observable<IPocketsCategoriesState> {
    return this.facade.categories$;
  }

  get pocketEdit$(): Observable<IEditPocketState> {
    return this.facade.editPocket$;
  }

  get periodicityItems(): IPocketsPeriodicityItem[] {
    return POCKETS_PERIODICITY;
  }

  get isLoading$(): Observable<boolean> {
    return this.facade.editPocket$.pipe(map((data) => data.loading));
  }

  get configCurrency(): object {
    return CURRENCY;
  }

  public getControl(controlName: string): AbstractControl | null {
    return this.formPocket.get(controlName);
  }

  public customCategory(category: string): IPocketCategory {
    return pocketsMapper(category);
  }

  public submitEdit(): void {
    if (!!this._pocket) {
      this.facade.editPocket(
        editPocketServiceMapper.bind(this)(
          this._pocket,
          this._basicProduct,
          this.formPocket
        )
      );
      this.facade.editPocket$
        .pipe(
          filter((info) => info?.completed),
          first()
        )
        .subscribe((info) => {
          this.facade.fetchPockets();
          this.navCtrl.navigateForward(POCKETS_HOME);
        });
    }
  }

  public deletePocket(): void {
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-warning-hex',
        iconType: 'warning',
        type: 'remove-pocket',
        title: this.translateService.instant('POCKETS.EDIT.MODAL_DELETE.TITLE'),
        description: this.translateService.instant(
          'POCKETS.EDIT.MODAL_DELETE.DESCRIPTION',
          {
            description: ` ${this._basicProduct.id?.slice(-4)}`
          }
        ),
        firstBtn: this.translateService.instant(
          'POCKETS.EDIT.MODAL_DELETE.DELETE_BTN'
        ),
        secondBtn: this.translateService.instant(
          'POCKETS.EDIT.MODAL_DELETE.CANCEL_BTN'
        ),
        hasInLineLink: true
      },
      'default-modal',
      false
    );
    this.modalService.actionButtonModal$.pipe(first()).subscribe((type) => {
      !!this.modalService && this.modalService.close();
      if (type === STATUS_BUTTONS.primary) {
        this.modalService.openModal(
          VelocityLoaderComponent,
          {},
          'default-modal',
          false
        );
        const template: ISaveDataTemplate = {
          ...this.saveDataTemplateService.dataTemplate,
          toWho: {
            ...this.formPocket.value,
            amount: {
              value: this.formPocket?.value,
              normal: this.formPocket?.currencyValue()
            },
            pocketFrom: this._pocket
          }
        };
        this.saveDataTemplateService.saveDataTemplate(template);
        this.facade.deletePocket(
          deletePocketServiceMapper(this._pocket, this._basicProduct)
        );
        this.facade.deletePocket$
          .pipe(
            filter((info) => info?.completed || info?.error),
            first()
          )
          .subscribe(() => {
            !!this.modalService.modal && this.modalService.close();
          });
      }
    });
  }

  private async _loadPocket(): Promise<void> {
    this._basicProduct = JSON.parse(
      await this.secureStorage.get(KEYS.ACTIVE_PRODUCT)
    );
    const pocketId = await this.secureStorage.get(KEYS.ACTIVE_POCKET);
    this.pocket$
      .pipe(takeUntil(this._destroy$))
      .subscribe((pockets: IPocketsByProduct) => {
        this._pocket = pockets?.pockets.find(
          (pocket: IPocket) => pocket.pocketId === pocketId
        );
        this._initForm();
      });
  }

  private _initForm(): void {
    this.formPocket = this.fb.group({
      name: [
        this._pocket?.pocketName,
        [Validators.required, alphanumericValidator]
      ],
      pocketType: [this._pocket?.category, [Validators.required]],
      amount: [
        this.currencyFormatPipe.transform(this._pocket?.savingGoal),
        [Validators.required, pocketSetPeriodicAmountValidator.bind(this)]
      ],
      periodicity: [this._pocket?.pocketPeriod, [Validators.required]],
      periodicAmount: [
        this.currencyFormatPipe.transform(this._pocket?.amountPeriodicSavings),
        [Validators.required]
      ],
      pocketFrom: [null]
    });
    this._markAsDirtyAndTouched(this.formPocket);
  }

  private _markAsDirtyAndTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].markAsDirty();
      form.controls[key].markAsTouched();
    });
  }
}
