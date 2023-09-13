import { TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Capacitor } from '@capacitor/core';

import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { OneSpanStorageAllData } from '@avaldigitallabs/one-span-secure-storage';
import { TestingModule } from '@test-helpers/testing.module';

describe('AdlSecureStorageService', () => {
  let service: AdlSecureStorageService;

  const getAllPromise: Promise<OneSpanStorageAllData> = new Promise(
    (resolve) => {
      const obj = {
        data: { key: 'keyMock' }
      };

      resolve(obj);
    }
  );

  const promiseBoolean: Promise<boolean> = new Promise((resolve) => {
    resolve(true);
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
        providers: [AdlSecureStorageService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      });
      service = TestBed.inject(AdlSecureStorageService);
    })
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validate methods', async () => {
    expect(await service.initDB('test'));
    expect(await service.put('hola', '1234')).toBeTruthy();
    expect(await service.get('hola')).toBeTruthy();
    expect(await service.getAll()).toBeTruthy();
    expect(await service.writeOnPermanentStorage()).toBeTruthy();
    expect(await service.get('test')).toBeFalsy();
  });

  it('should not set counter', () => {
    service['counter'] = 4;
    expect(service['counter']).toEqual(4);
  });

  it('should return false, and call functions remove()', async () => {
    const mockPromise: Promise<string> = new Promise((resolve) => {
      const key = ['forke', 'forkeyMock'];
      const keyConv = JSON.stringify(key);
      resolve(keyConv);
    });
    const writeOnPromise: Promise<boolean> = new Promise((resolve) => {
      resolve(false);
    });

    spyOn(service, 'get').and.returnValue(mockPromise);
    spyOn(service, 'put').and.returnValue(promiseBoolean);
    spyOn(service, 'writeOnPermanentStorage').and.returnValue(writeOnPromise);

    await service.remove('forkeyMock', true).then((value) => {
      expect(value).toBeFalsy();
      expect(service.get).toHaveBeenCalled();
      expect(service.put).toHaveBeenCalled();
      expect(service.writeOnPermanentStorage).toHaveBeenCalled();
    });
  });

  it('should call remove() when platform !== web', async () => {
    spyOn(service, 'getAll').and.returnValue(getAllPromise);
    Capacitor.getPlatform = jasmine.createSpy().and.returnValue('android');
    spyOn(service, 'remove').and.returnValue(promiseBoolean);
    await service.clearDB();
    expect(service.remove).toHaveBeenCalled();
  });

  it('should call remove() when platform === web', async () => {
    spyOn(service, 'getAll').and.returnValue(getAllPromise);
    Capacitor.getPlatform = jasmine.createSpy().and.returnValue('web');
    spyOn(service, 'remove').and.returnValue(promiseBoolean);
    await service.clearDB();
    expect(service.remove).toHaveBeenCalled();
  });
});
