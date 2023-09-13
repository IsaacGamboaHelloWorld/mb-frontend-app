import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TaxPaymentService } from './tax-payment.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('TaxPaymentService', () => {
  let service: TaxPaymentService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [TaxPaymentService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(TaxPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return an observable ITaxesCitiesResponse', (done: DoneFn) => {
    service.loadTaxesCities(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.payment.taxes.cities
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable ITaxesAgreementsResponse', (done: DoneFn) => {
    service.loadTaxesAgreements(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.payment.taxes.taxes
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable ITaxesAmountReferenceResponse', (done: DoneFn) => {
    service.loadTaxesAmountReference(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.payment.taxes.amount
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable ITaxesPaymentResponse', (done: DoneFn) => {
    service.taxesPayment(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.payment.taxes.payment
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
