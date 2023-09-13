import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TestingModule } from '@test-helpers/testing.module';
import { AuthFacade } from '@modules/auth/auth.facade';
import { AuthFacadeMock } from '@test-helpers/mocks/facade/auth.facade.mock';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { OtpDataComponent } from './otp-data.component';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AuthTokenServiceMock } from '@test-helpers/mocks/services/auth-token-service.mock';
import { environment } from '@environment/environment';

describe('OtpDataComponent', () => {
  let component: OtpDataComponent;
  let fixture: ComponentFixture<OtpDataComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OtpDataComponent],
        imports: [IonicModule, TestingModule],
        providers: [
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });

  it('should validate automatic otp', () => {
    component.reSendOtpCode();
  });

  it('should validate send ios', () => {
    spyOnProperty(component, 'platform').and.returnValue('ios');
    component.sendIos(true);
    component.sendIos(false);
  });

  it('should validate opt android', () => {
    const fixture2 = TestBed.createComponent(OtpDataComponent);
    const app = fixture2.debugElement.componentInstance;
    app._validateOtpAutocomplete();
  });

  it('should validate init', () => {
    spyOnProperty(component, 'platform').and.returnValue('android');
    component.ngOnInit();
    setTimeout(() => {
      component.modalService.setActionButton(STATUS_BUTTONS.primary);
    }, 100);
  });

  it('should validate is Ios', () => {
    spyOnProperty(component, 'platform').and.returnValue('ios');
    component.ngOnInit();
    component.sendIos(true);
    component.sendIos(false);
    jasmine.clock().install();
    component.showToastIos();
    expect(component.showToast).toBeTruthy();
    jasmine.clock().tick(3001);
    expect(component.showToast).toBeFalsy();
    jasmine.clock().uninstall();
  });

  it('should call _validateOtpAutocomplete', () => {
    environment.onOtpAutomatic = true;
    spyOnProperty(component, 'platform').and.returnValue('android');
    spyOn<any>(component, '_validateOtpAutocomplete');
    component.ngOnInit();
    expect(component['_validateOtpAutocomplete']).toHaveBeenCalled();
  });
});
