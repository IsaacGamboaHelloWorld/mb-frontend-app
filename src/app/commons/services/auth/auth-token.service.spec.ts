import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuthTokenService } from 'src/app/commons/services/auth/auth-token.service';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from 'test-helpers/mocks/facade/app.facade.mock';
import { TestingModule } from 'test-helpers/testing.module';

describe('AuthTokenService', () => {
  let service: AuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        AuthSessionService,
        SecurityService,
        Security,
        {
          provide: AppFacade,
          useClass: AppFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(AuthTokenService);
  });

  it('should be created', () => {
    service.checkInitToken();
    expect(service).toBeTruthy();
  });
});
