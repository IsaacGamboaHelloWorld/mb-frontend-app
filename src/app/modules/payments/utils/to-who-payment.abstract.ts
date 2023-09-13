import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { filter, first, map } from 'rxjs/operators';
import { Injectable, Injector, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { newPaymentFromValidator } from '@modules/payments/helpers/new-payment.validators';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { Product } from '@commons/models/product.model';
import { GROUP_ONE } from '@commons/constants/group-products';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ICardSmallEntities } from '@commons/entities/card-small.entities';
import { cardSmallMapper } from '@commons/mappers/card-small.mapper';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { MIN_BALANCE } from '@commons/constants/global';
import { PaymentsFacade } from '@modules/payments/payments.facade';

@Injectable()
export abstract class ToWhoPaymentAbstractContainer {
  @ViewChild('hiddenElement', { static: true })
  public hiddenElement: any;

  public formToWhoPayment: FormGroup;
  public loading: number = 3;

  protected fb: FormBuilder;
  protected paymentsFacade: PaymentsFacade;
  protected currencyFormat: CurrencyFormatPipe;
  protected translateService: TranslateService;
  protected saveDataTemplateService: SaveDataTemplateService;
  protected configTemplate: ConfigTemplateService;

  protected constructor(protected injector: Injector) {
    this.fb = this.injector.get(FormBuilder);
    this.paymentsFacade = this.injector.get(PaymentsFacade);
    this.currencyFormat = this.injector.get(CurrencyFormatPipe);
    this.translateService = this.injector.get(TranslateService);
    this.saveDataTemplateService = this.injector.get(SaveDataTemplateService);
    this.configTemplate = this.injector.get(ConfigTemplateService);
  }

  get products$(): Observable<Product[]> {
    return this.paymentsFacade.filterProducts$(GROUP_ONE);
  }

  get from(): AbstractControl {
    return this.formToWhoPayment.get('from');
  }

  get to(): AbstractControl {
    return this.formToWhoPayment.get('to');
  }

  get showButtonProductActive$(): Observable<boolean> {
    return this.products$.pipe(map((data) => data.length > 1));
  }

  get productActive(): ICardSmallEntities {
    return cardSmallMapper(
      this.formToWhoPayment.value.from,
      this.translateService,
      this.currencyFormat
    );
  }

  get isErrorCardActive(): boolean {
    return !(
      this.formToWhoPayment?.value?.from?.productAccountBalances
        ?.saldo_disponible?.amount >= MIN_BALANCE.PAYMENTS
    );
  }

  public trackBy(index: number, product: Product): string {
    return trackBy(product, product.id);
  }

  public changeAccount(elem: any): void {
    elem?.el?.click();
  }

  protected setProduct(): void {
    this.products$
      .pipe(
        filter(
          (products) =>
            isNullOrUndefined(
              this.saveDataTemplateService?.dataTemplate?.toWho?.from
            ) && products.length > 0
        ),
        first()
      )
      .subscribe((products) => {
        this.formToWhoPayment.controls['from'].setValue(products[0]);
        this.formToWhoPayment.controls['from'].markAsTouched();
      });
  }

  protected initForm(): void {
    this.formToWhoPayment = this.fb.group({
      from: [
        this.saveDataTemplateService.dataTemplate?.toWho?.from || null,
        [Validators.required, newPaymentFromValidator.bind(this)]
      ],
      to: [
        this.saveDataTemplateService.dataTemplate?.toWho?.to || null,
        [Validators.required]
      ]
    });
    this.setProduct();
  }
}
