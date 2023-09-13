import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { BiometricTermsComponent } from './biometric-terms.component';
import { TestingModule } from '@test-helpers/testing.module';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { ModalService } from '@commons/services/modal.service';
import { Router } from '@angular/router';
import { HOME } from '@commons/constants/navigatie-global';

describe('BiometricTermsComponent', () => {
  let component: BiometricTermsComponent;
  let fixture: ComponentFixture<BiometricTermsComponent>;
  let modalService: ModalService;
  let fingerprintAIOService: FingerprintAIO;
  let facadeService: MainContainerFacade;
  let router: Router;

  class fingerprintMock {
    show(): any {
      return '';
    }
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BiometricTermsComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          ModalService,
          {
            provide: FingerprintAIO,
            useClass: fingerprintMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(BiometricTermsComponent);
      component = fixture.componentInstance;
      modalService = fixture.debugElement.injector.get(ModalService);
      fingerprintAIOService = fixture.debugElement.injector.get(FingerprintAIO);
      facadeService = fixture.debugElement.injector.get(MainContainerFacade);
      router = fixture.debugElement.injector.get(Router);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call open modal and it work correctly', () => {
    const spy = spyOn(modalService, 'openModal').and.callFake(() => null);
    component.openModal();
    expect(spy).toHaveBeenCalled();
  });

  it('goHome works correctly', () => {
    const spy = spyOn(router, 'navigate');
    component.goHome();
    expect(spy).toHaveBeenCalledWith([HOME]);
  });

  it('openBiometricSensor works correctly', () => {
    const spy = spyOn(fingerprintAIOService, 'show').and.callFake(() => null);
    const spy2 = spyOn(facadeService, 'openToast').and.callFake(() => null);
    component.openBiometricSensor();
    expect(spy).toHaveBeenCalled();
  });

  it('_navigateTo works correctly', () => {
    const spy = spyOn(component as any, '_navigateTo').and.callThrough();
    component['_navigateTo']('');
    expect(spy).toHaveBeenCalled();
  });
});
