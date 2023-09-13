import {
  currencyFormat,
  eventProducts,
  initGlobalCache,
  sharedFile
} from '@commons/helpers/global.helper';

import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

describe('currencyFormat', () => {
  it('should be return amount', () => {
    const currentPipe = new CurrencyFormatPipe('en-CO');
    expect(currencyFormat(currentPipe, 1000)).toBeDefined();
  });

  it('should define sharedFile()', () => {
    expect(sharedFile('fileMock', 'nameMock')).toBeDefined();
  });

  it('should define initGlobalCache()', () => {
    expect(initGlobalCache).toBeDefined();
  });

  it('should define eventProducts()', async () => {
    eventProducts({ value: 'dataMock' });
    const result = await window['getDataMaxyProducts'];
    expect(result.value).toEqual('dataMock');
  });
});
