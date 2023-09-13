import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovementsFilterComponent } from './movements-filter.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestingModule } from '@test-helpers/testing.module';
import { FilterDateRangePipe } from '@modules/detail/product-detail/pipes/filter-date-range.pipe';
import { ItemMovement } from '../../entities/movements.entities';

describe('MovementsFilterComponent', () => {
  let component: MovementsFilterComponent;
  let fixture: ComponentFixture<MovementsFilterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MovementsFilterComponent, FilterDateRangePipe],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(MovementsFilterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true hasMovements()', () => {
    component.movements = {
      loading: false,
      completed: true,
      error: false,
      errorMessage: 'errorMessageMock',
      list: [
        {
          title: 'titleMock',
          value: 'valueMock',
          list: [
            {
              title: 'titlemock',
              value: 'valueMock'
            }
          ]
        }
      ]
    };

    expect(component.hasMovements).toEqual(true);
  });

  it('trackByTo return a string trackByMovements()', () => {
    const movement: ItemMovement = {
      title: 'value',
      value: 'test',
      list: [
        {
          title: 'titleMock',
          value: 'valueMock'
        }
      ]
    };
    const trackBy = component.trackByMovements(0, movement);
    expect(trackBy).toBeInstanceOf(String);
    expect(trackBy).toBe('test');
    expect(trackBy).not.toBeNaN();
  });

  it('should set searchDate, resetDate()', () => {
    component.resetDate();
    expect(component.searchDate).toEqual('');
  });
});
