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
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Product } from '@commons/models/product.model';
import { HomeActiveFacade } from '@modules/activate-credit-card/home-active.facade';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { CREDIT_CARD_MODE } from '@modules/forms/constants/type-input';
import { maskHtmlId } from '@commons/mappers/card-type-class.mapper';
import { lengthCreditCardValidator } from '@modules/activate-credit-card/helpers/active-product.validators';
import { IActiveCreditCardState } from '@modules/activate-credit-card/store/active-credit-card.state';

@Component({
  selector: 'app-active-card',
  templateUrl: './active-card.component.html',
  styleUrls: ['./active-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveCardComponent implements OnInit, OnDestroy {
  public formActiveCreditCard: FormGroup;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private facade: HomeActiveFacade, private fb: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.formActiveCreditCard.reset();
  }

  get productId(): AbstractControl {
    return this.formActiveCreditCard.get('productId');
  }

  get configCreditCard(): object {
    return CREDIT_CARD_MODE;
  }

  get maskId(): string {
    return maskHtmlId(this.productId.currencyValue()?.toString());
  }

  get activeCreditCard$(): Observable<IActiveCreditCardState> {
    return this.facade.activeCreditCard$;
  }

  get creditCards$(): Observable<Product[]> {
    return this.facade.filterProducts$([TYPE_ACCOUNTS.CREDIT_CARD]);
  }

  get hasProducts$(): Observable<boolean> {
    return this.creditCards$.pipe(map((products) => products?.length > 0));
  }

  public formSubmit(): void {
    if (this.formActiveCreditCard.valid) {
      this.facade.fetchActiveCreditCard({
        accountId: this.productId.currencyValue()?.toString()
      });
    }
  }

  private _initForm(): void {
    this.formActiveCreditCard = this.fb.group({
      productId: [null, [Validators.required, lengthCreditCardValidator]]
    });
  }
}
