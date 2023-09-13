import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthSessionService } from 'src/app/commons/services/auth/auth-session.service';
import { TestingModule } from 'test-helpers/testing.module';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';

describe('AuthSessionService', () => {
  let service: AuthSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [SecurityService, Security],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(AuthSessionService);
  });

  it('should be created', () => {
    service.clearData();
    service.getToken();
    expect(service).toBeTruthy();
  });

  it('should be return hasToken', () => {
    service.saveTokenData('test');
    expect(service.hasTokenData()).toBeTruthy();
  });

  it('should be return getToken', () => {
    expect(service.getToken()).toBeDefined();
  });
});
