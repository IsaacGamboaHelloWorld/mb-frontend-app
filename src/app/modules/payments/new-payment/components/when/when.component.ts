import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { setMapperConfirmation } from '@modules/payments/new-payment/helpers/add-payments-components.helper';

@Component({
  selector: 'app-when',
  templateUrl: './when.component.html',
  styleUrls: ['./when.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhenComponent implements OnInit {
  public formWhen: FormGroup;
  public today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private saveDataTemplateService: SaveDataTemplateService,
    private configTemplate: ConfigTemplateService,
    private currencyFormat: CurrencyFormatPipe
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  public submitForm(): void {
    if (this.formWhen.valid) {
      const template: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        stepActive: PropertyTemplate.confirmation,
        when: this.formWhen.value
      };
      this.saveDataTemplateService.saveDataTemplate(template);
      this.saveDataTemplateService.saveDataTemplate({
        ...template,
        confirmation: setMapperConfirmation(
          this.configTemplate.config.defaultUrl
        ).bind(this)(this.saveDataTemplateService.dataTemplate)
      });
      this.configTemplate.changeStep(this.configTemplate.config.router[3]);
    }
  }

  private _initForm(): void {
    this.formWhen = this.fb.group({
      date: [
        this.saveDataTemplateService.dataTemplate?.when?.date || this.today,
        [Validators.required]
      ]
    });
  }
}
