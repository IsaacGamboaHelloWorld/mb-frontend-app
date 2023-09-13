import { TestBed } from '@angular/core/testing';

import { AdlFingerPrintService } from '@commons/services/adl-finger-print.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdlFingerPrintService', () => {
  let service: AdlFingerPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdlFingerPrintService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(AdlFingerPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return error', () => {
    spyOn(service, 'fingerPrint').and.returnValue(Promise.resolve(''));
    expect(service.fingerPrint()).toBeDefined();
  });
});
