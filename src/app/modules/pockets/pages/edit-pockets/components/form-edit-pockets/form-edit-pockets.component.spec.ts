import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormEditPocketsComponent } from './form-edit-pockets.component';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@test-helpers/testing.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketsFacadeMock } from '@test-helpers/mocks/facade/pockets.facade.mock';

describe('FormEditPocketsComponent', () => {
  let component: FormEditPocketsComponent;
  let fixture: ComponentFixture<FormEditPocketsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormEditPocketsComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: PocketsFacade,
            useClass: PocketsFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FormEditPocketsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
