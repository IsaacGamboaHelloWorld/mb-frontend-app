import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons//security/utils/security';
import { AuthService } from '@commons/services/auth/auth.service';
import { AuthFacade } from '@app/modules/auth/auth.facade';
import { AuthFacadeMock } from '@test-helpers/mocks/facade/auth.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { NewUniversalPasswordComponent } from './new-universal-password.component';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AuthTokenServiceMock } from '@test-helpers/mocks/services/auth-token-service.mock';
import { ModalService } from '@commons/services/modal.service';

describe('NewUniversalPasswordComponent', () => {
  let component: NewUniversalPasswordComponent;
  let fixture: ComponentFixture<NewUniversalPasswordComponent>;
  let modalService: ModalService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewUniversalPasswordComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          AuthService,
          SecurityService,
          Security,
          ModalService,
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

      fixture = TestBed.createComponent(NewUniversalPasswordComponent);
      component = fixture.componentInstance;
      modalService = fixture.debugElement.injector.get(ModalService);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleType works correctly', () => {
    component.showPass = false;
    component.toggleType();
    expect(component.showPass).toBeTruthy();
  });

  it('should submit enrrollmentData', () => {
    component.formNewPassword = new FormGroup({
      universalPasswordConfirmation: new FormControl(''),
      universalPassword: new FormControl('')
    });
    const spy = spyOn(component, 'submitEnrollment');
    component.submitEnrollmentData();
    expect(spy).toHaveBeenCalled();
  });

  it('information$ should is defined', () => {
    const information = component.information$;
    expect(information).toBeDefined();
  });
  it('isPassword should return a boolean', () => {
    component['_password'] = true;
    expect(component.isPassword).toBeTruthy();
    expect(component.isPassword).toBeInstanceOf(Boolean);
  });
  it('isPasswordConfirm should return a boolean', () => {
    component['_passwordConfirm'] = true;
    expect(component.isPasswordConfirm).toBeTruthy();
    expect(component.isPasswordConfirm).toBeInstanceOf(Boolean);
  });

  it('closeModal should works correctly', () => {
    const spy = spyOn(modalService, 'close').and.callFake(() => null);
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });
  it('changeTypeInput should works correctly', () => {
    component['_password'] = true;
    component.changeTypeInput();
    expect(component['_password']).toBeFalse();
  });
  it('changeTypeInputConfirm should works correctly', () => {
    component['_passwordConfirm'] = true;
    component.changeTypeInputConfirm();
    expect(component['_passwordConfirm']).toBeFalse();
  });
  it('minDelay should works correctly', () => {
    const spy = spyOn(modalService, 'openModal').and.callFake(() => null);
    component.minDelay();
    expect(spy).toHaveBeenCalled();
  });
  it('modalOpen should works correctly', () => {
    const spy = spyOn(modalService, 'openModal').and.callFake(() => null);
    component['modalOpen']();
    expect(spy).toHaveBeenCalled();
  });
  it('mustMatch should works correctly', () => {
    const mustMatchTest = component['mustMatch'](
      'controlTest',
      'matchingControlTest'
    );
    expect(mustMatchTest).toBeDefined();
  });
});
