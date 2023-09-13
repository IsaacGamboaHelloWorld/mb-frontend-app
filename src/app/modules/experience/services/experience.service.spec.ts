import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ExperienceService } from '@modules/experience/services/experience.service';
import { IExperienceResponse } from '@modules/experience/entities/experience.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

describe('PocketsService', () => {
  let service: ExperienceService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExperienceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    service = TestBed.inject(ExperienceService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('generateCertificateGMF return a ICertificateGMFResponse value and does post method ', () => {
    const startTest = { content: null, processId: '', flowName: 'test' };
    const experienceTest: IExperienceResponse = {
      success: true,
      step: 'test'
    };
    service.experience(startTest).subscribe((resp: IExperienceResponse) => {
      expect(resp).toEqual(experienceTest);
    });
    const url = urlBuilder.services(environment.api.services.experience);
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(experienceTest);
  });
});
