import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormControl } from '@angular/forms';

import { VelocityServicePaymentComponent } from './velocity-service-payment.component';

describe('VelocityServicePaymentComponent', () => {
  let component: VelocityServicePaymentComponent;
  let fixture: ComponentFixture<VelocityServicePaymentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityServicePaymentComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityServicePaymentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('Should set value correctly', () => {
    component.value = 'mockValue';
    component.control = new FormControl('controlValue');
    component.setValue();
    expect(component.control.value).toEqual('mockValue');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false', () => {
    component.value = {
      mockName: 'John',
      mockAge: '28'
    };
    const add = component.addClass;
    expect(add).toEqual(false);
  });

  it('should return false', () => {
    const add = component.hasInfo;
    expect(add).toEqual(false);
  });

  it('should return false', () => {
    const add = component.hasDate;
    expect(add).toEqual(false);
  });
});
