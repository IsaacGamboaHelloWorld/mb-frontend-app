import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController } from '@angular/common/http/testing';

import { PushNotificationService } from './push-notification.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('PushNotificationService', () => {
  let service: PushNotificationService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [PushNotificationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PushNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return an observable IRegisterPushService', (done: DoneFn) => {
    service.fetchRegister(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    const url = urlBuilder.services(
      environment.api.services.notifications.register
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should be return an observable IRegisterPushService', () => {
    service.fetchDelete().subscribe((data) => expect(data).toBeTruthy());
    const url = urlBuilder.services(
      environment.api.services.notifications.disabled
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
