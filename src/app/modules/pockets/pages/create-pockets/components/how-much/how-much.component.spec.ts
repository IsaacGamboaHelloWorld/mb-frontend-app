import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HowMuchComponent } from './how-much.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { HomePocketsFacadeMock } from '@test-helpers/mocks/facade/home-pockets.facade.mock';

describe('HowMuchComponent', () => {
  let component: HowMuchComponent;
  let fixture: ComponentFixture<HowMuchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HowMuchComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: PocketsFacade,
            useClass: HomePocketsFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(HowMuchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
