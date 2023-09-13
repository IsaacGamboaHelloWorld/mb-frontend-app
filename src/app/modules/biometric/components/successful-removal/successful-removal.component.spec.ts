import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { SuccessfulRemovalComponent } from './successful-removal.component';
import { TestingModule } from '@test-helpers/testing.module';
import { Router } from '@angular/router';

describe('SuccessfulRemovalComponent', () => {
  let component: SuccessfulRemovalComponent;
  let fixture: ComponentFixture<SuccessfulRemovalComponent>;

  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SuccessfulRemovalComponent],
        imports: [IonicModule, TestingModule],
        providers: [{ provide: Router, useValue: router }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(SuccessfulRemovalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to Home', () => {
    component.goHome();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should navigate to BIOMETRIC', () => {
    component.goToRegisterBiometric();
    expect(router.navigate).toHaveBeenCalled();
  });
});
