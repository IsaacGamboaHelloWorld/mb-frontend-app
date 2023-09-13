import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ModalInfoComponent } from './modal-info.component';
import { TestingModule } from '@test-helpers/testing.module';
import { By } from '@angular/platform-browser';

describe('ModalInfoComponent', () => {
  let component: ModalInfoComponent;
  let fixture: ComponentFixture<ModalInfoComponent>;
  let debugElement: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalInfoComponent],
        imports: [IonicModule, TestingModule],

        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ModalInfoComponent);
      debugElement = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return !toogle', () => {
    component.toggle();
    component.close();
    expect(component.saveData).toBeTruthy();
  });

  it('should call modal.close', fakeAsync(() => {
    spyOn(component, 'close');
    let btn = fixture.debugElement.query(By.css('velocity-button'));
    btn.triggerEventHandler('actionButton', null);
    fixture.detectChanges();
    expect(component.close).toHaveBeenCalled();
  }));
});
