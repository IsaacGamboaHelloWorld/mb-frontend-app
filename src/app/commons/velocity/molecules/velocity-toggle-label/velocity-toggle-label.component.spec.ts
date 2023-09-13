import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { VelocityToggleLabelComponent } from './velocity-toggle-label.component';
import { FormControl } from '@angular/forms';

describe('VelocityToggleLabelComponent', () => {
  let component: VelocityToggleLabelComponent;
  let fixture: ComponentFixture<VelocityToggleLabelComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityToggleLabelComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityToggleLabelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set control value', () => {
    component.control = new FormControl('controlValue');
    component.setValue();
    expect(component.control.value).toBeTruthy();
  });
});
