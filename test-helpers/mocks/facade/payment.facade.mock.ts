import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MainContainerFacadeMock } from 'test-helpers/mocks/facade/main-container.facade.mock';
import {
  IDetailBillerState,
  IListBillerState,
  ILoanPaymentState,
  IPayBillerState,
  IPilaAgreementsState,
  IPilaInformationState,
  IPilaPaymentState,
  IRegisteredLoansState,
  ISearchBillerState,
  ITaxesAgreementsState,
  ITaxesAmountReferenceState,
  ITaxesCitiesState,
  ITaxesPaymentState
} from '@modules/payments/store/payments.state';
import { initListBiller } from '@modules/payments/store/reducers/billers-list.reducer';
import { initPaymentLoan } from '@modules/payments/store/reducers/loans-payment.reducer';
import { initRegisteredLoans } from '@modules/payments/store/reducers/loans-registered.reducer';
import { initPaymentBiller } from '@modules/payments/store/reducers/billers-payment.reducer';
import { initSearchBiller } from '@modules/payments/store/reducers/billers-search.reducer';
import { initDetailBiller } from '@modules/payments/store/reducers/billers-detail.reducer';
import {
  IAgreementsBody,
  IBillerDetailBody,
  INewPaymentBillerService
} from '@modules/payments/entities/billers.entities';
import { IBodyLoanPayment } from '@modules/payments/entities/loans.entities';
import { initTaxesCities } from '@modules/payments/store/reducers/taxes-cities.reducer';
import { initTaxesAgreements } from '@modules/payments/store/reducers/taxes-agreements.reducer';
import { initTaxesAmountReference } from '@modules/payments/store/reducers/taxes-amount-reference.reducer';
import { initTaxesPayment } from '@modules/payments/store/reducers/taxes-payment.reducer';
import { initPilaAgreements } from '@modules/payments/store/reducers/pila-agreements.reducer';
import { initPilaInformation } from '@modules/payments/store/reducers/pila-information.reducer';
import { initPilaPayment } from '@modules/payments/store/reducers/pila-payment.reducer';
import {
  ITaxesAgreementsRequest,
  ITaxesAmountReferenceRequest,
  ITaxesPaymentRequest
} from '@modules/payments/entities/tax-payment.entities';
import {
  IPilaInformationRequest,
  IPilaPaymentRequest
} from '@modules/payments/entities/pila-payment.entities';

@Injectable()
export class PaymentFacadeMock extends MainContainerFacadeMock {
  public listBiller$: Observable<IListBillerState> = new BehaviorSubject(
    initListBiller
  );

  public paymentBiller$: Observable<IPayBillerState> = new BehaviorSubject(
    initPaymentBiller
  );

  public searchBiller$: Observable<ISearchBillerState> = new BehaviorSubject(
    initSearchBiller
  );

  public detailBiller$: Observable<IDetailBillerState> = new BehaviorSubject(
    initDetailBiller
  );

  public registeredLoans$: Observable<
    IRegisteredLoansState
  > = new BehaviorSubject(initRegisteredLoans);

  public paymentLoan$: Observable<ILoanPaymentState> = new BehaviorSubject(
    initPaymentLoan
  );

  public taxesCities$: Observable<ITaxesCitiesState> = new BehaviorSubject(
    initTaxesCities
  );

  public taxesAgreements$: Observable<
    ITaxesAgreementsState
  > = new BehaviorSubject(initTaxesAgreements);

  public taxesAmountReference$: Observable<
    ITaxesAmountReferenceState
  > = new BehaviorSubject(initTaxesAmountReference);

  public taxesPayment$: Observable<ITaxesPaymentState> = new BehaviorSubject(
    initTaxesPayment
  );

  public pilaAgreements$: Observable<
    IPilaAgreementsState
  > = new BehaviorSubject(initPilaAgreements);

  public pilaInformation$: Observable<
    IPilaInformationState
  > = new BehaviorSubject(initPilaInformation);

  public pilaPayment$: Observable<IPilaPaymentState> = new BehaviorSubject(
    initPilaPayment
  );

  public fetchListBillers(): void {}
  public fetchNewPaymentBiller(body: INewPaymentBillerService): void {}
  public fetchNewPaymentLoan(body: IBodyLoanPayment): void {}
  public fetchSearchBiller(body: IAgreementsBody): void {}
  public fetchDetailBiller(body: IBillerDetailBody): void {}
  public fetchRegisteredLoans(): void {}
  public fetchPaymentLoan(body: IBodyLoanPayment): void {}
  public fetchTaxesCities(): void {}
  public fetchTaxesAgreements(data: ITaxesAgreementsRequest): void {}
  public fetchTaxesAmountReference(data: ITaxesAmountReferenceRequest): void {}
  public fetchTaxesPayment(data: ITaxesPaymentRequest): void {}
  public fetchPilaAgreements(): void {}
  public fetchPilaInformation(data: IPilaInformationRequest): void {}
  public fetchPilaPayment(data: IPilaPaymentRequest): void {}
  public resetNewPaymentBiller(): void {}
  public resetNewPaymentLoan(): void {}
  public resetDetailBiller(): void {}
  public resetSearchBiller(): void {}
  public resetTaxesCities(): void {}
  public resetTaxesAgreements(): void {}
  public resetTaxesAmountReference(): void {}
  public resetTaxesPayment(): void {}
  public resetPilaAgreements(): void {}
  public resetPilaInformation(): void {}
  public resetPilaPayment(): void {}
  public resetBarcodeBiller(): void {}
}
