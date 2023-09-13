import { initMethods } from '@app/app.helpers';

describe('app helpers', () => {
  it('initMethods', () => {
    const authToken = {
      checkInitToken: () => {},
      initEvents: () => {},
      fingerPrint: () => Promise.resolve({})
    };
    const security = {
      initDB: () => {},
      clearDB: () => Promise.resolve({})
    };
    initMethods(authToken as any, security as any)();
  });
});
