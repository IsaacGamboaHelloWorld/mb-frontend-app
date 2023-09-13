import { getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController } from '@angular/common/http/testing';

import { MessagesService } from './messages.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('MessagesService', () => {
  let service: MessagesService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
        providers: [MessagesService],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      });
      injector = getTestBed();
      httpMock = injector.inject(HttpTestingController);
      service = TestBed.inject(MessagesService);
    })
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< IMessagesResponse >', (done: DoneFn) => {
    service.listMessages(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.notifications.messages
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be returned Observable< IGeneralMessageService > (deleteMessages)', (done: DoneFn) => {
    service.deleteMessages(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.notifications.delete
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be returned Observable< IGeneralMessageService > (readMessages)', (done: DoneFn) => {
    service.readMessages(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(
      environment.api.services.notifications.check
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
