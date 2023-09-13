import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  newTransferFromValidator,
  newTransferNumberAccountValidator
} from '@modules/transfer/helpers/transfer.validators';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { ToWhoTransferAbstract } from '@modules/transfer/utils/to-who-transfer.abstract';

@Component({
  selector: 'app-to-who-not-registered',
  templateUrl: './to-who-not-registered.component.html',
  styleUrls: ['./to-who-not-registered.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToWhoNotRegisteredComponent extends ToWhoTransferAbstract
  implements OnInit {
  @ViewChild('hiddenElement', { static: true })
  public hiddenElement: any;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  get typeAccount(): AbstractControl {
    return this.formNewTransferToWho.get('typeAccount');
  }

  get numberAccount(): AbstractControl {
    return this.formNewTransferToWho.get('numberAccount');
  }

  get showButtonProductActive$(): Observable<boolean> {
    return this.products$.pipe(map((data) => data.length > 1));
  }

  public submitForm(): void {
    if (this.formNewTransferToWho.valid) {
      this.saveDataTemplateService.saveDataTemplate({
        ...this.saveDataTemplateService.dataTemplate,
        toWho: {
          ...this.formNewTransferToWho.value
        },
        stepActive: PropertyTemplate.howMuch
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
      ]
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
