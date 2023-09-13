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
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { CURRENCY } from '@modules/forms/constants/type-input';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';

@Component({
  selector: 'app-how-much',
  templateUrl: './how-much.component.html',
  styleUrls: ['./how-much.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowMuchComponent implements OnInit {
  public formHowMuch: FormGroup;
  constructor(
    private fb: FormBuilder,
    private saveDataTemplateService: SaveDataTemplateService,
    private configTemplate: ConfigTemplateService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  get configCurrency(): object {
    return CURRENCY;
  }

  get savingAmount(): AbstractControl {
    return this.formHowMuch.get('savingAmount');
  }

  public submitForm(): void {
    if (this.formHowMuch.valid) {
      const template: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        stepActive: PropertyTemplate.when,
        howMuch: {
          ...this.formHowMuch.value,
          savingAmount: {
            value: this.savingAmount?.value,
            normal: this.savingAmount?.currencyValue()
          }
        }
      };
      this.saveDataTemplateService.saveDataTemplate(template);
      this.configTemplate.changeStep(this.configTemplate.config.router[2]);
    }
  }

  private _initForm(): void {
    this.formHowMuch = this.fb.group({
      savingAmount: [
        this.saveDataTemplateService.dataTemplate.howMuch?.savingAmount
          ?.value || null,
        [Validators.required]
      ]
    });
  }
}
