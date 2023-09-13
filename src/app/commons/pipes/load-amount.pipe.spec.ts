import { LoadAmountPipe } from './load-amount.pipe';

describe('LoadAmountPipe', () => {
  let pipe: LoadAmountPipe;

  beforeEach(() => {
    pipe = new LoadAmountPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned text', () => {
    expect(pipe.transform(true, null, false, '', 'cargando')).toEqual(
      '- cargando...'
    );
    expect(pipe.transform(true, null)).toEqual('- ...');
    expect(pipe.transform(false, '1000', true, 'hola')).toEqual('- hola 1000');
    expect(pipe.transform(false, null)).toEqual('');
  });
});
