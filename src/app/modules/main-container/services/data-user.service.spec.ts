import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { DataUserService } from './data-user.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('DataUserService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: DataUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [DataUserService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(DataUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return Observable< IDataUser >', (done: DoneFn) => {
    service.userData().subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });

    const url = urlBuilder.services(environment.api.services.customer.user);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
