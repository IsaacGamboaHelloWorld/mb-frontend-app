import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { alphanumericValidator } from '@commons/validators/global-validators.validator';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { IPocketsCategoriesState } from '@modules/pockets/store/pockets.state';
import { IPocketCategory } from '@modules/pockets/constants/pockets.constant';
import { pocketsMapper } from '@modules/pockets/mappers/pockets.mapper';
import { KEYS } from '@commons/constants/global';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';

@Component({
  selector: 'app-for-what',
  templateUrl: './for-what.component.html',
  styleUrls: ['./for-what.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForWhatComponent implements OnInit {
  public formForWhat: FormGroup;
  private _basicProduct: IProductBasic = null;
  constructor(
    private fb: FormBuilder,
    private saveDataTemplateService: SaveDataTemplateService,
    private configTemplate: ConfigTemplateService,
    private secureStorage: AdlSecureStorageService,
    private facade: PocketsFacade
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getParentAccount();
  }

  get pocketName(): AbstractControl {
    return this.formForWhat.get('pocketName');
  }

  get destination(): AbstractControl {
    return this.formForWhat.get('destination');
  }

  get parentAccount(): AbstractControl {
    return this.formForWhat.get('parentAccount');
  }

  get categories$(): Observable<IPocketsCategoriesState> {
    return this.facade.categories$;
  }

  public customCategory(category: string): IPocketCategory {
    return pocketsMapper(category);
  }

  public submitForm(): void {
    if (this.formForWhat.valid) {
      this.saveDataTemplateService.saveDataTemplate({
        ...this.saveDataTemplateService.dataTemplate,
        toWho: {
          ...this.formForWhat.value,
          parentAccount: this._basicProduct
        },
        howMuch: null,
        stepActive: PropertyTemplate.howMuch
      });
      this.configTemplate.changeStep(this.configTemplate.config.router[1]);
    }
  }

  private async _getParentAccount(): Promise<void> {
    this._basicProduct = JSON.parse(
      await this.secureStorage.get(KEYS.ACTIVE_PRODUCT)
    );
  }

  private _initForm(): void {
    this.formForWhat = this.fb.group({
      pocketName: [
        this.saveDataTemplateService.dataTemplate.toWho?.pocketName || null,
        [Validators.required, alphanumericValidator]
      ],
      destination: [
        this.saveDataTemplateService.dataTemplate.toWho?.destination || null,
        [Validators.required]
      ],
      parentAccount: [
        this.saveDataTemplateService.dataTemplate.toWho?.parentAccount || null
      ]
    });
  }
}
