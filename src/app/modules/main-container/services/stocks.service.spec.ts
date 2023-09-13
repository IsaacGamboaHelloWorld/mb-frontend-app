import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';

import { StocksService } from './stocks.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('StocksService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: StocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [StocksService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(StocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return Observable< IStocksAvalAll >', (done: DoneFn) => {
    service.allStocks(null).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });

    const url = urlBuilder.services(environment.api.services.stocks.all);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return Observable< IStocksType >', (done: DoneFn) => {
    service.typeStocks().subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });

    const url = urlBuilder.services(environment.api.services.stocks.types);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return Observable< IStocksPeriod >', (done: DoneFn) => {
    service.periodStocks().subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });

    const url = urlBuilder.services(environment.api.services.stocks.period);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
