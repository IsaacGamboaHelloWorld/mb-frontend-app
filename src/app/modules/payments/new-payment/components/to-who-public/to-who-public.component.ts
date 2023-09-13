import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { trackBy } from '@app/commons/helpers/trackBy.helper';
import { IListBillerState } from '@modules/payments/store/payments.state';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { IPaymentBills } from '@modules/payments/entities/billers.entities';
import { ToWhoPaymentAbstractContainer } from '@modules/payments/utils/to-who-payment.abstract';

@Component({
  selector: 'app-to-who',
  templateUrl: './to-who-public.component.html',
  styleUrls: ['./to-who-public.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToWhoPublicComponent extends ToWhoPaymentAbstractContainer
  implements OnInit {
  constructor(protected injector: Injector, private datePipe: DatePipe) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchBillers();
    this.initForm();
  }

  get listBiller$(): Observable<IListBillerState> {
    return this.paymentsFacade.listBiller$;
  }

  get hasBillers$(): Observable<boolean> {
    return this.listBiller$.pipe(map((data) => data?.information?.length > 0));
  }

  public setDate(date: string): string {
    return !!date
      ? `${this.translateService.instant('EXPIRE')}: ${this.datePipe.transform(
          date,
          'dd/MMM/yyyy'
        )}`
      : undefined;
  }

  public trackByTo(index: number, product: IPaymentBills): string {
    return trackBy(product, product.billerId);
  }

  public fetchBillers(): void {
    this.paymentsFacade.fetchListBillers();
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
}
