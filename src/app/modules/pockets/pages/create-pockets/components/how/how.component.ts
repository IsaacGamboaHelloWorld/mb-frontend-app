import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { NavController } from '@ionic/angular';

import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { CURRENCY } from '@modules/forms/constants/type-input';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { createPocketServiceMapper } from '@modules/pockets/pages/create-pockets/mappers/create-pocket.mapper';
import { pocketGoalValidator } from '@modules/pockets/helpers/pockets.validators';
import { ModalService } from '@commons/services/modal.service';
import { ICreatePocketState } from '@modules/pockets/store/pockets.state';
import {
  IPocketsPeriodicityItem,
  POCKETS_PERIODICITY
} from '@modules/pockets/constants/pockets.constant';

@Component({
  selector: 'app-how',
  templateUrl: './how.component.html',
  styleUrls: ['./how.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowComponent implements OnInit, OnDestroy {
  public formWhen: FormGroup;
  private _subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private facade: PocketsFacade,
    private navCtrl: NavController,
    private modalService: ModalService,
    private translateService: TranslateService,
    private saveDataTemplateService: SaveDataTemplateService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  ngOnDestroy(): void {
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
  }

  get configCurrency(): object {
    return CURRENCY;
  }

  get periodicAmount(): AbstractControl {
    return this.formWhen.get('periodicAmount');
  }

  get pocketPeriod(): AbstractControl {
    return this.formWhen.get('pocketPeriod');
  }

  get isLoading$(): Observable<boolean> {
    return this.facade.createPocket$?.pipe(map((data) => data.loading));
  }

  get createPocketStatus$(): Observable<ICreatePocketState> {
    return this.facade.createPocket$;
  }

  get periodicityItems(): IPocketsPeriodicityItem[] {
    return POCKETS_PERIODICITY;
  }

  public submitForm(): void {
    if (this.formWhen.valid) {
      const template: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        when: {
          ...this.formWhen.value,
          periodicAmount: {
            value: this.periodicAmount?.value,
            normal: this.periodicAmount?.currencyValue()
          }
        }
      };
      this.saveDataTemplateService.saveDataTemplate(template);
      this.facade.createPocket(
        createPocketServiceMapper(this.saveDataTemplateService.dataTemplate)
      );
    }
  }

  private _initForm(): void {
    this.formWhen = this.fb.group({
      pocketPeriod: [
        this.saveDataTemplateService.dataTemplate.when?.pocketPeriod || null,
        [Validators.required]
      ],
      periodicAmount: [
        this.saveDataTemplateService.dataTemplate.when?.savingAmount?.value ||
          null,
        [
          Validators.required,
          pocketGoalValidator(
            this.saveDataTemplateService.dataTemplate.howMuch?.savingAmount
              ?.normal
          )
        ]
      ]
    });
  }
}
