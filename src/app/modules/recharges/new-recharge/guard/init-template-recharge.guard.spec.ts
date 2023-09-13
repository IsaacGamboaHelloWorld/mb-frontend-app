import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { InitTemplateRechargeGuard } from './init-template-recharge.guard';
import { RechargesFacade } from '@modules/recharges/new-recharge/recharges.facade';
import { RechargesFacadeMock } from '@test-helpers/mocks/facade/recharges.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';

describe('InitTemplateRechargeGuard', () => {
  let service: InitTemplateRechargeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplateRechargeGuard,
        {
          provide: RechargesFacade,
          useClass: RechargesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(InitTemplateRechargeGuard);
  });

  it('should be created', (done: DoneFn) => {
    service
      .canActivate()
      .pipe(first())
      .subscribe((data) => {
        expect(data).toBeTruthy();
        done();
      });
    expect(service).toBeTruthy();
  });
});
