import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { OperatorsNameService } from 'src/app/modules/recharges/new-recharge/services/operators-name.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('OperatorsNameService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: OperatorsNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OperatorsNameService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(OperatorsNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< IRespondOperators >', (done: DoneFn) => {
    service.operators().subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.recharges.operators
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
