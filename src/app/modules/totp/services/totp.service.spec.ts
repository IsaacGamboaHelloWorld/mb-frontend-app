import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController } from '@angular/common/http/testing';

import { TotpService } from './totp.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('TotpService', () => {
  let service: TotpService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [TotpService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(TotpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return an observable ITotpService', (done: DoneFn) => {
    service.fetchTotp().subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(environment.api.services.totp);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
