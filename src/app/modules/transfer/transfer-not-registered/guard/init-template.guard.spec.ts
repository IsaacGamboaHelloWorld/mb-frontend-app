import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { first } from 'rxjs/operators';

import { InitTemplateGuard } from '@modules/transfer/transfer-not-registered/guard/init-template.guard';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { TestingModule } from '@test-helpers/testing.module';
import { NewTransferFacadeMock } from '@test-helpers/mocks/facade/new-transfer.facade.mock';

describe('InitTemplateGuard', () => {
  let guard: InitTemplateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplateGuard,
        {
          provide: NewTransferFacade,
          useClass: NewTransferFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplateGuard);
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
