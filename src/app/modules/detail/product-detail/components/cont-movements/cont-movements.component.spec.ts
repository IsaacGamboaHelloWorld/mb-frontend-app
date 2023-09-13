import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ContMovementsComponent } from './cont-movements.component';
import { TestingModule } from '@test-helpers/testing.module';
import { ItemMovement } from '@modules/detail/product-detail/entities/movements.entities';

describe('ContMovementsComponent', () => {
  let component: ContMovementsComponent;
  let fixture: ComponentFixture<ContMovementsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContMovementsComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ContMovementsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate params', () => {
    component.title = 'Hola';
    component.showSearch = false;
    component.movements = {
      loading: false,
      completed: true,
      error: false,
      errorMessage: '',
      list: []
    };
    component.trackByMovements(0, { title: ' test' } as ItemMovement);
    expect(component.hasMovements).toBeFalsy();
  });
});
