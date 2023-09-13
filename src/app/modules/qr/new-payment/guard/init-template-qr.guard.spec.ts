import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InitTemplateQrGuard } from './init-template-qr.guard';
import { QrFacade } from '@modules/qr/new-payment/qr.facade';
import { QrFacadeMock } from '@test-helpers/mocks/facade/qr.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { first } from 'rxjs/operators';

describe('InitTemplateQrGuard', () => {
  let guard: InitTemplateQrGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        InitTemplateQrGuard,
        ConfigTemplateService,
        SaveDataTemplateService,
        {
          provide: QrFacade,
          useClass: QrFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(InitTemplateQrGuard);
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
