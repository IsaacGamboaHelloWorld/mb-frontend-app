import { Capacitor } from '@capacitor/core';

import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { FINGERPRINTSALT } from '@commons/constants/global';
import {
  initGlobalCache,
  removeDataStoragePDF
} from '@commons/helpers/global.helper';

export function initMethods(
  authToken: AuthTokenService,
  security: AdlSecureStorageService
): () => void {
  return async (): Promise<any> => {
    const fingerPrint = await authToken.fingerPrint(FINGERPRINTSALT);
    await security.initDB(fingerPrint);
    Capacitor.getPlatform() !== 'web' && security.clearDB();
    authToken.checkInitToken();
    authToken.initEvents();
    removeDataStoragePDF();
    initGlobalCache();
    return Promise.resolve({});
  };
}
