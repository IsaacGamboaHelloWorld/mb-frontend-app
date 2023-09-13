import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { MovementComponent } from './movement.component';
import { ItemMovementList } from '../../entities/movements.entities';

describe('MovementComponent', () => {
  let component: MovementComponent;
  let fixture: ComponentFixture<MovementComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MovementComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(MovementComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change chould list', () => {
    component.toggleList();
    expect(component['_showList']).toBe(true);
  });

  it('trackByTo return a string', () => {
    const product: ItemMovementList = {
      title: 'value',
      value: 'test'
    };
    const trackBy = component.trackBy(0, product);
    expect(trackBy).toBeInstanceOf(String);
    expect(trackBy).toBe('test');
    expect(trackBy).not.toBeNaN();
  });
});
