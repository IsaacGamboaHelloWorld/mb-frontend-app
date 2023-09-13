import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { VelocityVoucherComponent } from 'src/app/commons/velocity/organisms/velocity-voucher/velocity-voucher.component';

describe('VelocityVoucherComponent', () => {
  let component: VelocityVoucherComponent;
  let fixture: ComponentFixture<VelocityVoucherComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityVoucherComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityVoucherComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate params', () => {
    component.config = {
      id: '123',
      img: {
        url: '',
        type: ''
      },
      title: '',
      description: '',
      amount: {
        name: '',
        value: ''
      },
      date: '',
      list: [
        {
          name: '',
          value: ''
        }
      ],
      download: {
        name: '',
        icon: ''
      }
    };
    expect(component.hasConfig).toBeTruthy();
    expect(component.hasImage).toBeTruthy();
    expect(component.hasAmount).toBeTruthy();
    expect(component.hasDate).toBeDefined();
    expect(component.hasList).toBeTruthy();
  });
});
