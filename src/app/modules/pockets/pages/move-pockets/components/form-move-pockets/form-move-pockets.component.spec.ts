import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormMovePocketsComponent } from './form-move-pockets.component';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@test-helpers/testing.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketsFacadeMock } from '@test-helpers/mocks/facade/pockets.facade.mock';

describe('FormMovePocketsComponent', () => {
  let component: FormMovePocketsComponent;
  let fixture: ComponentFixture<FormMovePocketsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormMovePocketsComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: PocketsFacade,
            useClass: PocketsFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FormMovePocketsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
