import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { VelocityCheckboxSlideComponent } from 'src/app/commons/velocity/atoms/velocity-checkout-slide/velocity-checkbox-slide.component';

describe('CheckboxSlideComponent', () => {
  let component: VelocityCheckboxSlideComponent;
  let fixture: ComponentFixture<VelocityCheckboxSlideComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityCheckboxSlideComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocityCheckboxSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.toggleCheck();
    expect(component).toBeTruthy();
  });
});
