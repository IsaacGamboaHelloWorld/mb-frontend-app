import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { VelocityCardLiteCreditCardComponent } from './velocity-card-lite-credit-card.component';

describe('VelocityCardLiteCreditCardComponent', () => {
  let component: VelocityCardLiteCreditCardComponent;
  let fixture: ComponentFixture<VelocityCardLiteCreditCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityCardLiteCreditCardComponent],
        imports: [IonicModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityCardLiteCreditCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
