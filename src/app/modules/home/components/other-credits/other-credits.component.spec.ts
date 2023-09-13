import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { OtherCreditsComponent } from './other-credits.component';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';
import { TestingModule } from '@test-helpers/testing.module';

describe('OtherCreditsComponent', () => {
  let component: OtherCreditsComponent;
  let fixture: ComponentFixture<OtherCreditsComponent>;

  const freeDestination: IFreeDestinationDetail = {
    accountIdentifier: '',
    clientDate: '',
    creditCode: 'creditCodeMock',
    creditName: '',
    currentStatus: '',
    totalDueAmount: 0,
    nextPaymentAmount: 0,
    dueDate: '',
    dueDays: 1,
    currentRate: 0,
    dueRate: 0,
    startDate: '',
    minimumAmountToPay: 210,
    outstandingBalance: 0,
    approvalAmount: 2000,
    disburseValue: 0,
    term: 0
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OtherCreditsComponent],
        imports: [IonicModule, TestingModule],
        providers: [TypeCreditCardPipe],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(OtherCreditsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.rollLoansAll = createAllRolls();
    expect(component).toBeTruthy();
  });

  it('should validate gets', () => {
    component.rollLoansAll = createAllRolls();
    expect(component.sufficientSlides).toBeTruthy();
    expect(component.quantityLoans).toBe(2);
    expect(component.hasRollLoans).toBeTruthy();
    expect(component.validateLengthLoan).toBe(true);
    expect(component.dataRollLoans).toBe(component.rollLoansAll.rollLoans);
  });
  it('should validate isOnly', () => {
    component.rollLoansAll = createAllRolls();
    expect(component.isOnly([])).toBe(true);
    expect(component.isOnly([createRollLoans()])).toBe(true);
    expect(component.isOnly([createRollLoans(), createRollLoans()])).toBe(
      false
    );
  });

  it('should validate create rolls mapper', () => {
    component.rollLoansAll = createAllRolls();
    component.setRollLoans(createAllRolls(), createRollLoans());
    expect(component.hasRollLoans).toBeTruthy();
  });

  it('should validate neededToPay', () => {
    component.rollLoansAll = createAllRolls();
    expect(component.neededToPay(createRollLoans())).toBe(true);
  });
  it('should validate progress', () => {
    component.rollLoansAll = createAllRolls();
    expect(component.progress(createRollLoans())).toEqual(100);
  });
  function createAllRolls(): any {
    return {
      rollLoans: [
        {
          approvalId: null,
          errorMessage: null,
          specificErrorMessage: null,
          accountId: '55003010110613',
          accountType: 'PAYDAY_LOAN',
          status: '99 - CANCELADO',
          sector: '2 - PENSIONADOS',
          subSector: '',
          company: {
            id: '8001136727',
            name:
              'GOBIERNO DEPARTAMENTAL DEL TOLIMA PENSIONADOS - IBAGUE - 550 -',
            invoiceId: '44'
          },
          openingDate: '1976-02-01T07:00:00.000-05:00',
          closingDate: '',
          saleDate: '1900-01-01T07:03:44.000-04:56',
          purchaseDate: '1900-01-01T07:03:44.000-04:56',
          initialAmount: '',
          balanceAmount: '',
          fees: 60,
          payedFees: 54,
          chargedFees: 54,
          approvedAmount: 5000000,
          approvalRate: '25',
          feeAmount: 146757,
          disbursementAmount: 3951724,
          disbursementDate: '2005-05-19T07:00:00.000-05:00',
          initialPaymentDate: '2005-07-05T07:00:00.000-05:00',
          finalPaymentDate: '2010-01-13T07:00:00.000-05:00',
          nextPaymentDate: '2010-02-05T07:00:00.000-05:00',
          initDateArrears: '2010-01-13T07:00:00.000-05:00',
          daysArrears: null,
          lastPaymentDate: '2010-01-13T07:00:00.000-05:00',
          obligationBalance: 0,
          modality:
            '1 - 1-ORD HST 50 AÑO 364 DIA - 1 - PENSIONADO - 3 - PENSIONADOS',
          economicStatus: '1',
          success: true
        },
        {
          approvalId: null,
          errorMessage: null,
          specificErrorMessage: null,
          accountId: '5500300024035',
          accountType: 'PAYDAY_LOAN',
          status: '99 - CANCELADO',
          sector: '3 - ENTES TERRITORIALES',
          subSector: '',
          company: {
            id: '8001136727',
            name: 'GOBIERNO DEPARTAMENTAL DEL TOLIMA - IBAGUE - 550 -',
            invoiceId: '43'
          },
          openingDate: '1980-01-01T07:00:00.000-05:00',
          closingDate: '',
          saleDate: '1900-01-01T07:03:44.000-04:56',
          purchaseDate: '1900-01-01T07:03:44.000-04:56',
          initialAmount: '',
          balanceAmount: '',
          fees: 25,
          payedFees: 24,
          chargedFees: 25,
          approvedAmount: 1200000,
          approvalRate: '26.43',
          feeAmount: 64892,
          disbursementAmount: 0,
          disbursementDate: '2000-08-14T07:00:00.000-05:00',
          initialPaymentDate: '2000-10-05T07:00:00.000-05:00',
          finalPaymentDate: '2002-10-09T07:00:00.000-05:00',
          nextPaymentDate: '2002-11-05T07:00:00.000-05:00',
          initDateArrears: '2002-09-05T07:00:00.000-05:00',
          daysArrears: null,
          lastPaymentDate: '2002-10-09T07:00:00.000-05:00',
          obligationBalance: 0,
          modality: '1 - 1-ORD HST 50 AÑO 364 DIA - 2 - ACTIVO - 2 - PUBLICO',
          economicStatus: '2',
          success: true
        }
      ],
      loading: false,
      completed: true,
      error: false,
      errorMessage: ''
    };
  }
  function createRollLoans(): any {
    return {
      approvalId: null,
      errorMessage: null,
      specificErrorMessage: null,
      accountId: '55003010110613',
      accountType: 'PAYDAY_LOAN',
      status: '99 - CANCELADO',
      sector: '2 - PENSIONADOS',
      subSector: '',
      company: {
        id: '8001136727',
        name: 'GOBIERNO DEPARTAMENTAL DEL TOLIMA PENSIONADOS - IBAGUE - 550 -',
        invoiceId: '44'
      },
      openingDate: '1976-02-01T07:00:00.000-05:00',
      closingDate: '',
      saleDate: '1900-01-01T07:03:44.000-04:56',
      purchaseDate: '1900-01-01T07:03:44.000-04:56',
      initialAmount: '',
      balanceAmount: '',
      fees: 60,
      payedFees: 54,
      chargedFees: 54,
      approvedAmount: 5000000,
      approvalRate: '25',
      feeAmount: 146757,
      disbursementAmount: 3951724,
      disbursementDate: '2005-05-19T07:00:00.000-05:00',
      initialPaymentDate: '2005-07-05T07:00:00.000-05:00',
      finalPaymentDate: '2010-01-13T07:00:00.000-05:00',
      nextPaymentDate: '2010-02-05T07:00:00.000-05:00',
      initDateArrears: '2010-01-13T07:00:00.000-05:00',
      daysArrears: null,
      lastPaymentDate: '2010-01-13T07:00:00.000-05:00',
      obligationBalance: 0,
      modality:
        '1 - 1-ORD HST 50 AÑO 364 DIA - 1 - PENSIONADO - 3 - PENSIONADOS',
      economicStatus: '1',
      success: true
    };
  }

  it('should get quantityFreeDestinationCredits', () => {
    component.freeDestination = [freeDestination];
    expect(component.quantityFreeDestinationCredits).toEqual(1);
  });

  it('should return PRODUCT_TYPES, validatePlural()', () => {
    spyOnProperty(component, 'quantityLoans', 'get').and.returnValue(2);
    expect(component.validatePlural('payrollLoan')).toEqual(
      'PRODUCT_TYPES.PLURAL_CREDIT'
    );
  });

  it('should return true, sufficientSlides()', () => {
    expect(component.sufficientSlides(2)).toEqual(true);
  });

  it('should return true, isOverdueCredit()', () => {
    expect(component.isOverdueCredit(freeDestination)).toEqual(true);
  });

  it('should return number result, progressFreeDestination()', () => {
    expect(component.progressFreeDestination(freeDestination)).toEqual(-852);
  });

  it('should return ICard type, setFreeDestinationCredits()', () => {
    expect(component.setFreeDestinationCredits(freeDestination).id).toEqual(
      'NRO '
    );
  });
});
