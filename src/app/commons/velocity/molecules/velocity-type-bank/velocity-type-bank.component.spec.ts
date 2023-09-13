import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormControl } from '@angular/forms';

import { VelocityTypeBankComponent } from './velocity-type-bank.component';

describe('VelocityTypeBankComponent', () => {
  let component: VelocityTypeBankComponent;
  let fixture: ComponentFixture<VelocityTypeBankComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityTypeBankComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityTypeBankComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value', () => {
    component.value = 'mockValue';
    component.control = new FormControl('controlValue');
    component.setValue();
    expect(component.control.value).toEqual('mockValue');
  });

  it('should return info', () => {
    const mockInfo = {
      bankName: 'mockBank',
      name: 'mockName',
      account: 'mockAccount',
      customBank: {
        background: 'mockBackground',
        initialLetter: 'mockInitialLetter'
      }
    };

    component.info = mockInfo;
    let getInfo = component.hasInfo;
    expect(getInfo).toEqual(true);
  });

  it('should return true ( addClass())', () => {
    component.value = 'controlValue';
    component.control = new FormControl('controlValue');
    const comp = component.addClass;
    expect(comp).toEqual(true);
  });
});
