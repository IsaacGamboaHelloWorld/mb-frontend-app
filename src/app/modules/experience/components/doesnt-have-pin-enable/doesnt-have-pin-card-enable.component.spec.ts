import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { DoesntHavePinCardEnableComponent } from './doesnt-have-pin-card-enable.component';
import { TestingModule } from '@test-helpers/testing.module';
import { IonicModule } from '@ionic/angular';

describe('DoesntHavePinEnableComponent', () => {
  let component: DoesntHavePinCardEnableComponent;
  let fixture: ComponentFixture<DoesntHavePinCardEnableComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DoesntHavePinCardEnableComponent],
        imports: [TestingModule, IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DoesntHavePinCardEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
