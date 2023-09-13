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

import { CURRENCY } from '@modules/forms/constants/type-input';
import {
  newTransferAlphanumericValidator,
  newTransferAmountValidator
} from '@modules/transfer/helpers/transfer.validators';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';

@Component({
  selector: 'app-how-much',
  templateUrl: './how-much.component.html',
  styleUrls: ['./how-much.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowMuchComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private saveDataTemplateService: SaveDataTemplateService,
    private configTemplate: ConfigTemplateService
  ) {}
  public formHowMuch: FormGroup;
  ngOnInit(): void {
    this._initForm();
  }

  get configCurrency(): object {
    return CURRENCY;
  }

  get voucherId(): AbstractControl {
    return this.formHowMuch.get('voucherId');
  }

  get amount(): AbstractControl {
    return this.formHowMuch.get('amount');
  }

  get description(): AbstractControl {
    return this.formHowMuch.get('description');
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
        this.saveDataTemplateService.dataTemplate?.howMuch?.amount?.value ||
          null,
        [Validators.required, newTransferAmountValidator.bind(this)]
      ],
      description: [
        this.saveDataTemplateService.dataTemplate?.howMuch?.description || null,
        [Validators.required, newTransferAlphanumericValidator.bind(this)]
      ],
      voucherId: [
        this.saveDataTemplateService.dataTemplate?.howMuch?.voucherId,
        newTransferAlphanumericValidator.bind(this)
      ]
    });
  }
}
