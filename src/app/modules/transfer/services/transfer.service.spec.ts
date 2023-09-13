import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { NewTransferService } from './transfer.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('NewTransferService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: NewTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [NewTransferService]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(NewTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< INewTransferRespond >', (done: DoneFn) => {
    service.newTransfer(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(environment.api.services.transfer.new);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be returned Observable< INewTransferRespond >', (done: DoneFn) => {
    service.newTransferNotRegistered(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.transfer.newNotRegistered
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be returned Observable< ICostTransferService >', (done: DoneFn) => {
    service.costTransfer(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(environment.api.services.transfer.cost);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
