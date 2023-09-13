import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MovementsTuplusService } from './movements-tuplus.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { BANKS } from '@commons/constants/banks';
import { calculateDate } from '@commons/helpers/global.helper';

describe('MovementsService', () => {
  let service: MovementsTuplusService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovementsTuplusService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(MovementsTuplusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be returned Observable< ConversionFactor >', () => {
    const mokcMovement = {
      companyId: BANKS.BANCO_POPULAR,
      transactionsRequest: {
        startDt: new Date(calculateDate('getDate', 'setDate', 30)),
        endDt: new Date(),
        isPagination: false,
        numPage: 0
      }
    };
    service
      .movementsTuplus(mokcMovement)
      .subscribe((data) => expect(data).toBeTruthy());

    const url = urlBuilder.services(
      environment.api.services.tuplus.movementsTuPlus
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
