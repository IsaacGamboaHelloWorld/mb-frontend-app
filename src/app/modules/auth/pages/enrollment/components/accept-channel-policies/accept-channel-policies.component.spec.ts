import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AcceptChannelPoliciesComponent } from './accept-channel-policies.component';
import { TestingModule } from '@test-helpers/testing.module';
import { AuthService } from '@app/commons/services/auth/auth.service';
import { SecurityService } from '@app/commons/security/services/security.service';
import { Security } from '@app/commons/security/utils/security';
import { AuthFacade } from '@app/modules/auth/auth.facade';
import { AuthFacadeMock } from '@test-helpers/mocks/facade/auth.facade.mock';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AuthTokenServiceMock } from '@test-helpers/mocks/services/auth-token-service.mock';

describe('AcceptChannelPoliciesComponent', () => {
  let component: AcceptChannelPoliciesComponent;
  let fixture: ComponentFixture<AcceptChannelPoliciesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AcceptChannelPoliciesComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          AuthService,
          SecurityService,
          Security,
          InAppBrowser,
          {
            provide: AuthTokenService,
            useClass: AuthTokenServiceMock
          },
          {
            provide: AuthFacade,
            useClass: AuthFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(AcceptChannelPoliciesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
