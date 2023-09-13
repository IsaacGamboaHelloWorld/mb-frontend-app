import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { VelocityValueLoanComponent } from './velocity-value-loan.component';
import { FormBuilder, FormControl } from '@angular/forms';

const fb = new FormBuilder();

describe('VelocityValueLoanComponent', () => {
  let component: VelocityValueLoanComponent;
  let fixture: ComponentFixture<VelocityValueLoanComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityValueLoanComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityValueLoanComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate value', () => {
    component.value = 'text';
    const form = fb.group({
      name: ['text']
    });
    component.control = form.get('name') as FormControl;
    expect(component.addClass).toBeTruthy();
    component.setValue();
    component.ngOnInit();
  });
});
