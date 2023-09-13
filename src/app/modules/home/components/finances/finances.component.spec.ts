import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FinancesComponent } from './finances.component';
import { TestingModule } from '@test-helpers/testing.module';
import { HomeFacade } from '@modules/home/home.facade';
import { HomeFacadeMock } from '@test-helpers/mocks/facade/home.facade.mock';

describe('FinancesComponent', () => {
  let component: FinancesComponent;
  let fixture: ComponentFixture<FinancesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FinancesComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: HomeFacade,
            useClass: HomeFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FinancesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
