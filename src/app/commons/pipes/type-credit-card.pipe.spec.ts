import { TypeCreditCardPipe } from './type-credit-card.pipe';

describe('TypeCreditCardPipe', () => {
  let pipe: TypeCreditCardPipe;

  beforeEach(() => {
    pipe = new TypeCreditCardPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned type card', () => {
    expect(pipe.transform('4556990208673162')).toBeDefined();
    expect(pipe.transform('4556990208673162')).toBeDefined();
    expect(pipe.transform('4175006238301699')).toBeDefined();
    expect(pipe.transform('5567920517635176')).toBeDefined();
    expect(pipe.transform('6011020679801')).toBeDefined();
    expect(pipe.transform('35296973')).toBeDefined();
  });
});
