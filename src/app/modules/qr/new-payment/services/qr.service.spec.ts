import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { QrService } from './qr.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('QrService', () => {
  let service: QrService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [QrService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(QrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return an observable IQrAnnulmentService', (done: DoneFn) => {
    service.qrPayment(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(environment.api.services.qr.payment);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable of Annulment QR', (done: DoneFn) => {
    service.qrAnnulment(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(environment.api.services.qr.annulment);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
