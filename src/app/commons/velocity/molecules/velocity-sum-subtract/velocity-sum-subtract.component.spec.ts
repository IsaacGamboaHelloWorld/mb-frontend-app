import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { VelocitySumSubtractComponent } from './velocity-sum-subtract.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('VelocitySumSubtractComponent', () => {
  let component: VelocitySumSubtractComponent;
  let fixture: ComponentFixture<VelocitySumSubtractComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocitySumSubtractComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocitySumSubtractComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should emmit event (velocity  sum())', (done: DoneFn) => {
    let newEvent = null;
    component.emmitSum.subscribe((event) => {
      newEvent = event;
      done();
    });
    component.sum();
    expect(newEvent).not.toEqual(null);
  });

  it('Should emmit event (velocity  subtract())', (done: DoneFn) => {
    let newEvent = null;
    component.emmitSubtract.subscribe((event) => {
      newEvent = event;
      done();
    });
    component.subtract();
    expect(newEvent).not.toEqual(null);
  });
});
