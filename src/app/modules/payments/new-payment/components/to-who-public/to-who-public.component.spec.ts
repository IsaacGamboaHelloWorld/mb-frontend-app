import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DatePipe } from '@angular/common';

import { ToWhoPublicComponent } from './to-who-public.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';

describe('ToWhoPublicComponent', () => {
  let component: ToWhoPublicComponent;
  let fixture: ComponentFixture<ToWhoPublicComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ToWhoPublicComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          DatePipe,
          {
            provide: PaymentsFacade,
            useClass: PaymentFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ToWhoPublicComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
