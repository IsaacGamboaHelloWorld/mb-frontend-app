import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { OtpGenerationTuplusService } from './otp-generation-tuplus.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('OtpGenerationTuplusService', () => {
  let service: OtpGenerationTuplusService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OtpGenerationTuplusService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(OtpGenerationTuplusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be returned Observable< ConversionFactor >', () => {
    service.generateOtp().subscribe((data) => expect(data).toBeTruthy());

    const url = urlBuilder.services(
      environment.api.services.tuplus.generateOtp
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
