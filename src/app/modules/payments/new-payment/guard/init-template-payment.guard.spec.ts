import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InitTemplatePaymentGuard } from './init-template-payment.guard';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { first } from 'rxjs/operators';
import { PaymentsFacade } from '@modules/payments/payments.facade';

describe('InitTemplatePaymentGuard', () => {
  let guard: InitTemplatePaymentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplatePaymentGuard,
        {
          provide: PaymentsFacade,
          useClass: PaymentFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplatePaymentGuard);
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
