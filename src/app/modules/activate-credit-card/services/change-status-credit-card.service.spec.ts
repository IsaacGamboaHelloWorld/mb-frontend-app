import { HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { ChangeStatusCreditCardService } from './change-status-credit-card.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('ChangeStatusCardService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ChangeStatusCreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [ChangeStatusCreditCardService]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ChangeStatusCreditCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< IActiveCreditCardService >', (done: DoneFn) => {
    service.fetchActiveCreditCard(null).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const url = urlBuilder.services(environment.api.services.creditCard.active);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
