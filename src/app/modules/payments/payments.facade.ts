import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  barcodeBiller,
  detailBiller,
  listBiller,
  paymentBiller,
  paymentLoan,
  pilaAgreements,
  pilaInformation,
  pilaPayment,
  registeredLoans,
  searchBiller,
  taxesAgreements,
  taxesAmountReference,
  taxesCities,
  taxesPayment
} from '@modules/payments/store/payments.selector';
import {
  IBarcodeBillerState,
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
import { listBillerLoadAction } from '@modules/payments/store/actions/billers-list.action';
import {
  paymentBillerLoadAction,
  paymentBillerResetAction
} from '@modules/payments/store/actions/billers-payment.action';
import {
  IAgreementsBody,
  IBillerBarcode,
  IBillerDetailBody,
  INewPaymentBillerService
} from '@modules/payments/entities/billers.entities';
import { registeredLoansLoadAction } from '@modules/payments/store/actions/loans-registered.action';
import {
  paymentLoanLoadAction,
  paymentLoanResetAction
} from '@modules/payments/store/actions/loans-payment.action';
import { IBodyLoanPayment } from '@modules/payments/entities/loans.entities';
import {
  detailBillerLoadAction,
  detailBillerResetAction
} from '@modules/payments/store/actions/billers-detail.action';
import {
  searchBillerLoadAction,
  searchBillerResetAction
} from '@modules/payments/store/actions/billers-search.action';
import {
  barcodeBillerLoadAction,
  barcodeBillerResetAction
} from '@modules/payments/store/actions/billers-barcode.action';
import {
  taxesCitiesLoadAction,
  taxesCitiesResetAction
} from '@modules/payments/store/actions/taxes-cities.action';
import { BANKS } from '@commons/constants/banks';
import {
  ITaxesAgreementsRequest,
  ITaxesAmountReferenceRequest,
  ITaxesPaymentRequest
} from '@modules/payments/entities/tax-payment.entities';
import {
  taxesAgreementsLoadAction,
  taxesAgreementsResetAction
} from '@modules/payments/store/actions/taxes-agreements.action';
import {
  taxesAmountReferenceLoadAction,
  taxesAmountReferenceResetAction
} from '@modules/payments/store/actions/taxes-amount-reference.action';
import {
  taxesPaymentLoadAction,
  taxesPaymentResetAction
} from '@modules/payments/store/actions/taxes-payment.action';
import {
  pilaAgreementsLoadAction,
  pilaAgreementsResetAction
} from '@modules/payments/store/actions/pila-agreements.action';
import {
  IPilaInformationRequest,
  IPilaPaymentRequest
} from '@modules/payments/entities/pila-payment.entities';
import {
  pilaInformationLoadAction,
  pilaInformationResetAction
} from '@modules/payments/store/actions/pila-information.action';
import {
  pilaPaymentLoadAction,
  pilaPaymentResetAction
} from '@modules/payments/store/actions/pila-payment.action';

@Injectable()
export class PaymentsFacade extends MainContainerFacade {
  public listBiller$: Observable<IListBillerState> = this.store.pipe(
    select(listBiller)
  );

  public paymentBiller$: Observable<IPayBillerState> = this.store.pipe(
    select(paymentBiller)
  );

  public searchBiller$: Observable<ISearchBillerState> = this.store.pipe(
    select(searchBiller)
  );

  public detailBiller$: Observable<IDetailBillerState> = this.store.pipe(
    select(detailBiller)
  );

  public barcodeBiller$: Observable<IBarcodeBillerState> = this.store.pipe(
    select(barcodeBiller)
  );

  public registeredLoans$: Observable<IRegisteredLoansState> = this.store.pipe(
    select(registeredLoans)
  );

  public paymentLoan$: Observable<ILoanPaymentState> = this.store.pipe(
    select(paymentLoan)
  );

  public taxesCities$: Observable<ITaxesCitiesState> = this.store.pipe(
    select(taxesCities)
  );

  public taxesAgreements$: Observable<ITaxesAgreementsState> = this.store.pipe(
    select(taxesAgreements)
  );

  public taxesAmountReference$: Observable<
    ITaxesAmountReferenceState
  > = this.store.pipe(select(taxesAmountReference));

  public taxesPayment$: Observable<ITaxesPaymentState> = this.store.pipe(
    select(taxesPayment)
  );

  public pilaAgreements$: Observable<IPilaAgreementsState> = this.store.pipe(
    select(pilaAgreements)
  );

  public pilaInformation$: Observable<IPilaInformationState> = this.store.pipe(
    select(pilaInformation)
  );

  public pilaPayment$: Observable<IPilaPaymentState> = this.store.pipe(
    select(pilaPayment)
  );

  public fetchListBillers(): void {
    this.store.dispatch(listBillerLoadAction());
  }

  public fetchBarcodeBiller(barcode: IBillerBarcode): void {
    this.store.dispatch(barcodeBillerLoadAction(barcode));
  }

  public fetchNewPaymentBiller(body: INewPaymentBillerService): void {
    this.store.dispatch(paymentBillerLoadAction(body));
  }

  public fetchNewPaymentLoan(body: IBodyLoanPayment): void {
    this.store.dispatch(paymentLoanLoadAction(body));
  }

  public fetchSearchBiller(body: IAgreementsBody): void {
    this.store.dispatch(searchBillerLoadAction(body));
  }

  public fetchDetailBiller(body: IBillerDetailBody): void {
    this.store.dispatch(detailBillerLoadAction(body));
  }

  public fetchRegisteredLoans(): void {
    this.store.dispatch(registeredLoansLoadAction());
  }

  public fetchPaymentLoan(body: IBodyLoanPayment): void {
    this.store.dispatch(paymentLoanLoadAction(body));
  }

  public fetchTaxesCities(): void {
    this.store.dispatch(
      taxesCitiesLoadAction({ companyId: BANKS.BANCO_POPULAR })
    );
  }

  public fetchTaxesAgreements(data: ITaxesAgreementsRequest): void {
    this.store.dispatch(taxesAgreementsLoadAction(data));
  }

  public fetchTaxesAmountReference(data: ITaxesAmountReferenceRequest): void {
    this.store.dispatch(taxesAmountReferenceLoadAction(data));
  }

  public fetchTaxesPayment(data: ITaxesPaymentRequest): void {
    this.store.dispatch(taxesPaymentLoadAction(data));
  }

  public fetchPilaAgreements(): void {
    this.store.dispatch(
      pilaAgreementsLoadAction({
        companyId: BANKS.BANCO_POPULAR,
        organizationIdType: '335',
        channel: 'Another'
      })
    );
  }

  public fetchPilaInformation(data: IPilaInformationRequest): void {
    this.store.dispatch(pilaInformationLoadAction(data));
  }

  public fetchPilaPayment(data: IPilaPaymentRequest): void {
    this.store.dispatch(pilaPaymentLoadAction(data));
  }

  public resetNewPaymentBiller(): void {
    this.store.dispatch(paymentBillerResetAction());
  }

  public resetNewPaymentLoan(): void {
    this.store.dispatch(paymentLoanResetAction());
  }

  public resetDetailBiller(): void {
    this.store.dispatch(detailBillerResetAction());
  }

  public resetSearchBiller(): void {
    this.store.dispatch(searchBillerResetAction());
  }

  public resetBarcodeBiller(): void {
    this.store.dispatch(barcodeBillerResetAction());
  }

  public resetTaxesCities(): void {
    this.store.dispatch(taxesCitiesResetAction());
  }

  public resetTaxesAgreements(): void {
    this.store.dispatch(taxesAgreementsResetAction());
  }

  public resetTaxesAmountReference(): void {
    this.store.dispatch(taxesAmountReferenceResetAction());
  }

  public resetTaxesPayment(): void {
    this.store.dispatch(taxesPaymentResetAction());
  }

  public resetPilaAgreements(): void {
    this.store.dispatch(pilaAgreementsResetAction());
  }

  public resetPilaInformation(): void {
    this.store.dispatch(pilaInformationResetAction());
  }

  public resetPilaPayment(): void {
    this.store.dispatch(pilaPaymentResetAction());
  }
}
