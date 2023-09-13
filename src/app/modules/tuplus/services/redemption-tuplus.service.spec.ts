import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { RedemptionTuplusService } from './redemption-tuplus.service';
import { ConfigurationService } from '@modules/tuplus/services/configuration.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('RedemptionTuplusService', () => {
  let service: RedemptionTuplusService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RedemptionTuplusService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(RedemptionTuplusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< ConversionFactor >', () => {
    const mokcMovement = {
      redemptionRequest: {
        totalPoints: '2000',
        curAmt: '24000',
        accountId: '123322345',
        accountType: 'CC',
        bankId: '00010029',
        bankName: 'POPULAR',
        otpInfo: {
          otpValue: '234222',
          spRefId: 'dfasdf23429kjsdf12'
        }
      }
    };
    service
      .redemption(mokcMovement)
      .subscribe((data) => expect(data).toBeTruthy());

    const url = urlBuilder.services(environment.api.services.tuplus.redemption);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
