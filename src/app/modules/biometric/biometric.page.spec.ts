import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { BiometricPage } from './biometric.page';
import { TestingModule } from '@test-helpers/testing.module';

describe('BiometricPage', () => {
  let component: BiometricPage;
  let fixture: ComponentFixture<BiometricPage>;

  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BiometricPage],
        providers: [{ provide: Router, useValue: routerSpy }],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(BiometricPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.vavigate with route asigned', () => {
    component.close();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
