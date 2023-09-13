import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController } from '@angular/common/http/testing';

import { QrInfoService } from './qr-info.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('QrInfoService', () => {
  let service: QrInfoService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [QrInfoService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(QrInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return an observable IQrProductsService', (done: DoneFn) => {
    service.qrProducts(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(environment.api.services.qr.product);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable IQrInfoService', (done: DoneFn) => {
    service.qrInfo(null).subscribe((data) => expect(data).toBeTruthy());
    const url = urlBuilder.services(environment.api.services.qr.info);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
    done();
  });
});
