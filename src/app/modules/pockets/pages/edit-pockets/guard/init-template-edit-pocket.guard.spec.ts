import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { HomePocketsFacadeMock } from '@test-helpers/mocks/facade/home-pockets.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { InitTemplateEditPocketsGuard } from '@modules/pockets/pages/edit-pockets/guard/init-template-edit-pocket.guard';

describe('InitTemplateCreatePocketGuard', () => {
  let guard: InitTemplateEditPocketsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplateEditPocketsGuard,
        {
          provide: PocketsFacade,
          useClass: HomePocketsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplateEditPocketsGuard);
  });

  it('should be created', () => {
    guard
      .canActivate()
      .pipe(first())
      .subscribe((data) => expect(data).toBeTruthy());
    expect(guard).toBeTruthy();
  });
});
