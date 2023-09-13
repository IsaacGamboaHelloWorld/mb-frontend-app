import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ValidateSessionService } from '@commons/security/services/validate-session.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { StepEnrollmentType } from '@modules/auth/constants/step';

describe('ValidateCipherService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValidateSessionService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: ValidateSessionService = TestBed.inject(
      ValidateSessionService
    );
    expect(service).toBeTruthy();
  });

  it('should be returned Observable', (done: DoneFn) => {
    const service: ValidateSessionService = TestBed.inject(
      ValidateSessionService
    );

    service.validateSession().subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.security.validate_security_session
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
