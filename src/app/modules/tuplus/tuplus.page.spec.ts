import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { TuplusPage } from './tuplus.page';
import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { TuplusFacadeMock } from '@test-helpers/mocks/facade/tuplus.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('TuplusPage', () => {
  let component: TuplusPage;
  let fixture: ComponentFixture<TuplusPage>;
  let facade: TuplusFacadeMock;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TuplusPage],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: TuplusFacade,
            useClass: TuplusFacadeMock
          },
          {
            provide: NavController
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TuplusPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
