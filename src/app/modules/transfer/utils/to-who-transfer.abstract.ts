import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Injectable, Injector } from '@angular/core';

import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConfigGlobalToWhoAbstract } from '@commons/velocity/templates/utils/abstracts/config-global-to-who.abstract';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { Product } from '@commons/models/product.model';
import { GROUP_ONE } from '@commons/constants/group-products';
import { ICardSmallEntities } from '@commons/entities/card-small.entities';
import { cardSmallMapper } from '@commons/mappers/card-small.mapper';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { MinAmountTransactions } from '@commons/constants/min-amount-transactions';
@Injectable()
export class ToWhoTransferAbstract extends ConfigGlobalToWhoAbstract {
  public formNewTransferToWho: FormGroup;

  protected facade: NewTransferFacade;
  protected fb: FormBuilder;
  protected currencyFormat: CurrencyFormatPipe;
  protected translateService: TranslateService;
  protected configTemplate: ConfigTemplateService;
  protected constructor(protected injector: Injector) {
    super(injector);
    this.fb = injector.get(FormBuilder);
    this.facade = injector.get(NewTransferFacade);
    this.currencyFormat = injector.get(CurrencyFormatPipe);
    this.translateService = injector.get(TranslateService);
    this.configTemplate = injector.get(ConfigTemplateService);
  }

  get products$(): Observable<Product[]> {
    return this.facade.filterProducts$(GROUP_ONE);
  }

  get from(): AbstractControl {
    return this.formNewTransferToWho.get('from');
  }

  get bank(): AbstractControl {
    return this.formNewTransferToWho.get('bank');
  }

  get amount(): AbstractControl {
    return this.formNewTransferToWho.get('amount');
  }

  get description(): AbstractControl {
    return this.formNewTransferToWho.get('description');
  }

  get voucherId(): AbstractControl {
    return this.formNewTransferToWho.get('voucherId');
  }

  get date(): AbstractControl {
    return this.formNewTransferToWho.get('date');
  }

  get favorite(): AbstractControl {
    return this.formNewTransferToWho.get('favorite');
  }

  get productActive(): ICardSmallEntities {
    return cardSmallMapper(
      this.formNewTransferToWho.value.from,
      this.translateService,
      this.currencyFormat
    );
  }

  get isErrorCardActive(): boolean {
    return !(
      this.formNewTransferToWho?.value?.from?.productAccountBalances
        ?.saldo_disponible?.amount >= MinAmountTransactions.transfer
    );
  }

  get showButtonProductActive$(): Observable<boolean> {
    return this.products$.pipe(map((data) => data.length > 1));
  }

  public trackBy(index: number, product: Product): string {
    return trackBy(product, product.id);
  }

  public changeAccount(elem: any): void {
    return elem?.el?.click();
  }
}
