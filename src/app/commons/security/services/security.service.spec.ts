import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { Security } from '../utils/security';
import { SecurityService } from './security.service';
import { environment } from 'src/environments/environment';
import { Symmetric } from '../models/symmetric.interface';

class adlSecureStorageServiceMock {
  get(forKey: string): Promise<any> {
    let obj = {
      id: 'idMock123456789',
      iv: 'kivMock123456789',
      key: 'keyMock123456789',
      hmacKey: 'hmacKeyMock123456789'
    };

    let objString = JSON.stringify(obj);
    return new Promise((resolve) => {
      setTimeout(() => {
        let encript = btoa(objString);
        resolve(encript);
      }, 250);
    });
  }

  put() {}
}

describe('SecurityService', () => {
  let securityService: SecurityService;
  let security: Security;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Security,
        SecurityService,
        {
          provide: AdlSecureStorageService,
          useClass: adlSecureStorageServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    securityService = TestBed.inject(SecurityService);
    security = TestBed.inject(Security);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: SecurityService = TestBed.inject(SecurityService);
    expect(service).toBeTruthy();
  });

  it('should get simmetric', () => {
    securityService.resetKeys();
    let getSimmetric = securityService.symmetric;
    expect(getSimmetric).toEqual(null);
  });
  it('should get timeSimmetric', () => {
    let getTimeSimmetric = securityService.timeSymmetric;
    expect(getTimeSimmetric).toEqual(7200);
  });
  it('should return symmetric.key correct', async () => {
    await securityService.setSymmetric();
    expect(securityService.symmetric.key).toEqual('keyMock123456789');
  });

  it('should call encryptAesGcm function', async () => {
    spyOn(security, 'encryptAesGcm');
    await securityService.setSymmetric();
    securityService.encryptAesGcm();
    expect(security.encryptAesGcm).toHaveBeenCalled();
  });

  it('should doesnt call encryptAesGcm function', () => {
    spyOn(security, 'encryptAesGcm');
    securityService
      .encryptAesGcm()
      .then((_) => console.log('No error'))
      .then(null, (err) => console.log('Error: ', err));
    expect(security.encryptAesGcm).not.toHaveBeenCalled();
  });

  it('should doesnt call encryptAesGcm function', async () => {
    spyOn(security, 'decryptAesGcm');
    await securityService.setSymmetric();
    securityService.decryptAesGcm('dataMock');
    expect(security.decryptAesGcm).toHaveBeenCalled();
  });

  it('should doesnt call encryptAesGcm function', () => {
    spyOn(security, 'decryptAesGcm');
    securityService
      .decryptAesGcm('dataMock')
      .then((_) => console.log('No error'))
      .then(null, (err) => console.log('Error: ', err));
    expect(security.decryptAesGcm).not.toHaveBeenCalled();
  });

  it('should be returned Observable', (done: DoneFn) => {
    securityService.deleteKey().subscribe((data: any) => {
      expect(data).toBeTruthy();
      done();
    });

    const url =
      environment.api.base +
      environment.api.services.security.close_security_session;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should return false getSymmetricKey()', async () => {
    spyOnProperty(securityService, 'hasKeys', 'get').and.returnValue(true);
    const simmetric = await securityService.getSymmetricKey();
    expect(simmetric).toBeTrue();
  });

  it('should define hmac()', async () => {
    await securityService.setSymmetric();
    securityService.hmac('inputMock');
    expect(securityService.hmac).toBeDefined();
  });

  it('should call encryptRsaPkcs1String()', async () => {
    spyOn(securityService, 'getCipherPublicKey');
    spyOn(security, 'encryptRsaPkcs1String');
    spyOn(security, 'signRsaPkcs1');
    await securityService['_buildRequestBody']();
    expect(security.encryptRsaPkcs1String).toHaveBeenCalled();
  });

  it('should set _symmetric.id', async () => {
    const response: Symmetric = {
      id: 'idMock',
      iv: 'ivMock',
      key: 'keyMock',
      expiration: 1,
      hmacKey: 'hmacKeyMock'
    };

    securityService['_key'] = {
      privateKey: {
        algorithm: {
          name: 'nameMock'
        },
        extractable: true,
        type: 'private',
        usages: ['decrypt']
      },
      publicKey: {
        algorithm: {
          name: 'nameMock'
        },
        extractable: true,
        type: 'public',
        usages: ['decrypt']
      }
    };

    spyOn(security, 'exportPrivateKey').and.returnValue(Promise.resolve('key'));
    spyOn(security, 'importAesGcmKey');

    await securityService['_processResponse'](response);

    expect(securityService['_symmetric'].id).toEqual('idMock');
    expect(securityService['_timeSymmetric']).toEqual(1);
    expect(security.exportPrivateKey).toHaveBeenCalled();
    expect(security.importAesGcmKey).toHaveBeenCalled();
  });
});
