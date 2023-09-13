import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ChangePasswordService } from './change-password.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('ChangePasswordService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ChangePasswordService;
  const key = { publicKey: '1234' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChangePasswordService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< IChangePasswordResponse >', (done: DoneFn) => {
    service.changePassword(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.auth.changePassword
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be returned Observable< PublicKey >', (done: DoneFn) => {
    service.getAuthServerPublicKey$().subscribe((data) => {
      expect(data).toEqual(key);
      expect(service.serverPublicKey).toEqual(key);
      service.getAuthServerPublicKey$().subscribe();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.auth.getEnrollmentServerPublicKey
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(key);
  });
});
