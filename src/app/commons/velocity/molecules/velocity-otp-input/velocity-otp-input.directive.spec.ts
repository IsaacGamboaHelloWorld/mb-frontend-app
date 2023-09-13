import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OtpInputDirective } from '@commons/velocity/molecules/velocity-otp-input/velocity-otp-input.directive';

@Component({
  selector: 'tpl-dummy-component',
  template: `
    <input
      appOtpInput
      (inputChange)="onInputChange()"
      (deleteRequest)="onDeleteRequest()"
      type="text"
    />
  `
})
class DummyComponent {
  constructor() {}
  private inputNE: HTMLInputElement;
  onDeleteRequest(): void {}
  onInputChange(): void {}
  clearInput(): void {}
}

describe('OtpInputDirective', () => {
  let component: DummyComponent;
  let inputDE: DebugElement;
  let directive: OtpInputDirective;
  let fixture: ComponentFixture<DummyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DummyComponent, OtpInputDirective],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    inputDE = fixture.debugElement.query(By.css('input'));
    directive = inputDE.injector.get(OtpInputDirective);
    fixture.detectChanges();
  });

  describe('#onPasteListener', () => {
    it('should allow the user to paste valid inputs', () => {
      const event = {
        preventDefault: () => {},
        clipboardData: { getData: (s: string) => '9' }
      } as ClipboardEvent;
      spyOn(event, 'preventDefault');
      inputDE.triggerEventHandler('paste', event);
      expect(event.preventDefault).toHaveBeenCalledTimes(0);
    });

    it('should not allow the user to paste invalid inputs', () => {
      const event = {
        preventDefault: () => {},
        clipboardData: { getData: (s: string) => 'f' }
      } as ClipboardEvent;
      spyOn(event, 'preventDefault');
      inputDE.triggerEventHandler('paste', event);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should clear the input before pasting if the input is already filled', () => {
      inputDE.nativeElement.value = '8';
      const event = {
        preventDefault: () => {},
        clipboardData: { getData: (s: string) => '9' }
      } as ClipboardEvent;
      spyOn(event, 'preventDefault');
      inputDE.triggerEventHandler('paste', event);
      expect(event.preventDefault).toHaveBeenCalledTimes(0);
      expect(inputDE.nativeElement.value).toBe('');
    });
  });

  describe('#keyDownListener', () => {
    it('should emit a deleteRequest when the backspace key is pressed and the input is empty', () => {
      const event = { key: 'Backspace' } as KeyboardEvent;
      spyOn(component, 'onDeleteRequest');
      inputDE.triggerEventHandler('keydown', event);
      expect(component.onDeleteRequest).toHaveBeenCalled();
    });

    it('should not emit a deleteRequest when the pressed key is not the backspace key', () => {
      const event = { key: 'A' } as KeyboardEvent;
      spyOn(component, 'onDeleteRequest');
      inputDE.triggerEventHandler('keydown', event);
      expect(component.onDeleteRequest).toHaveBeenCalledTimes(0);
    });

    it('should not emit a deleteRequest when the backspace key is pressed and the input is not empty', () => {
      inputDE.nativeElement.value = '8';
      const event = { key: 'Backspace' } as KeyboardEvent;
      spyOn(component, 'onDeleteRequest');
      inputDE.triggerEventHandler('keydown', event);
      expect(component.onDeleteRequest).toHaveBeenCalledTimes(0);
    });
  });

  describe('#keyPressListener', () => {
    it('should call event.preventDefault()', () => {
      const event = { key: 'A', preventDefault: () => {} } as KeyboardEvent;
      spyOn(event, 'preventDefault');
      spyOn(component, 'clearInput');
      inputDE.triggerEventHandler('keypress', event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.clearInput).not.toHaveBeenCalled();
    });

    it('should call not event.preventDefault()', () => {
      const event = { key: '1', preventDefault: () => {} } as KeyboardEvent;
      spyOn(component, 'clearInput');
      spyOn(event, 'preventDefault');
      inputDE.triggerEventHandler('keypress', event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('#inputListener', () => {
    it('should prevent the user to input an invalid character into the field', () => {
      const event = {
        preventDefault: () => {},
        target: { value: 'a' }
      };
      spyOn(event, 'preventDefault');
      inputDE.triggerEventHandler('input', event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(inputDE.nativeElement.value).toBe('');
    });

    it('should prevent the user from entering more than one value into the field', () => {
      const event = {
        preventDefault: () => {},
        target: { value: '321' }
      };
      spyOn(event, 'preventDefault');
      inputDE.triggerEventHandler('input', event);
      expect(inputDE.nativeElement.value).toEqual('1');
    });
  });

  it('should focus the input when prompted to', () => {
    spyOn(inputDE.nativeElement, 'focus');
    directive.focusInput();
    expect(inputDE.nativeElement.focus).toHaveBeenCalled();
  });
});
