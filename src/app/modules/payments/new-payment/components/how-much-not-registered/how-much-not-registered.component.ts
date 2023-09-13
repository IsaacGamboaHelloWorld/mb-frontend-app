import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { IBillerDetail } from '@modules/payments/entities/billers.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { VALIDATOR_MESSAGES } from '@modules/forms/constants/validator.constant';

@Component({
  selector: 'app-how-much-not-registered',
  templateUrl: './how-much-not-registered.component.html',
  styleUrls: ['./how-much-not-registered.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowMuchNotRegisteredComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private saveDataTemplateService: SaveDataTemplateService,
    private facade: PaymentsFacade,
    private configTemplate: ConfigTemplateService
  ) {}

  ngOnInit(): void {
    this._showNotFunds();
  }

  get biller(): IBillerDetail {
    return this.saveDataTemplateService.dataTemplate.toWho?.biller;
  }

  get hasFunds(): boolean {
    return (
      (this.saveDataTemplateService.dataTemplate.toWho?.from
        ?.productAccountBalances?.saldo_disponible?.amount || 0) >=
      (this.biller?.amount || 0)
    );
  }

  public submitForm(): void {
    if (this.hasFunds) {
      this.saveDataTemplateService.saveDataTemplate({
        ...this.saveDataTemplateService.dataTemplate,
        stepActive: PropertyTemplate.when
      });
      this.configTemplate.changeStep(this.configTemplate.config.router[2]);
    }
  }

  private _showNotFunds(): void {
    !this.hasFunds &&
      this.facade.openToast(VALIDATOR_MESSAGES.insufficientFunds);
  }
}
