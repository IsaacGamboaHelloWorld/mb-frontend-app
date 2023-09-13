import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OnlyNumbersDirective } from './only-numbers.directive';

@Component({
  template: `
    <input type="text" appOnlyNumbers />
  `
})
class TestOnlyNumbersComponent {
  onPaste(event): void {}
}

describe('OnlyNumbersDirective', () => {
  let component: TestOnlyNumbersComponent;
  let fixture: ComponentFixture<TestOnlyNumbersComponent>;
  let inputEl: DebugElement;
  let inputAll: DebugElement[];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestOnlyNumbersComponent, OnlyNumbersDirective],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOnlyNumbersComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    inputAll = fixture.debugElement.queryAll(
      By.directive(OnlyNumbersDirective)
    );
    fixture.detectChanges();
  });

  describe('#KeydownLstener', () => {
    it('should have  element with the directive', () => {
      expect(inputAll.length).toBe(1);
    });

    it('Should call prevent() to input an invalid  value', () => {
      const event = {
        preventDefault: () => {},
        key: 'a',
        shiftKey: false,
        keyCode: 65
      };
      spyOn(event, 'preventDefault');
      inputEl.triggerEventHandler('keydown', event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('Should allow to enter a correct value', () => {
      const event = {
        preventDefault: () => {},
        key: '1',
        shiftKey: false,
        keyCode: 97
      };

      spyOn(event, 'preventDefault');
      inputEl.triggerEventHandler('keydown', event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('Should call prevent() to input an invalid  value with Shift key', () => {
      const event = {
        preventDefault: () => {},
        key: 'a',
        shiftKey: true,
        keyCode: 65
      };

      spyOn(event, 'preventDefault');
      inputEl.triggerEventHandler('keydown', event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('Should return (empty) to input an invalid  value with Ctrl key', () => {
      const event = {
        preventDefault: () => {},
        key: 'a',
        ctrlKey: true,
        keyCode: 65
      };

      spyOn(event, 'preventDefault');
      inputEl.triggerEventHandler('keydown', event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('#pasteListener', () => {
    it('Should call getData method when pasting values', () => {
      const event = {
        preventDefault: () => {},
        clipboardData: { getData: (s: string) => '12ab34' }
      } as ClipboardEvent;

      spyOn(event.clipboardData, 'getData');
      inputEl.triggerEventHandler('paste', event);
      expect(event.clipboardData.getData).toHaveBeenCalled();
    });
  });

  describe('#dropListener', () => {
    it('Should call getData method when drop values', () => {
      const event = {
        preventDefault: () => {},
        dataTransfer: { getData: (s: string) => '12ab34' }
      } as DragEvent;

      spyOn(event.dataTransfer, 'getData');
      inputEl.triggerEventHandler('drop', event);
      expect(event.dataTransfer.getData).toHaveBeenCalled();
    });
  });
});
