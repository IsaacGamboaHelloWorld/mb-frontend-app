import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { LoansService } from './loans.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('LoansService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: LoansService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [LoansService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(LoansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< IRegisteredLoansResp >', (done: DoneFn) => {
    service.fetchLoansRegistered().subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(environment.api.services.payment.loans);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be returned Observable< ILoanPayment >', (done: DoneFn) => {
    service.fetchLoansPay(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(environment.api.services.payment.payLoans);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
