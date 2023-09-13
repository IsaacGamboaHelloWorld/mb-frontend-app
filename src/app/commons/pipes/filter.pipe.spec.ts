import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned Array', () => {
    const data = [{ name: 'test' }, { name: 'example' }];
    expect(pipe.transform([], '', 'name')).toEqual([]);
    expect(pipe.transform(data, 'example', 'name').length > 0).toBeTruthy();
  });
});
