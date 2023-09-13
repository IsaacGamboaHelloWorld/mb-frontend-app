import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { delay, filter, map, take } from 'rxjs/operators';

import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { ToWhoPaymentAbstractContainer } from '@modules/payments/utils/to-who-payment.abstract';
import { IRegisteredLoan } from '@modules/payments/entities/loans.entities';
import { IRegisteredLoansState } from '@modules/payments/store/payments.state';

@Component({
  selector: 'app-to-who-loans',
  templateUrl: './to-who-loans.component.html',
  styleUrls: ['./to-who-loans.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToWhoLoansComponent extends ToWhoPaymentAbstractContainer
  implements OnInit {
  constructor(
    protected injector: Injector,
    private typeCreditCard: TypeCreditCardPipe
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchLoans();
    this.initForm();
    this._validateInitCreditCard();
  }

  get registeredLoans$(): Observable<IRegisteredLoansState> {
    return combineLatest([
      this.paymentsFacade.registeredLoans$,
      this.paymentsFacade.activeCreditCardMain$
    ]).pipe(
      map(([loans, product]) => {
        let items;
        if (loans?.information?.length > 0 && !!product) {
          items = loans?.information?.filter(
            (item) => item.accountId === product?.id
          );
        }
        return {
          ...loans,
          information: !!items ? items : loans.information
        };
      })
    );
  }

  get hasLoans$(): Observable<boolean> {
    return this.registeredLoans$.pipe(
      map((data) => data?.information?.length > 0)
    );
  }

  public isTC(type: string): boolean {
    return type === TYPE_ACCOUNTS.CREDIT_CARD || type === TYPE_ACCOUNTS.TC;
  }

  public trackByTo(index: number, loan: IRegisteredLoan): string {
    return trackBy(loan, loan.accountId);
  }

  public fetchLoans(): void {
    this.paymentsFacade.fetchRegisteredLoans();
    this._validateInitCreditCard();
  }

  public setIcon(id: string): string {
    const card = this.typeCreditCard.transform(id);
    return card.name === 'Visa' ? card?.icon : card.img;
  }

  public submitForm(): void {
    if (this.formToWhoPayment.valid) {
      this.saveDataTemplateService.saveDataTemplate({
        ...this.saveDataTemplateService.dataTemplate,
        toWho: {
          ...this.formToWhoPayment.value
        },
        howMuch: null,
        stepActive: PropertyTemplate.howMuch
      });
      this.configTemplate.changeStep(this.configTemplate.config.router[1]);
    }
  }

  private _validateInitCreditCard(): void {
    combineLatest([
      this.registeredLoans$,
      this.paymentsFacade.activeCreditCardMain$
    ])
      .pipe(
        filter(([loans, credit_card]) => loans?.information?.length > 0),
        take(1),
        delay(50)
      )
      .subscribe(([loans, credit_card]) => {
        !!credit_card && this.to.setValue(loans?.information[0]);
      });
  }
}
