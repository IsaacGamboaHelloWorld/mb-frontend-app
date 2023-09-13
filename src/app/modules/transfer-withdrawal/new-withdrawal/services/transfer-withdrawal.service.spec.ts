import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { TransferWithdrawalService } from './transfer-withdrawal.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('TransferWithdrawalService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: TransferWithdrawalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransferWithdrawalService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(TransferWithdrawalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< IOtpWithdrawalResponse >', () => {
    service.generate(null).subscribe((data) => expect(data).toBeTruthy());

    const url = urlBuilder.services(
      environment.api.services.transferWithdrawal.generate
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
