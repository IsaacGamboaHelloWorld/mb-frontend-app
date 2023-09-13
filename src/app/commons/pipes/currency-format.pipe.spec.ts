import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe('en-CO');
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned replace value', () => {
    expect(pipe.transform('12435')).toBe('$12.435,00');
  });

  it('should be returned rvalue with decimal', () => {
    expect(pipe.transform('12435', true)).toBeDefined();
  });

  it('should be returned value default', () => {
    expect(pipe.transform(null)).toBeNull();
  });
});
