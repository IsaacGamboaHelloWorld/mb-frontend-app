import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InitTemplateTransferWithdrawalGuard } from './init-template-transfer-withdrawal.guard';
import { TestingModule } from '@test-helpers/testing.module';
import { TransferWithdrawalFacade } from '@modules/transfer-withdrawal/new-withdrawal/transfer-withdrawal.facade';
import { TransferWithdrawalFacadeMock } from '@test-helpers/mocks/facade/transfer-withdrawal.facade.mock';
import { first } from 'rxjs/operators';

describe('InitTemplateTransferWithdrawalGuard', () => {
  let guard: InitTemplateTransferWithdrawalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplateTransferWithdrawalGuard,
        {
          provide: TransferWithdrawalFacade,
          useClass: TransferWithdrawalFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplateTransferWithdrawalGuard);
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
