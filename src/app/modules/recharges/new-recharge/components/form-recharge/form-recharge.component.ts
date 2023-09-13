import {
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

import { RechargesFacade } from '@modules/recharges/new-recharge/recharges.facade';
import { Product } from '@commons/models/product.model';
import { IOperatorsState } from '@modules/recharges/new-recharge/store/recharges.state';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { rechargeConfirmationMapper } from '@modules/recharges/new-recharge/mappers/confirmation.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { cardSmallMapper } from '@commons/mappers/card-small.mapper';
import { ICardSmallEntities } from '@commons/entities/card-small.entities';
import { GROUP_ONE } from '@commons/constants/group-products';
import { CURRENCY, PHONE } from '@modules/forms/constants/type-input';
import {
  rechargeAmountValidator,
  rechargeFromValidator,
  rechargesPhoneValidators
} from '@modules/recharges/new-recharge/helpers/recharge.validator';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { ConfigGlobalToWhoAbstract } from '@commons/velocity/templates/utils/abstracts/config-global-to-who.abstract';

@Component({
  selector: 'app-form-recharge',
  templateUrl: './form-recharge.component.html',
  styleUrls: ['./form-recharge.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FormRechargeComponent extends ConfigGlobalToWhoAbstract
  implements OnInit {
  @ViewChild('hiddenElement', { static: true })
  public hiddenElement: any;
  public formRecharge: FormGroup;
  public loading: number = 4;
  constructor(
    protected injector: Injector,
    private fb: FormBuilder,
    private facade: RechargesFacade,
    private currencyFormat: CurrencyFormatPipe,
    private translateService: TranslateService,
    private configTemplate: ConfigTemplateService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  get products$(): Observable<Product[]> {
    return this.facade.filterProducts$(GROUP_ONE);
  }

  get hasOperators(): Observable<boolean> {
    return this.operators$.pipe(map((data) => data.names?.length > 0));
  }

  get productActive(): ICardSmallEntities {
    return cardSmallMapper(
      this.formRecharge.value.from,
      this.translateService,
      this.currencyFormat
    );
  }

  get showButtonProductActive$(): Observable<boolean> {
    return this.products$.pipe(map((data) => data.length > 1));
  }

  get isErrorCardActive(): boolean {
    return !(
      this.formRecharge?.value?.from?.productAccountBalances?.saldo_disponible
        ?.amount >= 1000
    );
  }

  get operators$(): Observable<IOperatorsState> {
    return this.facade.operators$;
  }

  get from(): AbstractControl {
    return this.formRecharge.get('from');
  }

  get to(): AbstractControl {
    return this.formRecharge.get('to');
  }

  get amount(): AbstractControl {
    return this.formRecharge.get('amount');
  }

  get phoneNumber(): AbstractControl {
    return this.formRecharge.get('phoneNumber');
  }

  get configCurrency(): object {
    return CURRENCY;
  }

  get configPhone(): object {
    return PHONE;
  }

  public trackBy(index: number, product: Product): string {
    return trackBy(product, product.id);
  }

  public changeAccount(): void {
    return this.hiddenElement?.el?.click();
  }

  public submitRecharge(): void {
    if (this.formRecharge.valid) {
      const toWho: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        stepActive: PropertyTemplate.confirmation,
        toWho: {
          ...this.formRecharge.value,
          amount: {
            value: this.amount.value,
            normalize: this.amount?.currencyValue()
          },
          phoneNumber: {
            value: this.phoneNumber.value,
            normalize: this.phoneNumber?.normalize()
          }
        }
      };
      this.saveDataTemplateService.saveDataTemplate(toWho);
      this.saveDataTemplateService.saveDataTemplate({
        ...toWho,
        confirmation: rechargeConfirmationMapper.bind(this)(
          this.saveDataTemplateService.dataTemplate?.toWho
        )
      });
      this.configTemplate.changeStep(this.configTemplate.config.router[1]);
    }
  }

  private _initForm(): void {
    this.formRecharge = this.fb.group({
      from: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.from || null,
        [Validators.required, rechargeFromValidator.bind(this)]
      ],
      to: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.to || null,
        [Validators.required]
      ],
      phoneNumber: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.phoneNumber?.value ||
          null,
        [Validators.required, rechargesPhoneValidators.bind(this)]
      ],
      amount: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.amount?.value ||
          null,
        [Validators.required, rechargeAmountValidator.bind(this)]
      ]
    });
    !this.saveDataTemplateService?.dataTemplate?.toWho?.from &&
      this.loadSelectedProduct(this.formRecharge, 'from', this.products$)
        .pipe(first())
        .subscribe();
  }
}
