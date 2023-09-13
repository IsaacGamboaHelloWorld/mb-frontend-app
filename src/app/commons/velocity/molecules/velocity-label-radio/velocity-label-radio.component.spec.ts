import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl } from '@angular/forms';

import { VelocityLabelRadioComponent } from './velocity-label-radio.component';

const fb = new FormBuilder();

describe('VelocityLabelRadioComponent', () => {
  let component: VelocityLabelRadioComponent;
  let fixture: ComponentFixture<VelocityLabelRadioComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityLabelRadioComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityLabelRadioComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate value', () => {
    component.value = 'hola';
    const form = fb.group({
      name: ['hola']
    });
    component.control = form.get('name') as FormControl;
    expect(component.addClass).toBeTruthy();
    component.setValue();
  });
});
