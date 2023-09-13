import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ContActionsComponent } from './cont-actions.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('ContActionsComponent', () => {
  let component: ContActionsComponent;
  let fixture: ComponentFixture<ContActionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContActionsComponent],
        imports: [IonicModule, TestingModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ContActionsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  emit period and stockType', () => {
    component.formActions.setValue({
      period: 'periodMock',
      type: 'typeMock'
    });
    spyOn(component.actionsStocks, 'emit');
    component.formSubmit();
    expect(component.actionsStocks.emit).toHaveBeenCalled();
  });
});
