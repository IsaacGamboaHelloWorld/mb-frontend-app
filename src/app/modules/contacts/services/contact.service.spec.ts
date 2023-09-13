import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contact.service';
import { TestingModule } from '@test-helpers/testing.module';
import { environment } from '@environment/environment';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [ContactService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return an observable IContactService', (done: DoneFn) => {
    service.fetchContacts().subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url =
      environment.resources.baseAssets + environment.resources.contacts;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
