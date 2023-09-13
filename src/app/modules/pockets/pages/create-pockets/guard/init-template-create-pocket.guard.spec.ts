import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InitTemplateCreatePocketGuard } from './init-template-create-pocket.guard';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { HomePocketsFacadeMock } from '@test-helpers/mocks/facade/home-pockets.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { first } from 'rxjs/operators';

describe('InitTemplateCreatePocketGuard', () => {
  let guard: InitTemplateCreatePocketGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplateCreatePocketGuard,
        {
          provide: PocketsFacade,
          useClass: HomePocketsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplateCreatePocketGuard);
  });

  it('should be created', (done: DoneFn) => {
    guard
      .canActivate()
      .pipe(first())
      .subscribe((data) => {
        expect(data).toBeTruthy();
        done();
      });
    expect(guard).toBeTruthy();
  });
});
