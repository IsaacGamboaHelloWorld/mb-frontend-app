import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VelocityLabelTextRadioComponent } from './velocity-label-text-radio.component';

const fb = new FormBuilder();

describe('VelocityLabelTextRadioComponent', () => {
  let component: VelocityLabelTextRadioComponent;
  let fixture: ComponentFixture<VelocityLabelTextRadioComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityLabelTextRadioComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityLabelTextRadioComponent);
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
      first: ['text']
    });
    component.control = form.get('first') as FormControl;
    expect(component.addClass).toBeTruthy();
    component.setValue();
  });
});
