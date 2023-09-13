import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LogoutTuplusService } from './logout-tuplus.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('LogoutTuplusService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: LogoutTuplusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [LogoutTuplusService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(LogoutTuplusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be returned Observable< ConversionFactor >', () => {
    service.logoutTuplus().subscribe((data) => expect(data).toBeTruthy());

    const url = urlBuilder.services(
      environment.api.services.tuplus.logoutTuplus
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
