import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { Product } from '@commons/models/product.model';
import { GROUP_ONE } from '@commons/constants/group-products';
import { ICardSmallEntities } from '@commons/entities/card-small.entities';
import { cardSmallMapper } from '@commons/mappers/card-small.mapper';
import { AdvancesFacade } from '@modules/detail/advances/new-advance/advances.facade';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { advancesConfirmationMapper } from '@modules/detail/advances/new-advance/mappers/confirmation.mapper';
import { CURRENCY } from '@modules/forms/constants/type-input';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { ADVANCE_LIMITS } from '@commons/constants/global';
import { advanceAmountLimit } from '@modules/detail/advances/new-advance/helpers/advances.helper';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { ConfigGlobalToWhoAbstract } from '@commons/velocity/templates/utils/abstracts/config-global-to-who.abstract';
import {
  advancesAmountValidator,
  advancesDescriptionValidator
} from '@modules/detail/advances/new-advance/validators/advances.validators';
import { FLEX_CUBE_ACCOUNT } from '@modules/block-product/constants/block-products.constants';

@Component({
  selector: 'app-form-advance',
  templateUrl: './form-advance.component.html',
  styleUrls: ['./form-advance.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAdvanceComponent extends ConfigGlobalToWhoAbstract
  implements OnInit {
  @ViewChild('hiddenElement', { static: true })
  public hiddenElement: any;
  public formAdvances: FormGroup;

  constructor(
    protected injector: Injector,
    private fb: FormBuilder,
    private facade: AdvancesFacade,
    private configTemplate: ConfigTemplateService,
    private translateService: TranslateService,
    private currencyFormat: CurrencyFormatPipe
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
    !this.saveDataTemplateService?.dataTemplate?.toWho?.from &&
      this.loadSelectedProduct(this.formAdvances, 'from', null, [
        TYPE_ACCOUNTS.CREDIT_CARD
      ])
        .pipe(first())
        .subscribe();
  }

  get from(): AbstractControl {
    return this.formAdvances.get('from');
  }

  get to(): AbstractControl {
    return this.formAdvances.get('to');
  }

  get amount(): AbstractControl {
    return this.formAdvances.get('amount');
  }

  get description(): AbstractControl {
    return this.formAdvances.get('description');
  }

  get expirationMonth(): AbstractControl {
    return this.formAdvances.get('expirationMonth');
  }

  get expirationYear(): AbstractControl {
    return this.formAdvances.get('expirationYear');
  }

  get products$(): Observable<Product[]> {
    return this.facade
      .filterProducts$(GROUP_ONE)
      .pipe(
        map((products) =>
          products.filter(
            (product) => !FLEX_CUBE_ACCOUNT.includes(product?.id?.slice(0, 3))
          )
        )
      );
  }

  get productActive(): ICardSmallEntities {
    return cardSmallMapper(
      this.formAdvances.value.to,
      this.translateService,
      this.currencyFormat
    );
  }

  get creditCard$(): Observable<Product[]> {
    return this.facade.filterProducts$([TYPE_ACCOUNTS.CREDIT_CARD]);
  }

  get showButtonProductActive$(): Observable<boolean> {
    return this.products$.pipe(map((data) => data.length > 1));
  }

  get hasDepositAccount$(): Observable<boolean> {
    return this.products$.pipe(map((products) => products.length > 0));
  }

  get configCurrency(): object {
    return CURRENCY;
  }

  get getMinAmountFormatted(): string {
    return this.currencyFormat.transform(ADVANCE_LIMITS.MIN)?.slice(0, -3);
  }

  get getMaxAmountFormatted(): string {
    return this.currencyFormat.transform(this.getMaxAmount)?.slice(0, -3);
  }

  get getMaxAmount(): number {
    return advanceAmountLimit(this.from?.value);
  }

  public changeAccount(): void {
    return this.hiddenElement?.el?.click();
  }

  public trackBy(index: number, product: Product): string {
    return trackBy(product, product.id);
  }

  public submitAdvance(): void {
    if (this.formAdvances.valid) {
      const toWho: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        stepActive: PropertyTemplate.confirmation,
        toWho: {
          ...this.formAdvances.value,
          amount: {
            value: this.amount.value,
            normalize: this.amount?.currencyValue()
          }
        }
      };
      this.saveDataTemplateService.saveDataTemplate(toWho);
      this.saveDataTemplateService.saveDataTemplate({
        ...toWho,
        confirmation: advancesConfirmationMapper.bind(this)(
          this.saveDataTemplateService.dataTemplate?.toWho
        )
      });
      this.configTemplate.changeStep(this.configTemplate.config.router[1]);
    }
  }

  private _initForm(): void {
    this.formAdvances = this.fb.group({
      from: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.from || null,
        [Validators.required]
      ],
      to: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.to || null,
        [Validators.required]
      ],
      amount: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.amount?.value ||
          null,
        [Validators.required, advancesAmountValidator.bind(this)]
      ],
      description: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.description || null,
        [Validators.required, advancesDescriptionValidator]
      ],
      expirationMonth: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.expirationMonth ||
          null,
        [Validators.required, Validators.min(1), Validators.max(12)]
      ],
      expirationYear: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.expirationYear ||
          null,
        [Validators.required, Validators.min(20)]
      ]
    });
    this.setFirstProduct(this.products$, this.formAdvances, 'to')
      .pipe(first())
      .subscribe();
  }
}
