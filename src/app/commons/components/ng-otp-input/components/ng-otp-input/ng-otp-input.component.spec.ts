import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { NgOtpInputComponent } from './ng-otp-input.component';
import { KeysOtpPipe } from '@commons/components/ng-otp-input/pipes/keys-otp.pipe';

describe('NgOtpInputComponent', () => {
  let component: NgOtpInputComponent;
  let fixture: ComponentFixture<NgOtpInputComponent>;
  let keysOtpPipeService: KeysOtpPipe;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NgOtpInputComponent, KeysOtpPipe],
        providers: [KeysOtpPipe],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NgOtpInputComponent);
    component = fixture.componentInstance;
    component.componentKey = 'test';
    keysOtpPipeService = fixture.debugElement.injector.get(KeysOtpPipe);
  });

  it('should create', () => {
    component.config = { length: 4, disableAutoFocus: true };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('ngAfterViewInit works correctly when dont exist config.disableAutoFocus', () => {
    component.ngAfterViewInit();
    expect(component.config.disableAutoFocus).toBeUndefined();
  });
  it('setFocus works correctl', () => {
    component['_focus'] = false;
    component.setFocus();
    expect(component['_focus']).toBeTruthy();
  });
  it('markAsTouchedControl works correctlY when exist formControl', () => {
    component.customControl = new FormControl();
    const spy = spyOn(component.customControl, 'markAsTouched').and.callFake(
      () => null
    );
    component.markAsTouchedControl();
    expect(spy).toHaveBeenCalled();
  });

  it('ifLeftArrow should returns a boolean', () => {
    const spy = spyOn(component, 'ifKeyCode').and.callThrough();
    const eventTest: any = new KeyboardEvent('eventTest');
    const ifLeftArrow = component.ifLeftArrow(eventTest);
    expect(spy).toHaveBeenCalled();
    expect(ifLeftArrow).toBeInstanceOf(Boolean);
  });

  it('ifRightArrow should returns a boolean', () => {
    const spy = spyOn(component, 'ifKeyCode').and.callThrough();
    const eventTest: any = new KeyboardEvent('eventTest');
    const ifRightArrow = component.ifRightArrow(eventTest);
    expect(spy).toHaveBeenCalled();
    expect(ifRightArrow).toBeInstanceOf(Boolean);
  });

  it('ifBackspaceOrDelete should returns a boolean', () => {
    const spy = spyOn(component, 'ifKeyCode').and.callThrough();
    const eventTest: any = new KeyboardEvent('eventTest');
    const ifBackspaceOrDelete = component.ifBackspaceOrDelete(eventTest);
    expect(spy).toHaveBeenCalled();
    expect(ifBackspaceOrDelete).toBeInstanceOf(Boolean);
  });

  it('onKeyDown should calls ifKeyCode', () => {
    const spy = spyOn(component, 'ifKeyCode').and.callThrough();
    const eventTest: any = new KeyboardEvent('eventTest');
    const onKeyDown = component.onKeyDown(eventTest);
    expect(spy).toHaveBeenCalled();
  });

  it('focusTo should works correctly', () => {
    component.config = {
      length: 4,
      disableAutoFocus: true
    };
    component.otpForm = new FormGroup({
      idx: new FormControl('')
    });
    component.focusTo('test');
    component.setSelected('test');
    component.setValue('test');
    expect(component.otpForm).not.toBeNull();
  });

  it('appendKey should return a string', () => {
    const appendKey = component.appendKey('0');
    expect(appendKey).toBeInstanceOf(String);
  });

  it('ifValidEntry whould return a boolean', () => {
    const eventTest: any = new KeyboardEvent('eventTest');
    const ifValidEntryTest = component.ifValidEntry(eventTest);
    expect(ifValidEntryTest).toBeInstanceOf(Boolean);
  });
});
