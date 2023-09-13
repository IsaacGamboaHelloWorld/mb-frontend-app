import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ContainerMovementsComponent } from './cont-movements.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('ContMovementsComponent', () => {
  let component: ContainerMovementsComponent;
  let fixture: ComponentFixture<ContainerMovementsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContainerMovementsComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
      fixture = TestBed.createComponent(ContainerMovementsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate lenghtMovements', () => {
    const movements = {
      information: {
        ListTransactions: ['1', '2', '3']
      }
    };
    component.movements = movements;
    component.lengthMovements;
    expect(component.lengthMovements).toBe(3);
  });

  it('hasMovements should return true', () => {
    const movements = {
      information: {
        ListTransactions: ['1']
      }
    };
    component.movements = movements;
    component.hasMovements;
    expect(component.hasMovements).toBeTrue();
  });
});
