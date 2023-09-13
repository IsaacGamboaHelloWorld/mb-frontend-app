import { FilterMovementsTuplusPipe } from './filter-movements-tuplus.pipe';
import { FilterDateRangePipe } from '@modules/detail/product-detail/pipes/filter-date-range.pipe';

describe('FilterMovementsTuplusPipe', () => {
  let pipe: FilterMovementsTuplusPipe;

  beforeEach(() => {
    pipe = new FilterMovementsTuplusPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be return null', () => {
    expect(pipe.transform(null, '', null)).toBeNull();
  });

  it('should be return Array', () => {
    const data = [
      { transactionDate: '2020-07-27T12:49:17' },
      { transactionDate: '2020-07-28T12:49:17' },
      { transactionDate: '2020-07-28T12:49:17' },
      { transactionDate: '2020-08-04T12:49:17' }
    ];
    expect(pipe.transform(data, 'day', 'transactionDate')).toBeTruthy();
    expect(pipe.transform(data, 'week', 'transactionDate')).toBeTruthy();
    expect(pipe.transform(data, 'month', 'transactionDate')).toBeTruthy();
  });
});
