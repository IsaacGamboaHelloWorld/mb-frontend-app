import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ContErrorComponent } from 'src/app/modules/forms/cont-error/cont-error.component';

describe('ContErrorComponent', () => {
  let component: ContErrorComponent;
  let fixture: ComponentFixture<ContErrorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContErrorComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ContErrorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isErrorMessage reuturn a boolena value', () => {
    const formControlTest = new FormControl();
    formControlTest.markAsDirty();
    formControlTest.markAsTouched();
    formControlTest.setErrors({ incorrect: true });
    component.control = formControlTest;
    const isErrorMessage = component.isErrorMessage;
    expect(isErrorMessage).toBeInstanceOf(Boolean);
  });
  it('textError reuturn a string', () => {
    const formControlTest = new FormControl();
    formControlTest.markAsDirty();
    formControlTest.markAsTouched();
    formControlTest.setErrors({ required: true });
    component.control = formControlTest;
    const textError = component.textError;
    expect(textError).toBeInstanceOf(String);
  });
});
