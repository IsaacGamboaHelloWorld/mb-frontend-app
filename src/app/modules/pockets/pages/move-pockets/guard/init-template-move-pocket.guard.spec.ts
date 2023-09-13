import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { InitTemplateMovePocketsGuard } from './init-template-move-pocket.guard';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { HomePocketsFacadeMock } from '@test-helpers/mocks/facade/home-pockets.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';

describe('InitTemplateCreatePocketGuard', () => {
  let guard: InitTemplateMovePocketsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplateMovePocketsGuard,
        {
          provide: PocketsFacade,
          useClass: HomePocketsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplateMovePocketsGuard);
  });

  it('should be created', () => {
    guard
      .canActivate()
      .pipe(first())
      .subscribe((data) => expect(data).toBeTruthy());
    expect(guard).toBeTruthy();
  });
});
