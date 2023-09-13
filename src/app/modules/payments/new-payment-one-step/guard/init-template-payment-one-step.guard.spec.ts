import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { InitTemplatePaymentOneStepGuard } from '@modules/payments/new-payment-one-step/guard/init-template-payment-one-step.guard';

describe('InitTemplateCreatePaymentOneStepGuard', () => {
  let guard: InitTemplatePaymentOneStepGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplatePaymentOneStepGuard,
        {
          provide: PaymentsFacade,
          useClass: PaymentFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplatePaymentOneStepGuard);
  });

  it('should be created', (done: DoneFn) => {
    guard
      .canActivate()
      .pipe(first())
      .subscribe((data) => {
        expect(data).toBeTruthy();
        done();
      });
    expect(guard).toBeTruthy();
  });
});
