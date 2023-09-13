import { getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TuplusService } from './tuplus.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('TuplusService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: TuplusService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
        providers: [TuplusService],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      });
      injector = getTestBed();
      httpMock = injector.inject(HttpTestingController);
      service = TestBed.inject(TuplusService);
    })
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< ITuPlus >', () => {
    service.loadTuplus().subscribe((data) => expect(data).toBeTruthy());

    const url = urlBuilder.services(environment.api.services.tuplus.balance);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
