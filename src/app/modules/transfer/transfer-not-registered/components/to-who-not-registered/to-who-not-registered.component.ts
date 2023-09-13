import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';

import { first } from 'rxjs/operators';

import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import {
  newTransferFromValidator,
  newTransferNumberAccountValidator,
  transferNotRegisteredAmountValidator,
  newTransferAlphanumericValidator
} from '@modules/transfer/helpers/transfer.validators';
import { ToWhoTransferAbstract } from '@modules/transfer/utils/to-who-transfer.abstract';
import { CURRENCY } from '@modules/forms/constants/type-input';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { newTransferConfirmationNotRegisteredMapper } from '@modules/transfer/transfer-not-registered/mappers/confirmation-not-registered.mapper';

@Component({
  selector: 'app-to-who-not-registered',
  templateUrl: './to-who-not-registered.component.html',
  styleUrls: ['./to-who-not-registered.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToWhoNotRegisteredComponent extends ToWhoTransferAbstract
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }
  @ViewChild('hiddenElement', { static: true })
  public hiddenElement: any;
  public today: Date = new Date();
  public showOptions: boolean = false;

  ngOnInit(): void {
    this._initForm();
  }

  get configCurrency(): object {
    return CURRENCY;
  }

  get typeAccount(): AbstractControl {
    return this.formNewTransferToWho.get('typeAccount');
  }

  get numberAccount(): AbstractControl {
    return this.formNewTransferToWho.get('numberAccount');
  }

  public toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  public submitForm(): void {
    if (this.formNewTransferToWho.valid) {
      const template: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        stepActive: PropertyTemplate.confirmation,
        toWho: {
          from: this.from?.value,
          bank: this.bank?.value,
          typeAccount: this.typeAccount?.value,
          numberAccount: this.numberAccount?.value
        },
        howMuch: {
          description: this.description?.value,
          voucherId: this.voucherId?.value,
          amount: {
            value: this.amount?.value,
            normal: this.amount?.currencyValue()
          }
        },
        when: {
          date: this.date?.value,
          favorite: this.favorite?.value
        }
      };

      this.saveDataTemplateService.saveDataTemplate(template);
      this.saveDataTemplateService.saveDataTemplate({
        ...template,
        confirmation: newTransferConfirmationNotRegisteredMapper.bind(this)(
          this.saveDataTemplateService.dataTemplate
        )
      });

      this.configTemplate.changeStep(this.configTemplate.config.router[1]);
    }
  }

  private _initForm(): void {
    this.formNewTransferToWho = this.fb.group({
      from: [
        this.saveDataTemplateService.dataTemplate?.toWho?.from || null,
        [Validators.required, newTransferFromValidator.bind(this)]
      ],
      bank: [
        this.saveDataTemplateService.dataTemplate?.toWho?.bank || {
          id: '0002',
          name: 'Banco Popular'
        }
      ],
      typeAccount: [
        this.saveDataTemplateService.dataTemplate?.toWho?.typeAccount ||
          'DEPOSIT_ACCOUNT'
      ],
      numberAccount: [
        this.saveDataTemplateService.dataTemplate?.toWho?.numberAccount || null,
        [Validators.required, newTransferNumberAccountValidator]
      ],
      amount: [
        this.saveDataTemplateService.dataTemplate?.howMuch?.amount?.value ||
          null,
        [Validators.required, transferNotRegisteredAmountValidator.bind(this)]
      ],
      description: [
        this.saveDataTemplateService.dataTemplate?.howMuch?.description || null,
        [newTransferAlphanumericValidator.bind(this)]
      ],
      voucherId: [
        this.saveDataTemplateService.dataTemplate?.howMuch?.voucherId,
        newTransferAlphanumericValidator.bind(this)
      ],
      date: [
        this.saveDataTemplateService.dataTemplate?.when?.date || this.today,
        [Validators.required]
      ],
      favorite: [false]
    });
    !this.saveDataTemplateService?.dataTemplate?.toWho?.from &&
      this.loadSelectedProduct(
        this.formNewTransferToWho,
        'from',
        this.products$
      )
        .pipe(first())
        .subscribe();
  }
}
