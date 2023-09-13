import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ChannelPasswordComponent } from './channel-password.component';
import { TestingModule } from '@test-helpers/testing.module';
import { AuthService } from '@app/commons/services/auth/auth.service';
import { SecurityService } from '@app/commons/security/services/security.service';
import { Security } from '@app/commons/security/utils/security';
import { AuthFacade } from '@app/modules/auth/auth.facade';
import { AuthFacadeMock } from '@test-helpers/mocks/facade/auth.facade.mock';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AuthTokenServiceMock } from '@test-helpers/mocks/services/auth-token-service.mock';

describe('ChannelPasswordComponent', () => {
  let component: ChannelPasswordComponent;
  let fixture: ComponentFixture<ChannelPasswordComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChannelPasswordComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          AuthService,
          SecurityService,
          Security,
          {
            provide: AuthFacade,
            useClass: AuthFacadeMock
          },
          {
            provide: AuthTokenService,
            useClass: AuthTokenServiceMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ChannelPasswordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
