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
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { TransferWithdrawalFacade } from '@modules/transfer-withdrawal/new-withdrawal/transfer-withdrawal.facade';
import { CURRENCY } from '@modules/forms/constants/type-input';
import {
  IWithdrawalFixedAmount,
  IWithdrawalPlace,
  OTHER_AMOUNT,
  WITHDRAWAL_FIXED_AMOUNT,
  WITHDRAWAL_PLACES
} from '@modules/transfer-withdrawal/new-withdrawal/constants/fixed-amount.constant';
import { Product } from '@commons/models/product.model';
import { GROUP_ONE } from '@commons/constants/group-products';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { ICardSmallEntities } from '@commons/entities/card-small.entities';
import { cardSmallMapper } from '@commons/mappers/card-small.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { transferWithdrawalConfirmationMapper } from '@modules/transfer-withdrawal/new-withdrawal/mappers/transfer-withdrawal.mapper';
import {
  transferWithdrawalAvailableBalanceValidator,
  transferWithdrawalDocumentIdValidator,
  transferWithdrawalFixedAmountValidator
} from '@modules/transfer-withdrawal/new-withdrawal/helpers/transfer-withdrawal.validator';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { ConfigGlobalToWhoAbstract } from '@commons/velocity/templates/utils/abstracts/config-global-to-who.abstract';
import { MinAmountTransactions } from '@commons/constants/min-amount-transactions';

@Component({
  selector: 'app-form-transfer-withdrawal',
  templateUrl: './form-transfer-withdrawal.component.html',
  styleUrls: ['./form-transfer-withdrawal.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FormTransferWithdrawalComponent extends ConfigGlobalToWhoAbstract
  implements OnInit {
  @ViewChild('hiddenElement', { static: true })
  public hiddenElement: any;
  public formTransferWithdrawal: FormGroup;

  constructor(
    protected injector: Injector,
    private fb: FormBuilder,
    private facade: TransferWithdrawalFacade,
    private configTemplate: ConfigTemplateService,
    private translateService: TranslateService,
    private currencyFormat: CurrencyFormatPipe
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  get amount(): AbstractControl {
    return this.formTransferWithdrawal.get('amount');
  }

  get fixedAmount(): AbstractControl {
    return this.formTransferWithdrawal.get('fixedAmount');
  }

  get where(): AbstractControl {
    return this.formTransferWithdrawal.get('where');
  }

  get documentId(): AbstractControl {
    return this.formTransferWithdrawal.get('documentId');
  }

  get from(): AbstractControl {
    return this.formTransferWithdrawal.get('from');
  }

  get transferToggle(): AbstractControl {
    return this.formTransferWithdrawal.get('transferToggle');
  }

  get fixedAmounts(): IWithdrawalFixedAmount[] {
    return WITHDRAWAL_FIXED_AMOUNT;
  }

  get withdrawalPlaces(): IWithdrawalPlace[] {
    return WITHDRAWAL_PLACES;
  }

  get configCurrency(): object {
    return CURRENCY;
  }

  get otherAmount(): boolean {
    return this.fixedAmount.value === OTHER_AMOUNT;
  }

  get showTransfer(): boolean {
    return this.transferToggle.value;
  }
  get otherAmountOpt(): object {
    return OTHER_AMOUNT;
  }

  get products$(): Observable<Product[]> {
    return this.facade.filterProducts$(GROUP_ONE);
  }

  get productActive(): ICardSmallEntities {
    return cardSmallMapper(
      this.formTransferWithdrawal.value.from,
      this.translateService,
      this.currencyFormat
    );
  }

  get showButtonProductActive$(): Observable<boolean> {
    return this.products$.pipe(map((data) => data.length > 1));
  }

  get isErrorCardActive(): boolean {
    if (this.from?.hasError('transferWithdrawalAvailableBalance')) {
      return true;
    } else {
      return !(
        this.from?.value?.productAccountBalances?.saldo_disponible?.amount >=
        MinAmountTransactions.transferWithdrawal
      );
    }
  }

  public changeAccount(): void {
    return this.hiddenElement?.el?.click();
  }

  public trackBy(index: number, product: Product): string {
    return trackBy(product, product.id);
  }

  public submitGenerate(): void {
    if (this.formTransferWithdrawal.valid) {
      const toHow: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        stepActive: PropertyTemplate.confirmation,
        toWho: {
          ...this.formTransferWithdrawal.value,
          amount: {
            value: this.amount.value,
            normalize: this.amount?.currencyValue()
          }
        }
      };
      this.saveDataTemplateService.saveDataTemplate(toHow);
      this.saveDataTemplateService.saveDataTemplate({
        ...toHow,
        confirmation: transferWithdrawalConfirmationMapper.bind(this)(
          this.saveDataTemplateService.dataTemplate?.toWho
        )
      });

      this.configTemplate.changeStep(this.configTemplate.config.router[1]);
    }
  }

  private _initForm(): void {
    this.formTransferWithdrawal = this.fb.group({
      amount: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.amount?.value || null
      ],
      fixedAmount: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.fixedAmount || null,
        [Validators.required, transferWithdrawalFixedAmountValidator.bind(this)]
      ],
      documentId: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.documentId || null
      ],
      where: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.where || null,
        [Validators.required]
      ],
      from: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.from || null,
        [
          Validators.required,
          transferWithdrawalAvailableBalanceValidator.bind(this)
        ]
      ],
      transferToggle: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.transferToggle ||
          false,
        [transferWithdrawalDocumentIdValidator.bind(this)]
      ]
    });
    !this.saveDataTemplateService?.dataTemplate?.toWho?.from &&
      this.loadSelectedProduct(
        this.formTransferWithdrawal,
        'from',
        this.products$
      )
        .pipe(first())
        .subscribe();
  }
}
