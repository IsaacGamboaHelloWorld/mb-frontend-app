import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginPage } from 'src/app/modules/auth/pages/login/login.page';
import { TestingModule } from 'test-helpers/testing.module';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { AuthFacade } from '@modules/auth/auth.facade';
import { AuthFacadeMock } from 'test-helpers/mocks/facade/auth.facade.mock';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AuthTokenServiceMock } from '@test-helpers/mocks/services/auth-token-service.mock';
import { environment } from '@environment/environment';
import { isBoolean } from 'util';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginPage],
        imports: [IonicModule, TestingModule],
        providers: [
          SecurityService,
          Security,
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

      fixture = TestBed.createComponent(LoginPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form valid', () => {
    component.ionViewWillEnter();
    component.formLogin.setValue({
      idType: 'CC',
      id: 1234455,
      idFake: '****55'
    });
    expect(component.formLogin.valid).toBeTruthy();
    component.submitEnrollment(component.formLogin);
    expect(component).toBeTruthy();
  });

  it('should form invalid', () => {
    component.ionViewWillEnter();
    expect(component.formLogin.invalid).toBeTruthy();
    component.submitEnrollment(component.formLogin);
    expect(component).toBeTruthy();
  });
  it('should call removeAccount', () => {
    const spy = spyOn(component.modalService, 'openModal').and.callFake(
      () => null
    );
    component.removeAccount();
    expect(spy).toHaveBeenCalled();
  });

  it('should call submitFormLogin with disable', () => {
    const spy = spyOn(component, 'submitEnrollment').and.callFake(() => null);
    component.ionViewWillEnter();
    component.formLogin.setValue({
      idType: '',
      id: 1234455,
      idFake: '****55'
    });
    component.disabled = true;
    component['_information'] = {
      idType: '',
      id: ''
    };
    component.submitFormLogin();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call submitFormLogin without disable', () => {
    const spy = spyOn(component, 'submitEnrollment').and.callFake(() => null);
    component.ionViewWillEnter();
    component.formLogin.setValue({
      idType: '',
      id: 1234455,
      idFake: '****55'
    });
    component.disabled = false;
    component['_information'] = {
      idType: '',
      id: ''
    };

    component.submitFormLogin();
    expect(spy).toHaveBeenCalled();
  });

  it('should be returns an id number', () => {
    component.ionViewWillEnter();
    component.formLogin.setValue({
      idType: 'CC',
      id: 1234455,
      idFake: '****55'
    });
    const id = component.id.value;
    expect(id).toBe(1234455);
    expect(id).not.toBeNaN();
    expect(id).not.toBeNull();
  });

  it('should be returns an string for idFake', () => {
    component.ionViewWillEnter();
    component.formLogin.setValue({
      idType: 'CC',
      id: 1234455,
      idFake: '****55'
    });
    const idFake = component.idFake.value;
    expect(idFake).toBe('****55');
    expect(idFake).not.toBeNaN();
    expect(idFake).not.toBeNull();
  });

  it('should be returns an boolean for hasIdMask', () => {
    component.ionViewWillEnter();
    component.formLogin.setValue({
      idType: 'CC',
      id: 1234455,
      idFake: '****55'
    });
    const hasIdMask = component.hasIdMask;
    expect(hasIdMask).toBe(true || false);
    expect(hasIdMask).not.toBeNaN();
    expect(hasIdMask).not.toBeNull();
  });

  it('should be returns an boolean for showCode', () => {
    const showCode = component.showCode;
    expect(showCode).toBe(!!showCode);
    expect(showCode).toBeInstanceOf(Boolean);
    expect(showCode).not.toBeNull();
    expect(showCode).not.toBeNaN();
  });

  it('should be returns an string for version', () => {
    const version = component.version;
    expect(version).toBeInstanceOf(String);
    expect(version).not.toBeNull();
    expect(version).not.toBeNaN();
  });
});
