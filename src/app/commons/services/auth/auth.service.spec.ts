import { getTestBed, TestBed } from '@angular/core/testing';
import { TestingModule } from 'test-helpers/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from '@commons/services/auth/auth.service';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { environment } from '@environment/environment';
import { urlBuilder } from '@commons/utils/url-builder';
import { StepEnrollmentType } from '@modules/auth/constants/step';

describe('AuthService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [SecurityService, AuthSessionService, Security],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setInfoUser = null;
    service.setData = null;
    service.temporalFingerprint = true;
    expect(service.temporalFingerprint).toBeTruthy();
    expect(service.infoUser).toBeFalsy();
    expect(service.temporalData).toBeFalsy();
    service.logOut();
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< IEnrollmentResponse >', (done: DoneFn) => {
    const service: AuthService = TestBed.inject(AuthService);
    service.login(null).subscribe((data) => {
      expect(data.success).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(environment.api.services.auth.enrollment);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({
      success: true,
      step: StepEnrollmentType.COMPLETED
    });
  });

  it('should be logout returned Observable< boolean >', (done: DoneFn) => {
    const service: AuthService = TestBed.inject(AuthService);
    service.logOut().subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(environment.api.services.auth.logout);
    const req = httpMock.expectOne(url);
    req.flush({});
  });

  it('should be getServerPublicKey returned Observable< PublicKey >', (done: DoneFn) => {
    const service: AuthService = TestBed.inject(AuthService);
    const key = {
      publicKey: 'test'
    };
    expect(service.serverPublicKey).toBeUndefined();
    service.getServerPublicKey().subscribe((data) => {
      expect(data).toEqual(key);
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.auth.getEnrollmentServerPublicKey
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(key);
  });

  it('should be getServerPublicKey return retry Observable< PublicKey >', (done: DoneFn) => {
    const service: AuthService = TestBed.inject(AuthService);
    const key = {
      publicKey: 'test'
    };
    spyOnProperty(service, 'serverPublicKey', 'get').and.returnValue(key);
    service.getServerPublicKey().subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
  });
});
