import { ReplaceValuePipe } from 'src/app/commons/pipes/replace-value.pipe';

describe('ReplaceValuePipe', () => {
  it('create an instance', () => {
    const pipe = new ReplaceValuePipe();
    expect(pipe).toBeTruthy();
  });

  it('should be return replace value', () => {
    const pipe = new ReplaceValuePipe();
    expect(pipe.transform('example', 'p', 'Ñ')).toBe('examÑle');
  });

  it('should be return replace empty', () => {
    const pipe = new ReplaceValuePipe();
    expect(pipe.transform(null)).toBe('');
  });
});
