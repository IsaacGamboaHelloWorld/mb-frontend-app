import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FreeDestinationService } from './free-destination.service';
import { TestingModule } from '@test-helpers/testing.module';

describe('FreeDestinationService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: FreeDestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [FreeDestinationService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(FreeDestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
