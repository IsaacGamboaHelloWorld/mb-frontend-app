import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VelocityOtpInputComponent } from './velocity-otp-input.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('VelocityOtpInputComponent', () => {
  let component: VelocityOtpInputComponent;
  let fixture: ComponentFixture<VelocityOtpInputComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityOtpInputComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityOtpInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return true (get focus)', () => {
    const getFocus = component.focus;
    expect(getFocus).toEqual(false);
  });

  it('should return true (get isAndroid)', () => {
    const getIsAndroid = component.isAndroid;
    expect(getIsAndroid).toEqual(true);
  });

  it('should call emit event since onInput function', () => {
    component.digits = 7;
    component.autocomplete = 'one-time-code';

    const event: InputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      data: 'otpMock'
    });

    spyOn(component.oneTimeCode, 'emit');

    component.onInput(event);
    expect(component.oneTimeCode.emit).toHaveBeenCalled();
  });

  it('Should clear inputs  ( clearInput() )', () => {
    component.inputValues = new Array(4);
    component.inputValues[2] = 'mock';
    component.clearInput();
    expect(component.inputValues).toEqual(['', '', '', '']);
  });

  it('Should set value in the position', () => {
    component.inputValues = new Array(4);
    component.onOTPInputChange('mock2', 2);
    expect(component.inputValues).toEqual([
      undefined,
      undefined,
      'mock2',
      undefined
    ]);
  });

  it('should set value in position [0]', () => {
    component.inputValues = new Array(4);
    component.inputValues = ['mock', '', '', ''];
    component.onOTPDeleteRequest(0);
    expect(component.inputValues[0]).toEqual('');
  });
});
