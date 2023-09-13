import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InitTemplateCreditCardGuard } from './init-template-credit-card.guard';
import { TestingModule } from '@test-helpers/testing.module';
import { HomeActiveFacade } from '@modules/activate-credit-card/home-active.facade';
import { HomeActiveBlockFacadeMock } from '@test-helpers/mocks/facade/home-active-block.facade.mock';
import { first } from 'rxjs/operators';

describe('InitTemplateCreditCardGuard', () => {
  let guard: InitTemplateCreditCardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplateCreditCardGuard,
        {
          provide: HomeActiveFacade,
          useClass: HomeActiveBlockFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplateCreditCardGuard);
  });

  it('should be created', () => {
    guard
      .canActivate()
      .pipe(first())
      .subscribe((data) => expect(data).toBeTruthy());
    expect(guard).toBeTruthy();
  });
});
