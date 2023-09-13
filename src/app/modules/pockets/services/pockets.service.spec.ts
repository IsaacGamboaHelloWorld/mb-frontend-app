import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { PocketsService } from './pockets.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('PocketsService', () => {
  let service: PocketsService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PocketsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    service = TestBed.inject(PocketsService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return an observable ICreatePocketResponse', (done: DoneFn) => {
    service.createPocket(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(environment.api.services.pockets.create);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable IEditPocketResponse', (done: DoneFn) => {
    service.editPocket(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(environment.api.services.pockets.update);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable IMovePocketResponse', (done: DoneFn) => {
    service.movePocket(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(environment.api.services.pockets.move);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable IDeletePocketResponse', (done: DoneFn) => {
    service.deletePocket(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(environment.api.services.pockets.delete);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable IDeletePocketResponse', (done: DoneFn) => {
    service.getCategories().subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(
      environment.api.services.pockets.categories
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
