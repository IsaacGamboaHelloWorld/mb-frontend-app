import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, Platform } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { UniversalPasswordComponent } from './universal-password.component';
import { TestingModule } from '@test-helpers/testing.module';
import { AuthService } from '@commons/services/auth/auth.service';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { AuthFacade } from '@modules/auth/auth.facade';
import { AuthFacadeMock } from '@test-helpers/mocks/facade/auth.facade.mock';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AuthTokenServiceMock } from '@test-helpers/mocks/services/auth-token-service.mock';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';

describe('UniversalPasswordComponent', () => {
  let component: UniversalPasswordComponent;
  let fixture: ComponentFixture<UniversalPasswordComponent>;
  let serviceFingerPrint: FingerprintAIO;
  let securityStorageService: AdlSecureStorageService;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UniversalPasswordComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          AuthService,
          SecurityService,
          AdlSecureStorageService,
          Security,
          FingerprintAIO,
          Platform,
          Keyboard,
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

      fixture = TestBed.createComponent(UniversalPasswordComponent);
      component = fixture.componentInstance;
      serviceFingerPrint = fixture.debugElement.injector.get(FingerprintAIO);
      securityStorageService = fixture.debugElement.injector.get(
        AdlSecureStorageService
      );
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('forgotPassword works correctly', () => {
    const spy = spyOn(component, 'submitEnrollment').and.callFake(() => null);
    const spyb = spyOn(component, 'minDelay').and.callFake(() => null);
    component.forgotPassword();
    expect(spy).toHaveBeenCalled();
    expect(spyb).toHaveBeenCalled();
  });
  it('openBiometric works correctly', () => {
    const spy = spyOn(serviceFingerPrint, 'show').and.callFake(() => null);
    component['_hasBiometricKey'] = true;
    component.openBiometric();
    expect(spy).toHaveBeenCalled();
  });
  it('openBiometric works correctly when it isnt false', () => {
    const spy = spyOn(serviceFingerPrint, 'show').and.callFake(() => null);
    component['_hasBiometricKey'] = false;
    component.openBiometric();
    expect(spy).not.toHaveBeenCalled();
  });
  it('_biometricLogin works correctly', () => {
    const spy = spyOn(securityStorageService, 'get').and.callFake(() => null);
    component['_biometricLogin']();
    expect(spy).toHaveBeenCalled();
  });
});
