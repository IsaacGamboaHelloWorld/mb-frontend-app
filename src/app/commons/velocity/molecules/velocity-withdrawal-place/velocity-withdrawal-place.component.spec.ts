import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VelocityWithdrawalPlaceComponent } from './velocity-withdrawal-place.component';

describe('VelocityWithdrawalPlaceComponent', () => {
  let component: VelocityWithdrawalPlaceComponent;
  let fixture: ComponentFixture<VelocityWithdrawalPlaceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityWithdrawalPlaceComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityWithdrawalPlaceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.control = new FormControl('controlValue');
    component.value = 'newValue';
    component.setValue();
    expect(component.control.value).toEqual('newValue');
  });
});
