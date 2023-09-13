import { getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ValidatePingService } from '@modules/main-container/services/validate-ping.service';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('ValidateSessionService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          ValidatePingService,
          AuthSessionService,
          SecurityService,
          Security
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      });
      injector = getTestBed();
      httpMock = injector.inject(HttpTestingController);
    })
  );

  it('should be created', () => {
    const service: ValidatePingService = TestBed.inject(ValidatePingService);
    expect(service).toBeTruthy();
  });

  it('should be return Observable', (done: DoneFn) => {
    const service: ValidatePingService = TestBed.inject(ValidatePingService);

    service.validatePing().subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });

    const url = urlBuilder.services(environment.api.services.auth.ping);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
