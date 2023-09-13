import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ForWhatComponent } from './for-what.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { HomePocketsFacadeMock } from '@test-helpers/mocks/facade/home-pockets.facade.mock';

describe('ForWhatComponent', () => {
  let component: ForWhatComponent;
  let fixture: ComponentFixture<ForWhatComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ForWhatComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: PocketsFacade,
            useClass: HomePocketsFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ForWhatComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
