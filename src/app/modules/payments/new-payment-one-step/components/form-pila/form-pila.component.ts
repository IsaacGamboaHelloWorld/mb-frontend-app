import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

import { ToWhoPaymentAbstractContainer } from '@modules/payments/utils/to-who-payment.abstract';
import { newPaymentFromValidator } from '@modules/payments/helpers/new-payment.validators';
import { typeReferenceValidator } from '@modules/payments/new-payment-one-step/helpers/new-payment-one-step.validators';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { IMonthItem, MONTHS } from '@commons/constants/global';
import { IPilaAgreementsState } from '@modules/payments/store/payments.state';
import {
  pilaInfoBillerMapper,
  pilaInfoPayrollMapper
} from '@modules/payments/new-payment-one-step/mappers/pila-payment.mapper';
import { pilaPaymentConfirmationMapper } from '@modules/payments/new-payment-one-step/mappers/pila-confirmation.mapper';

@Component({
  selector: 'app-form-pila',
  templateUrl: './form-pila.component.html',
  styleUrls: ['./form-pila.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPilaComponent extends ToWhoPaymentAbstractContainer
  implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
    this.paymentsFacade.fetchPilaAgreements();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get from(): AbstractControl {
    return this.formToWhoPayment.get('from');
  }

  get to(): AbstractControl {
    return this.formToWhoPayment.get('to');
  }

  get referenceType(): AbstractControl {
    return this.formToWhoPayment.get('referenceType');
  }

  get payrollNumber(): AbstractControl {
    return this.formToWhoPayment.get('payrollNumber');
  }

  get documentId(): AbstractControl {
    return this.formToWhoPayment.get('documentId');
  }

  get month(): AbstractControl {
    return this.formToWhoPayment.get('month');
  }

  get year(): AbstractControl {
    return this.formToWhoPayment.get('year');
  }

  get paymentInfo(): AbstractControl {
    return this.formToWhoPayment.get('paymentInfo');
  }

  get months(): IMonthItem[] {
    return MONTHS;
  }

  get pilaAgreements$(): Observable<IPilaAgreementsState> {
    return this.paymentsFacade.pilaAgreements$;
  }

  get isLoadingPilaInformation$(): Observable<boolean> {
    return this.paymentsFacade.pilaInformation$?.pipe(
      map((data) => data.loading)
    );
  }

  get isLoadingDetailBiller$(): Observable<boolean> {
    return this.paymentsFacade.detailBiller$?.pipe(map((data) => data.loading));
  }

  get showPayroll(): boolean {
    return this.referenceType.value === 1;
  }

  get showDocument(): boolean {
    return this.referenceType.value === 2;
  }

  public submitForm(): void {
    if (this.formToWhoPayment.valid) {
      if (this.referenceType.value === 1) {
        this.paymentsFacade.fetchDetailBiller(
          pilaInfoBillerMapper(this.formToWhoPayment)
        );
        this.paymentsFacade.detailBiller$
          .pipe(
            filter((data) => data.completed),
            map((data) => data.information),
            first()
          )
          .subscribe((data) => {
            this.paymentInfo.setValue(data);
            this._redirectStep();
          });
      } else {
        this.paymentsFacade.fetchPilaInformation(
          pilaInfoPayrollMapper(this.formToWhoPayment)
        );
        this.paymentsFacade.pilaInformation$
          .pipe(
            filter((data) => data.completed),
            map((data) => data.information),
            first()
          )
          .subscribe((data) => {
            this.paymentInfo.setValue(data);
            this._redirectStep();
          });
      }
    }
  }

  private _initForm(): void {
    this.formToWhoPayment = this.fb.group({
      from: [
        this.saveDataTemplateService.dataTemplate?.toWho?.from || null,
        [Validators.required, newPaymentFromValidator.bind(this)]
      ],
      to: [
        this.saveDataTemplateService.dataTemplate?.toWho?.to || null,
        Validators.required
      ],
      referenceType: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.referenceType
          ?.value || null,
        [Validators.required, typeReferenceValidator.bind(this)]
      ],
      payrollNumber: [
        this.saveDataTemplateService.dataTemplate?.toWho?.payrollNumber || null
      ],
      documentId: [
        this.saveDataTemplateService.dataTemplate?.toWho?.documentId || null
      ],
      month: [
        this.saveDataTemplateService.dataTemplate?.toWho?.month ||
          this.months[0]
      ],
      year: [this.saveDataTemplateService.dataTemplate?.toWho?.year || null],
      paymentInfo: [
        this.saveDataTemplateService.dataTemplate?.toWho?.paymentInfo || null
      ]
    });
    this.setProduct();
  }

  private _redirectStep(): void {
    const toWho: ISaveDataTemplate = {
      ...this.saveDataTemplateService.dataTemplate,
      stepActive: PropertyTemplate.confirmation,
      toWho: {
        ...this.formToWhoPayment.value
      }
    };
    this.saveDataTemplateService.saveDataTemplate(toWho);
    this.saveDataTemplateService.saveDataTemplate({
      ...toWho,
      confirmation: pilaPaymentConfirmationMapper.bind(this)(
        this.saveDataTemplateService.dataTemplate
      )
    });
    this.configTemplate.changeStep(this.configTemplate.config.router[1]);
  }
}
