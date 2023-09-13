import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { CURRENCY_DECIMAL } from '@modules/forms/constants/type-input';
import { newPaymentAmountValidator } from '@modules/payments/helpers/new-payment.validators';

@Component({
  selector: 'app-how-much',
  templateUrl: './how-much-public.component.html',
  styleUrls: ['./how-much-public.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowMuchPublicComponent implements OnInit {
  public formHowMuch: FormGroup;
  constructor(
    private fb: FormBuilder,
    private saveDataTemplateService: SaveDataTemplateService,
    private configTemplate: ConfigTemplateService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  get isBiller(): boolean {
    return this.saveDataTemplateService.dataTemplate.toWho?.to?.biller;
  }

  get configCurrency(): object {
    return CURRENCY_DECIMAL;
  }

  get amount(): AbstractControl {
    return this.formHowMuch.get('amount');
  }

  get reference(): AbstractControl {
    return this.formHowMuch.get('reference');
  }

  get amountValue(): number {
    return this.isBiller
      ? this.saveDataTemplateService.dataTemplate.toWho?.to?.amount || null
      : null;
  }

  public submitForm(): void {
    if (this.formHowMuch.valid) {
      const template: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        stepActive: PropertyTemplate.when,
        howMuch: {
          ...this.formHowMuch.value,
          amount: {
            value: this.amount?.value,
            normal: this.amount?.currencyValue()
          }
        }
      };
      this.saveDataTemplateService.saveDataTemplate(template);
      this.configTemplate.changeStep(this.configTemplate.config.router[2]);
    }
  }

  private _initForm(): void {
    this.formHowMuch = this.fb.group({
      amount: [
        this.saveDataTemplateService.dataTemplate.howMuch?.amount?.value ||
          this.amountValue,
        [Validators.required, newPaymentAmountValidator.bind(this)]
      ],
      reference: [
        this.saveDataTemplateService.dataTemplate.howMuch?.reference || null,
        !this.isBiller ? [Validators.required] : []
      ]
    });
  }
}
