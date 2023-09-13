import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InitTemplateAdvanceGuard } from './init-template-advance.guard';
import { AdvancesFacade } from '@modules/detail/advances/new-advance/advances.facade';
import { AdvancesFacadeMock } from '@test-helpers/mocks/facade/advances.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { first } from 'rxjs/operators';

describe('InitTemplateAdvanceGuard', () => {
  let guard: InitTemplateAdvanceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplateAdvanceGuard,
        {
          provide: AdvancesFacade,
          useClass: AdvancesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplateAdvanceGuard);
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
