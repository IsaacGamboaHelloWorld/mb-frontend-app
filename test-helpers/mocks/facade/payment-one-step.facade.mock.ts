import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MainContainerFacadeMock } from 'test-helpers/mocks/facade/main-container.facade.mock';
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
import {
  IPilaAgreementsState,
  IPilaInformationState,
  IPilaPaymentState,
  ITaxesAgreementsState,
  ITaxesAmountReferenceState,
  ITaxesCitiesState,
  ITaxesPaymentState
} from '@modules/payments/store/payments.state';

@Injectable()
export class PaymentOneStepFacadeMock extends MainContainerFacadeMock {
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

  public fetchTaxesCities(): void {}
  public fetchTaxesAgreements(data: ITaxesAgreementsRequest): void {}
  public fetchTaxesAmountReference(data: ITaxesAmountReferenceRequest): void {}
  public fetchTaxesPayment(data: ITaxesPaymentRequest): void {}
  public fetchPilaAgreements(): void {}
  public fetchPilaInformation(data: IPilaInformationRequest): void {}
  public fetchPilaPayment(data: IPilaPaymentRequest): void {}
  public resetTaxesCities(): void {}
  public resetTaxesAgreements(): void {}
  public resetTaxesAmountReference(): void {}
  public resetTaxesPayment(): void {}
  public resetPilaAgreements(): void {}
  public resetPilaInformation(): void {}
  public resetPilaPayment(): void {}
}
