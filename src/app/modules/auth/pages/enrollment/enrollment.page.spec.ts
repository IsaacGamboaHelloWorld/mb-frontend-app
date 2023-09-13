import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { EnrollmentPage } from './enrollment.page';
import { TestingModule } from 'test-helpers/testing.module';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { AuthFacade } from '@modules/auth/auth.facade';
import { AuthFacadeMock } from 'test-helpers/mocks/facade/auth.facade.mock';
import { AuthService } from '@commons/services/auth/auth.service';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AuthTokenServiceMock } from '@test-helpers/mocks/services/auth-token-service.mock';
import { redirectHome } from '@modules/auth/mappers/redirect.mapper';

describe('EnrollmentPage', () => {
  let component: EnrollmentPage;
  let fixture: ComponentFixture<EnrollmentPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EnrollmentPage],
        imports: [IonicModule, TestingModule],
        providers: [
          SecurityService,
          Security,
          AuthService,
          {
            provide: AuthTokenService,
            useClass: AuthTokenServiceMock
          },
          {
            provide: AuthFacade,
            useClass: AuthFacadeMock
          },
          {
            provide: redirectHome,
            useValue: {}
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(EnrollmentPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.back();
    expect(component).toBeTruthy();
  });

  it('should call changeTypeInput()', () => {
    spyOn(component, 'changeTypeInput');
    component.ionViewWillEnter();
    expect(component.changeTypeInput).toHaveBeenCalled();
  });

  it('should call facade.resetAuth()', () => {
    spyOn(component['facade'], 'resetAuth');
    component.ionViewDidLeave();
    expect(component['facade'].resetAuth).toHaveBeenCalled();
  });

  it('should call navigateRoot', () => {
    spyOn<any>(component['navCtrl'], 'navigateRoot');
    component.back();
    expect(component['navCtrl'].navigateRoot).toHaveBeenCalled();
  });
});
