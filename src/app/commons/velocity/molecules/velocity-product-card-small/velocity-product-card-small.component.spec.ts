import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { VelocityProductCardSmallComponent } from './velocity-product-card-small.component';

describe('VelocityProductCardSmallComponent', () => {
  let component: VelocityProductCardSmallComponent;
  let fixture: ComponentFixture<VelocityProductCardSmallComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityProductCardSmallComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityProductCardSmallComponent);
      component = fixture.componentInstance;
      component.info = {
        productName: 'mockName',
        accountIdentifier: '123',
        availableBalanceLabel: 'mockBalanceLabel',
        availableBalance: 'mockBalance',
        img: 'www.mmock.com',
        icon: 'www.iconMock.com'
      };
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true', () => {
    expect(component.hasInfo).toEqual(true);
  });

  it('should return true', () => {
    expect(component.hasImg).toEqual(true);
  });

  it('should return true', () => {
    expect(component.hasIcon).toEqual(true);
  });

  it('should return false', () => {
    component.value = 'mockValue';
    expect(component.addClass).toEqual(false);
  });
});
