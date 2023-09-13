import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TaxCertificatesService } from './tax-certificates.service';
import { TestingModule } from '@test-helpers/testing.module';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

import {
  ICertificateGMFResponse,
  ICertificateIncomeTaxesResponse,
  ICertificateRACResponse,
  IRentEntities
} from '@modules/documents/tax-certificates/entities/tax-certificates.entities';

describe('CertificatesTcService', () => {
  let service: TaxCertificatesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [TaxCertificatesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    service = TestBed.inject(TaxCertificatesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('generateCertificateTC return a IRentEntities value and does post method ', (done: DoneFn) => {
    const rentTest: IRentEntities = {
      specificErrorMessage: '',
      success: true,
      errorMessage: '',
      documentResponse: [
        {
          trnImage: [
            {
              binLength: null,
              documentType: '',
              checksum: null,
              contentType: null,
              binData: ''
            }
          ],
          dateStored: '',
          name: '',
          documentTypeId: '',
          documentId: '',
          type: '',
          keyword: null,
          latestRevision: ''
        }
      ],
      approvalId: ''
    };
    service.generateCertificateTC().subscribe((resp: IRentEntities) => {
      expect(resp).toEqual(rentTest);
      done();
    });
    const url = urlBuilder.services(
      environment.api.services.products.certificateTC
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(rentTest);
  });
  it('generateCertificateGMF return a ICertificateGMFResponse value and does post method ', (done: DoneFn) => {
    const certificateTest: ICertificateGMFResponse = {
      errorMessage: '',
      fileUrl: '',
      base64: '',
      name: '',
      success: true
    };
    service
      .generateCertificateGMF({ taxYear: 'test' })
      .subscribe((resp: ICertificateGMFResponse) => {
        expect(resp).toEqual(certificateTest);
        done();
      });
    const url = urlBuilder.services(
      environment.api.services.products.certificateGMF
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(certificateTest);
  });
  it('generateCertificateIncomeTaxes return a ICertificateIncomeTaxesResponse value and does post method ', (done: DoneFn) => {
    const certificateTest: ICertificateIncomeTaxesResponse = {
      errorMessage: '',
      fileUrl: '',
      base64: '',
      name: '',
      success: true
    };
    service
      .generateCertificateIncomeTaxes({ taxYear: 'test' })
      .subscribe((resp: ICertificateIncomeTaxesResponse) => {
        expect(resp).toEqual(certificateTest);
        done();
      });
    const url = urlBuilder.services(
      environment.api.services.products.certificatesIncome
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(certificateTest);
  });
  it('generateCertificateRAC return a ICertificateRACResponse value and does post method ', (done: DoneFn) => {
    const certificateTest: ICertificateRACResponse = {
      errorMessage: '',
      fileUrl: '',
      base64: '',
      name: '',
      success: true
    };
    service
      .generateCertificateRAC({ taxYear: 'test' })
      .subscribe((resp: ICertificateRACResponse) => {
        expect(resp).toEqual(certificateTest);
        done();
      });
    const url = urlBuilder.services(
      environment.api.services.products.certificateRAC
    );
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(certificateTest);
  });
});
