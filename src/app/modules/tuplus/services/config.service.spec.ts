import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { getTestBed, TestBed } from '@angular/core/testing';
import { ConfigurationService } from './configuration.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('ConfigService', () => {
  let service: ConfigurationService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigurationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< ConversionFactor >', () => {
    service.configuration().subscribe((data) => expect(data).toBeTruthy());

    const url = urlBuilder.services(
      environment.api.services.tuplus.configuration
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
