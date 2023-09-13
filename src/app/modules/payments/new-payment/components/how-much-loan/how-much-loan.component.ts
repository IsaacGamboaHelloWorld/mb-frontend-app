import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { IonInput } from '@ionic/angular';
import { first, map } from 'rxjs/operators';

import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { CURRENCY_DECIMAL } from '@modules/forms/constants/type-input';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { Product } from '@commons/models/product.model';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import {
  amountLoanValidator,
  otherValueValidator
} from '@modules/payments/helpers/new-payment.validators';
import { LOAN_TYPES_VALUE } from '@modules/payments/new-payment/constants/loans.contant';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { amountHowMuchLoan } from '@modules/payments/new-payment/mappers/value-amount.mapper';

@Component({
  selector: 'app-how-much-loan',
  templateUrl: './how-much-loan.component.html',
  styleUrls: ['./how-much-loan.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HowMuchLoanComponent implements OnInit {
  @ViewChild('inputId', { static: false }) ionInput: IonInput;
  public formHowMuchLoan: FormGroup;
  public showInput: boolean = false;
  constructor(
    private fb: FormBuilder,
    private saveDataTemplateService: SaveDataTemplateService,
    private configTemplate: ConfigTemplateService,
    private facade: PaymentsFacade
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  get amount(): AbstractControl {
    return this.formHowMuchLoan.get('amount');
  }

  get type(): AbstractControl {
    return this.formHowMuchLoan.get('type');
  }

  get types(): typeof LOAN_TYPES_VALUE {
    return LOAN_TYPES_VALUE;
  }

  get otherAmount(): AbstractControl {
    return this.formHowMuchLoan.get('otherAmount');
  }

  get hasProduct$(): Observable<boolean> {
    return this.product$.pipe(map((product) => !!product));
  }

  get product$(): Observable<Product> {
    return this.facade.findProduct$(
      this.saveDataTemplateService.dataTemplate.toWho?.to.accountId,
      this.saveDataTemplateService.dataTemplate.toWho?.to.accountType ===
        TYPE_ACCOUNTS.TC
        ? TYPE_ACCOUNTS.CREDIT_CARD
        : ''
    );
  }

  get configCurrency(): object {
    return CURRENCY_DECIMAL;
  }

  get isTC(): boolean {
    return (
      this.saveDataTemplateService.dataTemplate.toWho?.to?.bank === '0002' &&
      (this.saveDataTemplateService.dataTemplate.toWho?.to?.accountType ===
        TYPE_ACCOUNTS.CREDIT_CARD ||
        this.saveDataTemplateService.dataTemplate.toWho?.to?.accountType ===
          TYPE_ACCOUNTS.TC)
    );
  }

  public changeOtherValue(isOther: boolean): void {
    this.showInput = isOther;
  }

  public submitForm(): void {
    if (this.formHowMuchLoan.valid) {
      this.product$.pipe(first()).subscribe((product) => {
        const template: ISaveDataTemplate = {
          ...this.saveDataTemplateService.dataTemplate,
          stepActive: PropertyTemplate.when,
          howMuch: {
            ...this.formHowMuchLoan.value,
            amount:
              this.isTC && !!product
                ? amountHowMuchLoan(this.type.value, product)
                : {
                    value: this.amount.value,
                    normal: this.amount.currencyValue()
                  },
            type: this.type.value,
            otherAmount: {
              value: this.otherAmount.value,
              normal: this.otherAmount?.currencyValue()
            }
          }
        };
        this.saveDataTemplateService.saveDataTemplate(template);
        this.configTemplate.changeStep(this.configTemplate.config.router[2]);
      });
    }
  }

  private _initForm(): void {
    this.formHowMuchLoan = this.fb.group({
      amount: [
        this.saveDataTemplateService.dataTemplate?.howMuch?.amount?.value
      ],
      type: [this.saveDataTemplateService.dataTemplate?.howMuch?.type],
      otherAmount: [
        this.saveDataTemplateService.dataTemplate?.howMuch?.otherAmount
          ?.value || null
      ]
    });
    this.hasProduct$.pipe(first()).subscribe((data) => {
      !data &&
        this.amount.setValidators([
          Validators.required,
          amountLoanValidator.bind(this)
        ]);
      this.isTC &&
        data &&
        this.type.setValidators([
          Validators.required,
          otherValueValidator.bind(this)
        ]);
    });
  }
}
