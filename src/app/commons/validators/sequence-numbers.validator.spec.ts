import { ValidateSequenceNumbers } from './sequence-numbers.validator';

describe('SequenceNumbers', () => {
  it('should create an instance', () => {
    expect(ValidateSequenceNumbers(3)).toBeTruthy();
  });
});
